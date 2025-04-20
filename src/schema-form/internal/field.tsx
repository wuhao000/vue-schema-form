import { Slot } from '@vue/runtime-core';
import AsyncValidator from 'async-validator';
import classNames from 'classnames';
import debounce from 'lodash.debounce';
import {
  computed,
  defineComponent,
  h,
  inject,
  isProxy,
  isRef,
  isVNode,
  onBeforeUnmount,
  PropType,
  provide,
  reactive,
  ref,
  toRaw,
  Transition,
  unref,
  VNode,
  watch,
  watchEffect
} from 'vue';
import { IValidateResponse, SchemaFormComponent, SchemaFormField, SchemaFormStore } from '../../../types';
import { FieldDefinition } from '../bean/field-definition';
import ArrayWrapper from '../common/array-wrapper';
import { config } from '../config';
import Empty from '../empty';
import { isEqual } from '../uform/utils';
import { flat } from '../utils/array';
import { SchemaFormFieldOperationStoreKey, SchemaFormStoreKey } from '../utils/key';
import {
  addRule,
  DESKTOP,
  FieldTypes,
  getColComponent,
  getDefaultValue,
  isNotNull,
  isNull,
  LibComponents,
  MOBILE,
  resolveOptions,
  resolveTitle,
  swap,
  uuid
} from '../utils/utils';
import SchemaFormFieldLabel from './label.vue';
import {
  calcEditable,
  calcShowState,
  FieldStore,
  getComponentType,
  getFormItemComponent,
  getRealFields,
  isNoWrap,
  isNullStructValue,
  renderField,
  SchemaFormEvents
} from './utils';
import { ClassType } from '../types';


