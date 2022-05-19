import className from 'classnames';
import {cloneDeep} from 'lodash';
import {
  computed,
  defineComponent,
  getCurrentInstance,
  isVNode,
  onMounted,
  PropType,
  provide,
  reactive,
  ref,
  watch, watchEffect
} from 'vue';
import {
  Action,
  Effects,
  EffectsContext,
  IValidateResponse,
  Platform,
  SchemaFormComponentOptions, SchemaFormField,
  SchemaFormStore
} from '../../types';
import {registerComponent} from './config';
import {renderField, SchemaFormEvents} from './internal/utils';
import {isEqual} from './uform/utils';
import runValidation from './uform/validator';
import {createContext} from './utils/effects';
import {SchemaFormFieldOperationStoreKey, SchemaFormStoreKey} from './utils/key';
import {values} from './utils/object';
import {ComponentStore} from './utils/register';
import {isNotNull, LibComponents} from './utils/utils';

const SchemaForm = defineComponent({
  field: null,
  name: 'VSchemaForm',
  inheritAttrs: false,
  props: {
    prefixCls: {type: String as PropType<string>, default: 'schema-form'},
    disabled: {type: Boolean as PropType<boolean>, default: false},
    readonly: {type: Boolean as PropType<boolean>, default: false},
    loading: {type: Boolean as PropType<boolean>, default: false},
    actions: {type: Array as PropType<Action[]>},
    platform: {type: String as PropType<Platform>, default: 'desktop'},
    transition: Boolean,
    transitionName: {
      type: String,
      default: 'fade'
    },
    editable: {type: Boolean as PropType<boolean>, default: true},
    effects: {type: Function as PropType<Effects>},
    schema: {type: Object as PropType<SchemaFormField>},
    props: {type: Object as PropType<{ [key: string]: unknown }>},
    value: [Object, Array],
    title: [String, Object],
    sticky: {type: Boolean as PropType<boolean>, default: false},
    components: {type: Array as PropType<SchemaFormComponentOptions[]>, default: () => []},
    onChange: Function,
    onReset: Function,
    onCancel: Function,
    onOk: Function,
    onSubmit: Function,
    context: Function as PropType<EffectsContext>,
  },
  emits: ['update:value'],
  setup(props, {emit, slots}) {
    const instance = getCurrentInstance();
    const currentValue = ref<any[] | {[key: string]: unknown}>(cloneDeep(props.value) || {});
    const componentStore = new ComponentStore();

    const realSchema = computed<SchemaFormField>(() => {
      if (props.context) {
        return props.context.__schema;
      }
      return props.schema;
    });

    props.components.forEach((comp: SchemaFormComponentOptions) => {
      registerComponent(comp, componentStore);
    });
    const store: SchemaFormStore = reactive({
      fields: {},
      disabled: props.disabled,
      loading: props.loading,
      readonly: props.readonly,
      platform: props.platform,
      props: props.props || realSchema.value.xProps || realSchema.value.props || {},
      effects: props.effects,
      editable: props.editable,
      context: null,
      transition: props.transition,
      transitionName: props.transitionName,
      root: instance,
      components: componentStore,
      value: cloneDeep(currentValue.value)
    });
    provide(SchemaFormFieldOperationStoreKey as any, {
      addField(field) {
        if (field) {
          store.fields[field.plainPath] = field;
        }
      },
      removeField(field) {
        if (field) {
          delete store.fields[field.plainPath];
        }
      }
    });
    provide(SchemaFormStoreKey, store);
    watchEffect(() => {
      store.platform = props.platform;
      store.readonly = props.readonly;
      store.disabled = props.disabled;
      store.platform = props.platform as Platform;
      store.props = props.props || realSchema.value.xProps || realSchema.value.props || {};
      store.transition = props.transition;
      store.transitionName = props.transitionName;
      store.loading = props.loading;
      store.editable = props.editable;
      store.effects = props.effects;
    });
    const hasSubmitHandler = computed(() =>
        props.onOk !== undefined
        || props.onSubmit
        || props.onSubmit !== undefined);

    const localOnOk = async (forceValidate: boolean, callback?: (value) => any) => {
      if (hasSubmitHandler.value) {
        if (forceValidate) {
          const errors = await validate();
          if (errors.length) {
            errors[0].field.focus(true);
            store.context.trigger(SchemaFormEvents.validate, errors);
          } else {
            const cloneValue = cloneDeep(currentValue.value)
            if (callback) {
              callback(cloneValue);
            } else {
              props.onOk?.(cloneValue);
              props.onSubmit?.(cloneValue);
            }
          }
        } else {
          const cloneValue = cloneDeep(currentValue.value)
          if (callback) {
            callback(cloneValue);
          } else {
            props.onOk?.(cloneValue);
            props.onSubmit?.(cloneValue);
          }
        }
      }
    };

    const setCurrentValue = () => {
      if (!currentValue.value || !isEqual(props.value, currentValue.value)){
        if (props.value) {
          if (isVNode(props.value)) {
            console.error('VNode不能作为输入值');
          } else {
            currentValue.value = cloneDeep(props.value);
          }
        } else if (realSchema.value.array) {
          currentValue.value = [];
        } else {
          currentValue.value = {};
        }
      }
    };
    const createSubmitButton = (text = '', customBtnProps: { [key: string]: unknown } = undefined, action: () => any = undefined) => {
      const hasOkHandler = hasSubmitHandler.value || action !== undefined;
      if (!hasOkHandler) {
        return null;
      }
      const btnProps: {
        okProps?: { [key: string]: unknown };
        cancelProps?: { [key: string]: unknown };
        okText?: { [key: string]: unknown };
      } = props.props as any;
      const buttonProps = customBtnProps || (btnProps && btnProps.okProps) || {};
      if (!buttonProps.type) {
        buttonProps.type = 'primary';
      }
      buttonProps.disabled = props.disabled;
      buttonProps.loading = props.loading;
      return createButton(
          text || btnProps && btnProps.okText || '提交',
          action || (() => {
            localOnOk(true);
          }), buttonProps, 'confirm-btn'
      );
    };
    const createButton = (text, action, btnAttrs, classes) => {
      const {platform} = props;
      const buttonProps = {
        ...btnAttrs,
        class: classes,
        onClick: (e) => {
          action(store.context, e);
        }
      };
      const ButtonComponent: any = LibComponents.button[platform as string];
      const Button = <ButtonComponent {...buttonProps}>
        {text}
      </ButtonComponent>;
      if (platform === 'mobile') {
        return [<m-white-space/>, Button];
      }
      return Button;
    };
    const validate = (): Promise<IValidateResponse[]> =>
        runValidation(values(store.fields).filter(it => it.getComponent().mode !== 'layout'));
    const createCancelButton = (text = '', customBtnProps: any = undefined, action: () => any = undefined) => {
      const hasCancelHandler = props.onCancel !== undefined || action !== undefined;
      if (!hasCancelHandler) {
        return null;
      }
      const btnProps: {
        cancelProps?: any;
        cancelText?: any;
      } = props.props as any;
      const buttonProps = customBtnProps || (btnProps && btnProps.cancelProps) || {};
      buttonProps.disabled = props.disabled || props.loading;
      return createButton(
          text || btnProps?.cancelText || '取消',
          action || localOnCancel, buttonProps,
          'cancel-btn'
      );
    };
    const createResetButton = (text = '', customBtnProps: any = undefined, action: () => any = undefined) => {
      const hasResetHandler = props.onReset !== undefined || action !== undefined;
      if (!hasResetHandler) {
        return null;
      }
      const btnProps: {
        cancelProps?: any;
        cancelText?: any;
      } = props.props as any;
      const buttonProps = customBtnProps || (btnProps && btnProps.cancelProps) || {};
      buttonProps.disabled = props.disabled || props.loading;
      return createButton(
          text || btnProps && btnProps.cancelText || '重置',
          action || localOnReset, buttonProps, 'reset-btn'
      );
    };
    const localOnReset = () => {
      props.onReset?.();
    };
    const localOnCancel = () => {
      props.onCancel?.();
    };
    const renderButtons = () => {
      const {actions} = props;
      if (props && store.editable) {
        if (slots.btns) {
          return slots.btns;
        }
        let buttons = [];
        if (actions) {
          (actions as Action[]).forEach((action: any) => {
            if (typeof action === 'string') {
              switch (action) {
                case 'submit':
                  buttons.push(createSubmitButton());
                  break;
                case 'cancel':
                  buttons.push(createCancelButton());
                  break;
                case 'reset':
                  buttons.push(createResetButton());
                  break;
              }
            } else if (typeof action === 'object') {
              switch (action.name) {
                case 'submit':
                  buttons.push(createSubmitButton(action.text, action.props, action.action));
                  break;
                case 'cancel':
                  buttons.push(createCancelButton(action.text, action.props, action.action));
                  break;
                case 'reset':
                  buttons.push(createResetButton(action.text, action.props, action.action));
                  break;
                default:
                  const btnProps: any = action.props || {};
                  btnProps.disabled = props.disabled || props.loading;
                  buttons.push(createButton(action.text, action.action, btnProps, null));
                  break;
              }
            }
          });
        } else {
          buttons.push(createCancelButton());
          buttons.push(createSubmitButton());
          buttons.push(createResetButton());
        }
        buttons = buttons.filter(it => isNotNull(it))
        if (buttons.length) {
          return <div class="action-btns">
            {buttons}
          </div>;
        }
        return undefined;
      }
    };
    watch(() => props.value, () => {
      setCurrentValue();
    });
    watch(() => currentValue.value, (v) => {
      const cloneValue = cloneDeep(v);
      if (!isEqual(currentValue.value, props.value)) {
        emit('update:value', cloneValue);
        props.onChange?.(cloneValue);
      }
      store.value = cloneValue;
    }, {deep: true});

    onMounted(() => {
      if (props.effects) {
        props.effects(store.context);
      }
    });

    setCurrentValue();
    store.context = createContext(store, localOnOk, currentValue, props.context);
    store.editable = props.editable as boolean;
    return {
      createResetButton,
      createCancelButton,
      createButton,
      createSubmitButton,
      validate,
      store,
      renderButtons,
      currentValue,
      realSchema
    };
  },
  render() {
    const LibComponentsContent: any = LibComponents.content[this.platform as string];
    const LibComponentsFooter: any = LibComponents.footer[this.platform as string];
    const {title, sticky, prefixCls, store, currentValue, realSchema} = this;
    const rootFieldDef: any = Object.assign({}, realSchema, {
      type: 'object',
      title
    });
    let content: any = [
      this.$slots.header?.(),
      renderField(
          null,
          store,
          rootFieldDef,
          currentValue,
          0,
          false,
          this.$emit
      )
    ];
    let footer: any = [
      this.renderButtons(),
      this.$slots.footer?.()
    ];
    const classes = className(prefixCls, {
      [`${prefixCls}-sticky`]: sticky
    }, `${prefixCls}-${this.platform}`, this.$attrs.class as any);
    if (this.sticky) {
      content = <LibComponentsContent>
        {content}
      </LibComponentsContent>;
      footer = <LibComponentsFooter>
        {footer}
      </LibComponentsFooter>;
      const Layout: any = LibComponents.layout;
      return <Layout class={classes}>
        {content}
        {footer}
      </Layout>;
    }
    return <div class={classes} style={this.$attrs.style}>
      {content}
      {footer}
    </div>;
  }
});
SchemaForm.install = app => {
  app.component(SchemaForm.name, SchemaForm);
};
export default SchemaForm;
