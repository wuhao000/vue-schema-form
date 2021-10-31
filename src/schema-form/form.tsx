import className from 'classnames';
import clone from 'lodash.clonedeep';
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
  watch
} from 'vue';
import {Action, IValidateResponse, Platform, SchemaFormComponentOptions, SchemaFormStore} from '../../types';
import {registerComponent} from './config';
import {renderField, SchemaFormEvents} from './internal/utils';
import {isEqual} from './uform/utils';
import runValidation from './uform/validator';
import {createContext} from './utils/effects';
import {SchemaFormFieldOperationStoreKey, SchemaFormStoreKey} from './utils/key';
import {ComponentStore} from './utils/register';
import {LibComponents} from './utils/utils';

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
    platform: {type: String as PropType<string>, default: 'desktop'},
    editable: {type: Boolean as PropType<boolean>, default: true},
    effects: {type: Function},
    schema: {type: Object, required: true},
    props: {type: Object},
    value: [Object, Array],
    title: [String, Object],
    inline: {type: Boolean as PropType<boolean>},
    sticky: {type: Boolean as PropType<boolean>, default: false},
    components: {type: Array as PropType<SchemaFormComponentOptions[]>, default: () => []},
    onChange: Function,
    onReset: Function,
    onCancel: Function,
    onOk: Function,
    onSubmit: Function
  },
  emits: ['update:value'],
  setup(props, {emit, slots}) {
    const instance = getCurrentInstance();
    const currentValue = ref(props.value || {});
    const componentStore = new ComponentStore();
    (props.components as SchemaFormComponentOptions[]).forEach((comp: any) => {
      registerComponent(comp, componentStore);
    });
    const store: SchemaFormStore = reactive({
      fields: {},
      disabled: props.disabled as boolean,
      loading: props.loading as boolean,
      readonly: props.readonly as boolean,
      platform: props.platform as Platform,
      props: props.props || props.schema.props || {},
      effects: props.effects as any,
      inline: props.inline as boolean,
      editable: props.editable as boolean,
      context: null,
      root: instance as any,
      components: componentStore
    });
    watch(() => props, () => {
      Object.assign(store, {
        disabled: props.disabled,
        loading: props.loading,
        readonly: props.readonly,
        platform: props.platform as Platform,
        props: props.props,
        effects: props.effects as any,
        inline: props.inline,
        editable: props.editable
      });
    }, {deep: true});
    provide(SchemaFormFieldOperationStoreKey, {
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
    watch(() => props, (val: any) => {
      store.readonly = val.readonly;
      store.disabled = val.disabled;
      store.platform = val.platform as Platform;
      store.props = val.props || val.schema.props || {};
      store.loading = val.loading;
      store.editable = val.editable;
    }, {deep: true});

    const hasSubmitHandler = computed(() => {
      return props.onOk !== undefined || props.onSubmit || props.onSubmit !== undefined;
    });

    const localOnOk = async (forceValidate: boolean, callback?: (value) => any) => {
      if (hasSubmitHandler.value) {
        if (forceValidate) {
          const errors = await validate();
          if (errors.length) {
            errors[0].field.focus(true);
            store.context.trigger(SchemaFormEvents.validate, errors);
          } else {
            if (callback) {
              callback(currentValue.value);
            } else {
              props.onOk?.(currentValue.value);
              props.onSubmit?.(currentValue.value);
            }
          }
        } else {
          if (callback) {
            callback(currentValue.value);
          } else {
            props.onOk?.(currentValue.value);
            props.onSubmit?.(currentValue.value);
          }
        }
      }
    };

    const setCurrentValue = () => {
      if (!(currentValue.value && isEqual(props.value, currentValue.value))) {
        if (props.value) {
          if (isVNode(props.value)) {
            console.error('VNode不能作为输入值');
          } else {
            currentValue.value = clone(props.value);
          }
        } else if (props.schema.array) {
          currentValue.value = [];
        } else {
          currentValue.value = {};
        }
      }
    };
    const createSubmitButton = (text = '', customBtnProps: any = undefined, action: () => any = undefined) => {
      const hasOkHandler = hasSubmitHandler.value || action !== undefined;
      if (!hasOkHandler) {
        return null;
      }
      const btnProps: {
        okProps?: any;
        cancelProps?: any;
        okText?: any;
      } = props.props;
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
    const validate = (): Promise<IValidateResponse[]> | [] => {
      return runValidation(currentValue.value, store.fields, true);
    };
    const createCancelButton = (text = '', customBtnProps: any = undefined, action: () => any = undefined) => {
      const hasCancelHandler = props.onCancel !== undefined || action !== undefined;
      if (!hasCancelHandler) {
        return null;
      }
      const btnProps: {
        cancelProps?: any;
        cancelText?: any;
      } = props.props;
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
      } = props.props;
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
        const buttons = [];
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
        return <div class="action-btns">
          {buttons}
        </div>;
      }
    };
    watch(() => props.value, () => {
      setCurrentValue();
    });
    watch(() => currentValue.value, (v) => {
      if (!isEqual(currentValue.value, props.value)) {
        const cloneValue = clone(v);
        emit('update:value', cloneValue);
        props.onChange?.(cloneValue);
      }
    }, {deep: true});

    onMounted(() => {
      if (props.effects) {
        (props.effects as any)(store.context);
      }
    });

    setCurrentValue();
    store.context = createContext(store, localOnOk, currentValue);
    store.editable = props.editable as boolean;

    return {
      createResetButton,
      createCancelButton,
      createButton,
      createSubmitButton,
      validate,
      store,
      renderButtons,
      currentValue
    };
  },
  render() {
    const LibComponentsContent: any = LibComponents.content[this.platform as string];
    const LibComponentsFooter: any = LibComponents.footer[this.platform as string];
    const {title, sticky, prefixCls, store, currentValue, schema} = this;
    const rootFieldDef: any = Object.assign({}, schema, {
      type: 'object',
      title,
      props: this.schema.props
    });
    let content: any = [
      this.$slots.header?.(),
      renderField(null, store,
          rootFieldDef, currentValue, 0, false, this.$emit
      )
    ];
    let footer: any = [
      this.renderButtons(),
      this.$slots.footer?.()
    ];
    const classes = className(prefixCls, {
      [`${prefixCls}-sticky`]: sticky
    }, `${prefixCls}-${this.platform}`, this.$attrs.class);
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
