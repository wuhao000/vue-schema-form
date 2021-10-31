import AsyncValidator from 'async-validator';
import classNames from 'classnames';
import _ from 'lodash';
import {
  computed,
  defineComponent,
  inject,
  isProxy,
  isRef,
  onBeforeUnmount,
  PropType,
  ref,
  toRaw,
  unref,
  VNode,
  watch
} from 'vue';
import {SchemaFormComponent, SchemaFormField, SchemaFormStore} from '../../../types';
import ArrayWrapper from '../common/array-wrapper';
import {createSimpleMobileFieldComponent} from '../compatible';
import {config, getConfirmFunction} from '../config';
import Empty from '../empty';
import {isEqual} from '../uform/utils';
import {flat} from '../utils/array';
import {SchemaFormFieldOperationStoreKey, SchemaFormStoreKey} from '../utils/key';
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
  swap
} from '../utils/utils';
import {
  FieldDefinition,
  getComponentType,
  getFormItemComponent,
  getRealFields,
  renderField,
  SchemaFormEvents
} from './utils';


export default defineComponent({
  name: 'VSchemaFormField',
  inheritAttrs: false,
  props: {
    definition: Object,
    formValue: [Object, Array],
    wrap: {
      type: Boolean,
      default: true
    },
    value: {
      type: [Object, String, Boolean, Number, Array]
    },
    content: {
      type: [Object, String]
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
    pathPrefix: {type: Array as PropType<string[]>}
  },
  emits: ['change', 'update:value'],
  setup($props, {emit}) {
    const store: SchemaFormStore = inject(SchemaFormStoreKey);
    const arrayRef = ref<VNode>(null);
    const inputRef = ref<any>(null);
    const currentValue = ref($props.value || null);
    const field = computed(() => $props.field as FieldDefinition);
    watch(() => currentValue.value, (val) => {
      field.value.value = val;
      if (store.editable && field.value.editable) {
        emit(`update:value`, val);
        emit('change', val);
        if (!field.value.valid) {
          validate();
        }
      }
      store.context.trigger(SchemaFormEvents.fieldChange, {
        path: field.value.plainPath,
        value: val,
        field: field.value
      });
    }, {deep: true});
    const setCurrentValue = value => {
      const component = fieldComponent.value;
      if ((!component || component.mode.includes('input')) && !isEqual(currentValue.value, value)) {
        currentValue.value = value;
      }
    };
    const fieldOperations: any = inject(SchemaFormFieldOperationStoreKey);
    watch(() => field.value, localField => {
      fieldOperations.addField(localField);
    }, {immediate: true});
    watch(() => $props.value, value => {
      if (!isEqual(currentValue.value, value)) {
        setCurrentValue(value);
      }
    }, {deep: true});
    const renderFormField = (localField: SchemaFormField,
                             localValue: { [p: string]: any } | Array<{ [p: string]: any }>,
                             index: number, wrap: boolean) => {
      return renderField($props.pathPrefix as string[], store, localField, localValue, index, wrap, emit);
    };
    const editable = computed(() => store.editable && field.value.editable);
    const fieldComponent = computed(() => {
      if (field.value.slot) {
        return undefined;
      }
      return field.value.getComponent(!editable.value, store.platform);
    });
    const inputProps = computed(() => {
      const {definition, path, schemaPath} = $props;
      const {platform} = store;
      const renderComponent = fieldComponent.value;
      const localProps: any = renderComponent === undefined ? {} : Object.assign({}, renderComponent.getProps(field.value));
      const localType = field.value.type;
      if (localType === FieldTypes.Object) {
        localProps.platform = platform;
        localProps.editable = editable.value;
        localProps.pathPrefix = path;
        localProps.schemaPath = schemaPath;
        localProps.layoutType = definition.layoutType;
        localProps.layoutProps = definition.layoutProps;
      }
      if (isNotNull(definition.placeholder)) {
        localProps.placeholder = definition.placeholder;
      }
      localProps.required = field.value.required;
      if (isNull(editable.value) || platform === DESKTOP) {
        delete localProps.required;
      }
      return localProps;
    });
    const isDisabled = computed(() => {
      return $props.disabled || field.value.disabled || (field.value.props && field.value.props.disabled);
    });
    const removeArrayItem = (index: number) => {
      (currentValue.value as any[]).splice(index, 1);
    };
    const addArrayItem = () => {
      if (isNotNull(currentValue.value)) {
        if (type.value === FieldTypes.Object) {
          (currentValue.value as any[]).push({});
        } else {
          (currentValue.value as any[]).push(null);
        }
      } else {
        if (type.value === FieldTypes.Object) {
          setCurrentValue([{}]);
        } else {
          setCurrentValue([null]);
        }
      }
    };
    const getRules = (trigger?: string): any => {
      const rules = field.value.getRules() || [];
      if (rules.length === 0 && field.value.required) {
        addRule(rules, field.value, {required: true, message: `${field.value.title}为必填项`});
      }
      if (trigger) {
        return rules.filter((it: any) => it.trigger === trigger);
      }
      return rules;
    };

    const type = computed(() => {
      return field.value.type;
    });

    const getFormItemProps = () => {
      const {definition} = $props;
      const {platform} = store;
      const component = getFormItemComponent(platform);
      const props: any = {
        required: editable.value ? field.value.required : null,
        title: definition.title,
        label: definition.title
      };
      if (platform === DESKTOP) {
        if (definition.tip) {
          const InfoIcon = LibComponents.icons[store.platform].info;
          const LibComponentsPopover: any = LibComponents.popover[DESKTOP];
          const slots = {
            default: () => <span>
              {definition.title}
              <InfoIcon style={{marginLeft: '5px', color: '#247dc5'}}/>
            </span>
          };
          props.label = <LibComponentsPopover
            content={definition.tip}
            v-slots={slots}
            trigger="hover"/>;
        } else {
          props.label = definition.title;
        }
      }
      if (definition.wrapperProps) {
        Object.assign(props, definition.wrapperProps);
        if (definition.wrapperProps.noTitle) {
          props.title = null;
          props.label = null;
        }
      }
      Object.assign(props, config.getFormItemProps(component, field.value, platform));
      return props;
    };
    const validate = (trigger?: string) => {
      if (!field.value.visible) {
        return true;
      }
      if (fieldComponent.value?.mode?.includes('layout')) {
        return true;
      }
      if (type.value === FieldTypes.Object && arrayRef.value) {
        const array = arrayRef.value;
        const validateFields = array.props.fields.filter(it => it.validate);
        return new Promise(resolve => {
          Promise.all(validateFields.map(it => it.validate()))
            .then(values => {
              resolve(flat(values.filter(it => !!it)));
            });
        });
      }
      const rules = getRules(trigger);
      if (rules.length) {
        const validator = new AsyncValidator({
          [field.value.plainPath]: rules
        });
        let value = currentValue.value;
        if ([FieldTypes.Integer, FieldTypes.Double, FieldTypes.Number].includes(type.value as FieldTypes)) {
          value = parseFloat(value as FieldTypes);
        }
        const model = {
          [field.value.plainPath]: value
        };
        return new Promise(resolve => {
          validator.validate(model, {firstFields: true}, (errors) => {
            if (errors) {
              field.value.valid = false;
              field.value.errors = errors.map(error => error.message);
            } else {
              field.value.valid = true;
              field.value.errors = [];
            }
            if (errors) {
              resolve(errors.map(it => ({message: it.message, path: field.value.plainPath})));
            } else {
              resolve(null);
            }
          });
        });
      }
      return true;
    };
    const onArrayItemInput = (val: any, index: number) => {
      (currentValue.value as any[]).splice(index, 1, val);
      onValueUpdate(currentValue.value);
    };
    const onValueUpdate = _.debounce((value) => {
      let val = value;
      if (isRef(value)) {
        val = unref(value);
      }
      if (!isEqual(currentValue.value, val)) {
        setCurrentValue(val);
      }
    }, 10);

    const renderArrayInputComponent = (propsTmp, inputFieldDef: SchemaFormComponent) => {
      const InputFieldComponent = inputFieldDef.component;
      const {definition} = $props;
      let ArrayComponent: any = ArrayWrapper;
      if (typeof definition.arrayComponent === 'string') {
        const componentDef = getComponentType(store, {
          type: definition.arrayComponent
        });
        if (componentDef.component !== Empty) {
          ArrayComponent = componentDef.component;
        }
      } else if (['function', 'object'].includes(typeof definition.arrayComponent)) {
        ArrayComponent = definition.arrayComponent;
      }
      const valueProp = inputFieldDef.valueProp;
      const arrayContent = currentValue.value ? (currentValue.value as any[]).map((v, index) => {
        const itemProps: any = Object.assign({}, propsTmp, {
          pathPrefix: ($props.path as Array<string | number>).concat(index),
          schemaPath: $props.path
        });
        if (field.value.type === FieldTypes.Object) {
          itemProps.definition = Object.assign({}, itemProps.definition);
          delete itemProps.definition.array;
        }
        const events = field.value.generateEvents();

        const className = itemProps.className;
        const style = itemProps.style;
        delete itemProps.className;
        delete itemProps.style;
        Object.assign(itemProps, {
          ...events,
          class: className,
          style,
          arrayIndex: index,
          disabled: isDisabled.value,
          key: field.value.plainPath + '-' + index,
          [valueProp]: v,
          title: store.platform === 'mobile' ? field.value.title : null,
          ['onUpdate:' + valueProp]: _.debounce((val) => {
            const oldValue = currentValue.value[index];
            if (!isEqual(val, oldValue)) {
              onArrayItemInput(val, index);
            }
          }, 10)
        });
        return <InputFieldComponent {...itemProps}/>;
      }) : null;
      const arrayProps = Object.assign({}, propsTmp, definition.arrayProps);
      const arrayClass = arrayProps.className;
      const arrayStyle = arrayProps.style;
      delete arrayProps.className;
      delete arrayProps.style;
      // noinspection JSUnusedGlobalSymbols
      Object.assign(arrayProps, {
        class: arrayClass,
        style: arrayStyle,
        disabled: isDisabled.value,
        subForm: field.value.type === FieldTypes.Object,
        addBtnText: propsTmp.addBtnText,
        key: field.value.plainPath,
        addBtnProps: propsTmp.addBtnProps,
        cellSpan: propsTmp.cellSpan,
        field: field.value,
        ref: (el) => {
          arrayRef.value = el;
        },
        onRemove: async (index) => {
          try {
            const confirmFunc = getConfirmFunction(store.platform);
            try {
              await confirmFunc('确定删除该条吗？', '提示');
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
            swap(currentValue.value, index, index + 1);
          }
        },
        onMoveUp: index => {
          if (index > 0) {
            swap(currentValue.value, index, index - 1);
          }
        },
        onAdd: () => {
          addArrayItem();
        },
        fields: arrayContent
      });
      return <ArrayComponent {...arrayProps}/>;
    };
    const relatedSubFields = computed(() => {
      const definition = $props.definition;
      return getRealFields(definition.fields);
    });
    const subFields = computed(() => {
      const definition = $props.definition;
      const noWrap = isNull(definition.title);
      return relatedSubFields.value.map((localField, index) =>
        renderFormField(localField, currentValue.value as { [p: string]: any } | Array<{ [p: string]: any }>, index, !noWrap));
    });
    const renderInputComponent = () => {
      const propsTmp = inputProps.value;
      const {content, definition} = $props;
      const inputFieldDef = fieldComponent.value;
      let InputFieldComponent = inputFieldDef.component;
      if (isProxy(InputFieldComponent)) {
        InputFieldComponent = toRaw(InputFieldComponent);
      }
      if (content) {
        return content;
      }
      if (!editable.value && field.value.displayValue) {
        let displayValue: any;
        if (typeof field.value.displayValue === 'function') {
          displayValue = field.value.displayValue(currentValue.value);
        } else {
          displayValue = field.value.displayValue;
        }
        if (typeof displayValue === 'object') {
          return displayValue;
        } else {
          return <span>{displayValue}</span>;
        }
      }
      const style: any = Object.assign({}, inputProps.value.style || {});
      if (inputFieldDef.mode.includes('layout')) {
        propsTmp.layout = definition.layout;
        propsTmp.fields = subFields.value;
        propsTmp.fieldDefinitions = relatedSubFields.value;
      }
      const valueProp = inputFieldDef.valueProp;
      propsTmp.disabled = isDisabled.value;
      if (inputFieldDef.mode.includes('input')) {
        propsTmp[valueProp] = currentValue.value;
      }
      propsTmp.title = propsTmp.title || ((store.platform === 'mobile' || inputFieldDef.mode.includes('layout')) ? field.value.title : null);
      // 渲染数组
      if (field.value.array && inputFieldDef.mode.includes('single')) {
        return renderArrayInputComponent(propsTmp, inputFieldDef);
      }
      if (definition.type === FieldTypes.Object
        && definition.props) {
        if (!definition.props.props) {
          definition.props.props = {};
        }
        Object.keys(definition.props).forEach(key => {
          if (key !== 'props') {
            definition.props.props[key] = definition.props[key];
          }
        });
      }
      const className = propsTmp.className;
      delete propsTmp.className;
      delete propsTmp.style;

      const events = field.value.generateEvents();
      Object.assign(propsTmp, {
        ...events,
        [`onUpdate:${valueProp}`]: onValueUpdate
      });
      const slots = {};
      if (definition.slots) {
        const slotsDef = definition.slots;
        Object.keys(slotsDef).forEach(slotName => {
          if (typeof slotsDef[slotName] === 'string') {
            if (store.root.slots && store.root.slots[slotsDef[slotName] as string]) {
              slots[slotName] = store.root.slots[slotsDef[slotName] as string];
            }
          } else {
            slots[slotName] = slotsDef[slotName];
          }
        });
      }
      return <InputFieldComponent
        {...propsTmp}
        v-slots={slots}
        class={className}
        style={style}
        key={field.value.plainPath}
        ref={el => {
          inputRef.value = el;
          field.value.inputRef = el;
        }}/>;
    };
    onBeforeUnmount(() => {
      fieldOperations.removeField(field.value);
    });
    const onCreated = () => {
      // 设置默认值
      if (isNull(currentValue.value)) {
        setCurrentValue(getDefaultValue(field.value));
      }
      // 初始化属性
      Object.assign(field.value, {
        validate,
        value: currentValue.value,
        setGetValue: value => {
          if (value === undefined) {
            return currentValue.value;
          } else {
            setCurrentValue(value);
          }
        }
      });
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
      const {definition} = $props;
      const {platform} = store;
      const FormItemComponent: any = getFormItemComponent(platform);
      const ColComponent: any = getColComponent(store.platform);
      const formItemProps = getFormItemProps();
      const style = formItemProps.style;
      const inputFieldDef = fieldComponent.value;
      const className = classNames(formItemProps.className || formItemProps.class, {
        'is-layout': inputFieldDef.mode.includes('layout')
      });
      delete formItemProps.style;
      delete formItemProps.className;
      delete formItemProps.class;
      // 是否使用form-item组件包裹
      const noWrap = (definition?.wrapperProps?.noWrap ?? inputFieldDef.layoutOptions?.noWrap) || isNull(definition.title);
      // 是否使用form-item组件的title
      const noTitle = !!(definition?.wrapperProps?.noTitle ?? inputFieldDef.layoutOptions?.noTitle);
      const label = [];
      if (noTitle) {
        label.push(<span/>);
      } else {
        if (store.props?.index) {
          label.push(<span class="form-item-index">{$props.index + 1}. </span>);
        }
        label.push(formItemProps.title);
      }
      if (formItemProps.slots) {
        formItemProps.slots.label = () => label;
      } else {
        formItemProps.slots = {
          label: () => label
        };
      }
      const formItem = noWrap ? inputComponent :
        <FormItemComponent
          {...formItemProps}
          v-slots={formItemProps.slots}
          class={className}
          style={style}>
          {inputComponent}
        </FormItemComponent>;
      if (definition.span) {
        return <ColComponent span={definition.span}>{formItem}</ColComponent>;
      } else {
        return formItem;
      }
    };
    return {
      inputProps,
      type,
      editable,
      store,
      renderInputComponent,
      getFormItemProps,
      currentValue,
      renderDesktopComponent,
      subFields
    };
  },
  render() {
    const field = this.field;
    const {inputProps, definition, editable, store: {platform}} = this;
    if (definition.slot) {
      const slot = this.store.root.slots[definition.slot];
      const content = slot ? slot() : undefined;
      if (Array.isArray(content)) {
        content.forEach((node: VNode) => {
          node.props = node.props || {};
          node.props.style = node.props.style || {};
          if (field.visible) {
            delete node.props.style.display;
          } else {
            node.props.style.display = 'none';
          }
        });
      }
      return content;
    }
    if (!editable) {
      inputProps.definition = definition;
      inputProps.field = field;
    }
    let item = null;
    if (platform === DESKTOP) {
      item = this.renderDesktopComponent();
    } else if (platform === MOBILE) {
      const inputComponent = this.renderInputComponent();
      if (editable) {
        item = inputComponent;
      } else {
        item = createSimpleMobileFieldComponent(field.title, inputComponent, field);
      }
    }
    const style: Partial<CSSStyleDeclaration> = {};
    // 如果visible 是
    if (!field.visible) {
      style.display = 'none';
    }
    (item as VNode).props.style = style;
    return item;
  }
});