export default defineComponent({
  name: 'VSchemaFormField',
  inheritAttrs: false,
  props: {
    definition: Object as PropType<SchemaFormField>,
    formValue: [Object, Array],
    wrap: {
      type: Boolean,
      default: true
    },
    value: {
      type: [Object, String, Boolean, Number, Array]
    },
    content: {
      type: [Object, String] as PropType<VNode | string>
    },
    disabled: {
      type: Boolean,
      default: false
    },
    index: Number,
    path: Array,
    schemaPath: Array,
    field: {
      type: Object as PropType<FieldDefinition>,
      required: true
    },
    arrayIndex: Number,
    pathPrefix: {type: Array as PropType<string[]>}
  },
  emits: ['change', 'update:value', 'focus', 'click', 'blur', 'keydown', 'keyup'],
  setup(props, {emit}) {
    const store: SchemaFormStore = inject(SchemaFormStoreKey as any);
    const arrayRef = ref<any>(null);
    const inputRef = ref<any>(null);
    const currentValue = ref(props.value ?? null);
    const field = computed(() => props.field);
    watch(() => props.definition.array, array => {
      field.value.array = array;
    });
    watch(() => props.definition.displayValue, displayValue => {
      field.value.displayValue = displayValue;
    });
    watch(() => [props.definition.props, props.definition.xProps], (v, o) => {
      const index = v[1] ? 1 : 0;
      const hasDiff = !isEqual(v[index], o?.[index]);
      if (hasDiff) {
        if (o?.[index]) {
          Object.keys(v[index]).forEach(key => {
            const newProp = v[index][key];
            const oldProp = o[index][key];
            if (!isEqual(newProp, oldProp)) {
              field.value.props[key] = newProp;
            }
          });
        } else {
          Object.keys(v[index]).forEach(key => {
            field.value.props[key] = v[index][key];
          });
        }
      }
    });
    watch(() => currentValue.value, debounce(val => {
      const oldValue = field.value.value;
      field.value.value = val;
      emit(`update:value`, val);
      emit('change', val);
      if (!field.value.valid) {
        validate();
      }
      store.context.trigger(SchemaFormEvents.fieldChange, {
        path: field.value.plainPath,
        value: val,
        field: field.value,
        oldValue
      });
    }, 5) as any, {deep: true});
    const editable = computed(() => store.editable && field.value.editable);
    const focusState = ref(false);
    const fieldComponent = computed(() => {
      return field.value.getComponent(!editable.value, store.platform);
    });
    const setCurrentValue = value => {
      if (!isEqual(currentValue.value, value)) {
        currentValue.value = value;
      }
    };
    const fieldOperations: any = inject(SchemaFormFieldOperationStoreKey as any);
    const localStore = reactive({
      field: props.field,
      index: props.index,
      arrayIndex: props.arrayIndex,
      path: props.path,
      schemaPath: props.schemaPath,
      value: props.value
    });
    watchEffect(() => {
      localStore.arrayIndex = props.arrayIndex;
      localStore.index = props.index;
      localStore.value = props.value;
    });
    provide(FieldStore, localStore);
    watch(() => field.value, localField => {
      fieldOperations.addField(localField);
    }, {immediate: true});
    watch(() => props.value, value => {
      if (!isEqual(currentValue.value, value)) {
        setCurrentValue(value);
      }
    }, {deep: true});
    const renderFormField = (localField: SchemaFormField,
                             localValue: { [p: string]: unknown } | Array<{ [p: string]: unknown }>,
                             index: number, wrap: boolean) =>
      renderField(props.pathPrefix, store, localField, localValue, index, wrap, emit);
    const preProps = computed<{ [key: string]: unknown }>(() => {
      const localProps: { [key: string]: unknown } = {...field.value.props};
      const renderComponent = fieldComponent.value;
      const {platform} = store;
      if (renderComponent?.getProps) {
        Object.assign(localProps, renderComponent.getProps(field.value, platform));
      }
      const {path, schemaPath} = props;
      if (field.value.type === FieldTypes.Object) {
        localProps.platform = platform;
        localProps.editable = editable.value;
        localProps.layoutType = field.value.layoutType;
        localProps.layoutProps = field.value.layoutProps;
        localProps.pathPrefix = path;
        localProps.schemaPath = schemaPath;
      }
      return localProps;
    });
    const inputProps = computed(() => {
      const localProps = preProps.value;
      const definition = props.definition;
      const {platform} = store;
      const renderComponent = fieldComponent.value;
      if (isNotNull(field.value.placeholder)) {
        localProps.placeholder = field.value.placeholder;
      }
      localProps.required = field.value.required;
      if (isNull(editable.value) || platform === DESKTOP) {
        delete localProps.required;
      }
      if (!editable.value) {
        localProps.definition = definition;
        localProps.field = field.value;
      }
      if (renderComponent.mode === 'layout') {
        localProps.layout = definition.layout;
        if (definition.layoutProps) {
          Object.keys(definition.layoutProps).forEach(propKey => {
            localProps[propKey] = definition.layoutProps[propKey];
          });
        }
        localProps.fieldDefinitions = relatedSubFields.value;
      }
      localProps.disabled = isDisabled.value;
      if (['input', 'display', 'both'].includes(renderComponent.mode)) {
        localProps[renderComponent.valueProp] = currentValue.value;
      }
      if (!localProps.title && (store.platform === 'mobile' || renderComponent.mode === 'layout')) {
        localProps.title = field.value.title;
      }
      const events = field.value.generateEvents(focusState);
      Object.keys(events).forEach(eventKey => {
        localProps[eventKey] = events[eventKey];
      });
      if (editable.value) {
        localProps[`onUpdate:${renderComponent.valueProp}`] = onValueUpdate;
      }
      return localProps;
    });

    const isDisabled = computed(() => props.disabled || field.value.disabled || field.value.props?.disabled);
    const removeArrayItem = (index: number) => {
      (currentValue.value as any[]).splice(index, 1);
    };
    const addArrayItem = (index) => {
      if (isNotNull(currentValue.value)) {
        if (type.value === FieldTypes.Object) {
          if (isNotNull(index)) {
            (currentValue.value as any[]).splice(index, 0, {});
          } else {
            (currentValue.value as any[]).push({});
          }
        } else if (isNotNull(index)) {
          (currentValue.value as any[]).splice(index, 0, null);
        } else {
          (currentValue.value as any[]).push(null);
        }
      } else if (type.value === FieldTypes.Object) {
        setCurrentValue([{}]);
      } else {
        setCurrentValue([null]);
      }
    };
    const getRules = (trigger?: string): any => {
      const rules = field.value.getRules() ?? [];
      if (rules.length === 0 && field.value.required) {
        addRule(rules, field.value, {required: true, message: `${field.value.title}为必填项`});
      }
      if (trigger) {
        return rules.filter((it: any) => it.trigger === trigger);
      }
      return rules;
    };

    const type = computed(() => field.value.type);

    const getFormItemProps = () => {
      const definition = props.definition;
      const {platform} = store;
      const component = getFormItemComponent(platform);
      const formItemProps: any = {
        required: editable.value ? field.value.required : null,
        label: field.value.title
      };

      const labelPropName = platform === DESKTOP ? 'label' : 'title';
      if (definition.tip) {
        formItemProps[labelPropName] = <SchemaFormFieldLabel
          content={
            isVNode(definition.tip) ? <div>{definition.tip}</div> : <div v-html={definition.tip} />}
          platform={store.platform}
          title={field.value.title} />;
      } else {
        formItemProps[labelPropName] = field.value.title;
      }
      if (definition.wrapperProps) {
        Object.assign(formItemProps, definition.wrapperProps);
        if (definition.wrapperProps.noTitle) {
          formItemProps.title = null;
          formItemProps.label = null;
        }
      }
      Object.assign(formItemProps, config.getFormItemProps(component, field.value, platform));
      return formItemProps;
    };
    const visible = computed(() => field.value.isVisible() || !field.value.plainPath);
    const validate = (trigger?: string): IValidateResponse[] | Promise<IValidateResponse[]> => {
      if (!field.value.isVisible()) {
        return [];
      }
      if (fieldComponent.value?.mode === 'render') {
        return [];
      }
      if (fieldComponent.value?.mode === 'layout') {
        const validateFields = getSubFields();
        return new Promise<IValidateResponse[]>(resolve => {
          Promise.all(validateFields.map(it => it.props.field.validate())).then(values => {
            resolve(flat(values.filter(it => isNotNull(it))));
          });
        });
      }
      if (type.value === FieldTypes.Object && arrayRef.value) {
        const array = arrayRef.value;
        const validateFields = array.$slots.default().filter(it => it.validate);
        return new Promise<IValidateResponse[]>(resolve => {
          Promise.all(validateFields.map(it => it.validate())).then(values => {
            resolve(flat(values.filter(it => isNotNull(it))));
          });
        });
      }
      const rules = getRules(trigger);
      if (rules.length) {
        const validator = new AsyncValidator({
          [field.value.plainPath]: rules
        });
        let value = props.value;
        if ([FieldTypes.Integer, FieldTypes.Double, FieldTypes.Number].includes(type.value as any)) {
          value = parseFloat(value as FieldTypes);
        }
        const model = {
          [field.value.plainPath]: value
        };
        return new Promise<IValidateResponse[]>(resolve => {
          validator.validate(model, {firstFields: true}, (errors) => {
            if (errors) {
              field.value.valid = false;
              field.value.errors = errors.map(error => error.message);
            } else {
              field.value.valid = true;
              field.value.errors = [];
            }
            if (errors) {
              resolve([{
                errors: errors.map(it => it.message),
                field: props.field,
                invalid: errors.length > 0,
                value: currentValue.value
              }]);
            } else {
              resolve([]);
            }
          });
        });
      }
      return [];
    };
    const onArrayItemInput = (val: any, index: number) => {
      (currentValue.value as any[]).splice(index, 1, val);
      onValueUpdate(currentValue.value);
    };
    const onValueUpdate = (value) => {
      if (fieldComponent.value?.mode === 'render') {
        return;
      }
      let val = value;
      if (isRef(value)) {
        val = unref(value);
      }
      if (!isEqual(currentValue.value, val)) {
        setCurrentValue(val);
      }
    };
    const getArrayComponent = () => {
      const definition = props.definition;
      if (typeof definition.arrayComponent === 'string') {
        const componentDef = getComponentType(store, {
          type: definition.arrayComponent
        });
        if (componentDef.component !== Empty) {
          return componentDef.component;
        }
      } else if (['function', 'object'].includes(typeof definition.arrayComponent)) {
        return definition.arrayComponent;
      }
      return ArrayWrapper;
    };
    const renderArrayInputComponent = (propsTmp, inputFieldDef: SchemaFormComponent) => {
      const InputFieldComponent = inputFieldDef.component;
      const definition = props.definition;
      const ArrayComponent = getArrayComponent();
      const valueProp = inputFieldDef.valueProp;
      const arrayContent = currentValue.value ? (currentValue.value as any[]).map((v, index) => {
        const itemProps: any = {
          ...propsTmp,
          pathPrefix: (props.path as Array<string | number>).concat(index),
          schemaPath: props.path
        };
        if (field.value.type === FieldTypes.Object) {
          itemProps.definition = {
            ...itemProps.definition
          };
          delete itemProps.definition.array;
        }
        const events = field.value.generateEvents(focusState);
        const className = itemProps.className;
        const style = itemProps.style;
        delete itemProps.className;
        delete itemProps.style;
        if (isNotNull(v) && typeof v === 'object') {
          if (!v.__id__) {
            v.__id__ = uuid();
          }
        }
        let key = '';
        if (definition.rowKey && isNotNull(v) && typeof v === 'object') {
          if (typeof definition.rowKey === 'string') {
            key = v[definition.rowKey];
          } else if (typeof definition.rowKey === 'function') {
            key = definition.rowKey(v);
          }
        } else if (isNotNull(v) && typeof v === 'object') {
          key = v.__id__;
        }
        Object.assign(itemProps, {
          ...events,
          class: className,
          style,
          arrayIndex: index,
          disabled: isDisabled.value,
          key,
          [valueProp]: v,
          title: store.platform === 'mobile' ? field.value.title : null,
          ['onUpdate:' + valueProp]: (val) => {
            const oldValue = currentValue.value[index];
            if (!isEqual(val, oldValue)) {
              onArrayItemInput(val, index);
            }
          }
        });
        return <InputFieldComponent {...itemProps} />;
      }) : null;
      const arrayProps = {...propsTmp, ...definition.arrayProps};
      const arrayClass = arrayProps.className;
      const arrayStyle = arrayProps.style;
      delete arrayProps.className;
      delete arrayProps.style;
      Object.assign(arrayProps, {
        class: arrayClass,
        style: arrayStyle,
        disabled: isDisabled.value,
        title: field.value.title,
        subForm: field.value.type === FieldTypes.Object,
        addBtnText: propsTmp.addBtnText,
        key: field.value.plainPath,
        addBtnProps: propsTmp.addBtnProps,
        cellSpan: propsTmp.cellSpan,
        field: field.value,
        ref: el => {
          arrayRef.value = el;
        },
        onRemove: async (index) => {
          try {
            try {
              removeArrayItem(index);
            } catch (e) {
              // do nothing
            }
          } catch (e) {
            console.error(e);
          }
        },
        onMoveDown: index => {
          if (index <= (currentValue.value as any[]).length - 1) {
            const newArray = [...currentValue.value as any[]];
            swap(newArray, index, index + 1);
            currentValue.value = newArray;
          }
        },
        onMoveUp: index => {
          if (index > 0) {
            const newArray = [...currentValue.value as any[]];
            swap(newArray, index, index - 1);
            currentValue.value = newArray;
          }
        },
        onAdd: (index) => {
          addArrayItem(index);
        }
      });
      return <ArrayComponent {...arrayProps}
                             v-show={visible.value}
                             v-slots={{
                               default: () => arrayContent
                             }} />;
    };
    const relatedSubFields = computed(() => {
      const definition = props.definition;
      return getRealFields(definition);
    });
    const getSubFields = () => {
      const noWrap = isNull(field.value.title);
      return relatedSubFields.value.map((localField, index) =>
        renderFormField(localField, props.value as { [p: string]: any } | Array<{
          [p: string]: any
        }>, index, !noWrap)) as any;
    };
    const wrapText = (content: VNode | string) => {
      if (isVNode(content)) {
        const style: Partial<CSSStyleDeclaration> = {};
        if (!visible.value) {
          style.display = 'none';
        }
        if (content.props.style && typeof content.props.style === 'object') {
          Object.assign(content.props.style, style);
        } else {
          content.props.style = style;
        }
        return content;
      } else if (Array.isArray(content)) {
        return content.map(item => wrapText(item));
      } else {
        return <div v-show={visible.value}>{content}</div>;
      }
    };
    const renderInputComponent = () => {
      const propsTmp = {...(inputProps.value)};
      const {content} = props;
      const definition = props.definition;
      const inputFieldDef = fieldComponent.value;
      let InputFieldComponent = inputFieldDef.component;
      if (isProxy(InputFieldComponent)) {
        InputFieldComponent = toRaw(InputFieldComponent);
      }
      if (content) {
        return wrapText(content);
      }
      if (!editable.value && field.value.displayValue) {
        let displayValue: any;
        if (typeof field.value.displayValue === 'function') {
          displayValue = field.value.displayValue(currentValue.value);
        } else {
          displayValue = field.value.displayValue;
        }
        return wrapText(displayValue);
      }
      // 渲染数组
      if (field.value.array && inputFieldDef.arrayMode === 'single') {
        return renderArrayInputComponent(propsTmp, inputFieldDef);
      }
      const style: any = Object.assign({}, inputProps.value.style ?? {});
      delete propsTmp.className;
      delete propsTmp.style;
      const slots: { [name: string]: Slot } = {};
      if (inputFieldDef.mode === 'layout') {
        slots.default = getSubFields;
      }
      if (definition.slots) {
        const slotsDef = definition.slots;
        Object.keys(slotsDef).forEach(slotName => {
          if (typeof slotsDef[slotName] === 'string') {
            if (store.root.slots?.[slotsDef[slotName] as string]) {
              slots[slotName] = store.root.slots[slotsDef[slotName] as string];
            }
          } else {
            slots[slotName] = slotsDef[slotName] as Slot;
          }
        });
      }
      if (!editable.value) {
        propsTmp.value = props.value;
      }
      const formItemProps = getFormItemProps();
      const {platform} = store;
      if (platform === 'mobile') {
        Object.keys(formItemProps).forEach(key => {
          if (propsTmp[key] === undefined) {
            propsTmp[key] = formItemProps[key];
          }
        });
        propsTmp.title = formItemProps.title;
      }
      if (field.value.type === 'object') {
        const fields = getRealFields(props.definition);
        const currentFields = (propsTmp.definition as any).fields;
        if (!isEqual(currentFields, fields)) {
          (propsTmp.definition as any).fields = fields;
        }
      }
      if (platform === MOBILE && !visible.value) {
        style.display = 'none';
      }
      propsTmp.class = classNames(props.definition.class, propsTmp.className as string | string[] | Record<string, boolean>, {
        'schema-form-field': platform === 'mobile',
        'schema-form-field-focused': platform === 'mobile' && focusState.value,
        'schema-form-field-readonly': platform === 'mobile' && !editable.value,
        'schema-form-field-editable': platform === 'mobile' && editable.value
      });
      propsTmp.style = style;
      if (inputFieldDef.layoutOptions?.noDirectives) {
        return <InputFieldComponent
          {...propsTmp}
          v-slots={slots}
          key={field.value.plainPath}
          ref={el => {
            inputRef.value = el;
            field.value.inputRef = el;
          }} />;
      } else {
        return <InputFieldComponent
          {...propsTmp}
          v-show={visible.value}
          v-slots={slots}
          key={field.value.plainPath}
          ref={el => {
            inputRef.value = el;
            field.value.inputRef = el;
          }} />;
      }
    };
    onBeforeUnmount(() => {
      fieldOperations.removeField(field.value);
    });
    watch(() => props.field, () => {
      // 初始化属性
      Object.assign(field.value, {
        validate,
        value: currentValue.value,
        focus: () => {
          if (isVNode(inputRef.value)) {
            inputRef.value.el.focus();
          } else if (inputRef.value?.focus) {
            inputRef.value?.focus?.();
          }
        },
        reset: () => {
          setCurrentValue(getDefaultValue(field.value));
        },
        setGetValue: value => {
          if (value === undefined) {
            return currentValue.value;
          } else {
            setCurrentValue(value);
          }
        }
      });
    }, {immediate: true});
    const onCreated = () => {
      // 设置默认值
      if (isNullStructValue(currentValue.value, field.value.destructPath.destruct)) {
        setCurrentValue(getDefaultValue(field.value));
      }
      // 触发创建事件
      store.context.trigger(SchemaFormEvents.fieldCreate, {
        path: field.value.plainPath,
        value: currentValue.value,
        field: field.value
      });
    };
    onCreated();

    const renderDesktopComponent = () => {
      const inputComponent = renderInputComponent();
      const definition = props.definition;
      const {platform} = store;
      const FormItemComponent: any = getFormItemComponent(platform);
      const ColComponent: any = getColComponent(store.platform);
      const formItemProps = getFormItemProps();
      const style = formItemProps.style;
      const inputFieldDef = fieldComponent.value;
      const className = classNames(formItemProps.class as ClassType, {
        'is-layout': inputFieldDef.mode === 'layout',
        'schema-form-field': true,
        'schema-form-field-focused': focusState.value,
        'schema-form-field-readonly': !editable.value,
        'schema-form-field-editable': editable.value
      });
      delete formItemProps.className;
      // 是否使用form-item组件包裹
      const noWrap = isNoWrap(inputFieldDef, definition, store, field.value);
      // 是否使用form-item组件的title
      const noTitle = !!(definition?.wrapperProps?.noTitle ?? inputFieldDef.layoutOptions?.noTitle);
      const label = [];
      if (!noTitle) {
        if (store.props?.index) {
          label.push(<span class="form-item-index">{props.index + 1}. </span>);
        }
        if (isNotNull(formItemProps.label)) {
          label.push(formItemProps.label);
        }
      }
      if (label.length) {
        if (formItemProps.slots) {
          formItemProps.slots.label = () => label;
        } else {
          formItemProps.slots = {
            label: () => label
          };
        }
      }
      const slots = formItemProps.slots;
      delete formItemProps.slots;
      delete formItemProps.label;
      const formItem = noWrap ? inputComponent :
        <FormItemComponent
          {...formItemProps}
          v-slots={slots}
          v-show={visible.value}
          key={props.field.plainPath}
          class={className}
          style={style}>
          {inputComponent}
        </FormItemComponent>;
      if (definition.span) {
        return <ColComponent
          v-show={visible.value}
          span={definition.span}>{formItem}</ColComponent>;
      } else {
        return formItem;
      }
    };
    const resolveWrap = () => {
      if (field.value.getComponent(true).wrap === false) {
        return false;
      }
      return typeof field.value.getComponent(true).wrap !== 'object'
        || (field.value.getComponent().wrap as any).mobile !== false;
    };
    /**
     * 兼容性处理，如果需要引入新的组件库，需要修改代码进行支持
     *
     * @author 吴昊
     * @since 0.1.19
     */
    const createSimpleMobileFieldComponent = () => {
      const inputComponent = renderInputComponent();
      if (field.value.type === FieldTypes.Object) {
        return inputComponent;
      }
      const formItemProps: Record<string, unknown> = {title: field.value.title};
      const FormItem: any = LibComponents.formItem['mobile'];
      const slots = {
        extra: () => inputComponent
      };
      const classes = classNames(formItemProps.class as string | Record<string, unknown>, {
        'schema-form-field': true,
        'schema-form-field-focused': focusState.value,
        'schema-form-field-readonly': !editable.value,
        'schema-form-field-editable': editable.value
      });
      return resolveWrap() ? <FormItem
        {...formItemProps}
        class={classes}
        v-slots={slots}
        v-show={visible.value}
      /> : h(inputComponent, {class: classes});
    };
    watchEffect(() => {
      const v = calcShowState(props.definition, store.value, field.value);
      if (v !== undefined) {
        field.value.setVisible(v);
      }
    });
    watchEffect(() => {
      const e = calcEditable(props.definition, store.value, field.value);
      if (e !== undefined) {
        field.value.editable = e;
      }
    });
    watchEffect(() => {
      const opts = resolveOptions(field.value, store.value);
      if (opts !== undefined) {
        field.value.options = opts;
      }
    });
    watchEffect(() => {
      const title = resolveTitle(props.definition, store.value, field.value);
      if (title !== undefined) {
        field.value.title = title;
      }
    });
    return {
      editable,
      store,
      createSimpleMobileFieldComponent,
      currentValue,
      renderInputComponent,
      renderDesktopComponent
    };
  },
  render() {
    const field = this.field;
    const {editable, store: {platform, transitionName, transition}} = this;
    const definition = this.definition;
    if (definition.slot) {
      if (typeof definition.slot === 'function') {
        return definition.slot();
      }
      const slot = this.store.root.slots[definition.slot];
      const content = slot ? slot() : undefined;
      if (Array.isArray(content)) {
        content.forEach((node: VNode) => {
          node.props = node.props ?? {};
          node.props.style = node.props.style ?? {};
          if (field.isVisible()) {
            delete node.props.style.display;
          } else {
            node.props.style.display = 'none';
          }
        });
      }
      return content;
    }
    let item = null;
    if (platform === DESKTOP) {
      item = this.renderDesktopComponent();
    } else if (platform === MOBILE) {
      if (editable) {
        item = this.renderInputComponent();
      } else {
        item = this.createSimpleMobileFieldComponent();
      }
    }
    if (transition) {
      return <Transition name={transitionName}>
        {item}
      </Transition>;
    }
    return item;
  }
});
