import {useEmitter} from '@/mixins/emitter';
import AsyncValidator from 'async-validator';
import {SchemaFormField} from 'v-schema-form-types';
import {computed, defineComponent, getCurrentInstance, inject, onBeforeUnmount, ref, VNode, watch} from 'vue';
import {clone, isEqual} from '../../uform/utils';
import ArrayWrapper from '../array-wrapper';
import {
  addRule,
  DESKTOP,
  getColComponent,
  getConfirmFunction,
  getDefaultValue,
  getOptions,
  LibComponents,
  MOBILE,
  swap,
  TYPES
} from '../utils/utils';
import {getComponentType, getFormItemComponent, getRealFields, SchemaFormEvents} from './utils';


const LibComponentsPopover = LibComponents.popover;
const LibComponentsIcon = LibComponents.icon;

const props = {
  definition: Object,
  formValue: [Object, Array],
  wrap: {type: Boolean, default: true},
  value: {},
  content: {},
  disabled: {type: Boolean, default: false},
  path: Array,
  schemaPath: Array,
  field: {required: true},
  pathPrefix: Array
};
export default defineComponent({
  name: 'FormField',
  props,
  setup($props, {emit}) {
    const instance = getCurrentInstance();
    const store = inject('store');
    const arrayRef = ref<VNode>(null);
    const currentValue = ref(clone($props.value) || null);
    watch(() => currentValue.value, (val) => {
      $props.field.value = val;
      if (store.editable && $props.field.editable) {
        emit('input', currentValue);
        emit('change', currentValue);
      }
      store.context.trigger(SchemaFormEvents.fieldChange, {
        path: $props.field.plainPath,
        value: currentValue,
        field: $props.field
      });
    }, {deep: true});
    const {broadcast, dispatch} = useEmitter();
    watch(() => $props.field, (field) => {
      dispatch('ASchemaForm', 'SchemaForm.addSchemaField', [field]);
    }, {immediate: true});
    watch(() => $props.value, (value) => {
      if (!isEqual(currentValue.value, value)) {
        currentValue.value = clone(value);
      }
    });
    const renderField = (field: SchemaFormField, currentValue: { [p: string]: any } | Array<{ [p: string]: any }>, index: number, wrap: boolean) => {
      return renderField($props.pathPrefix, store, field, currentValue, index, wrap, instance);
    };
    const options = computed(() => {
      return getOptions($props.field);
    });
    const error = computed(() => {
      return $props.field.errors.join('、');
    });
    const editable = computed(() => {
      return store.editable && $props.field.editable;
    });
    const component = computed(() => {
      return $props.field.component;
    });
    const props = computed(() => {
      const {field, definition, component, path, schemaPath} = localProps;
      const {platform} = store;
      const localProps: any = Object.assign({}, component.getProps(field));
      const type = field.type;
      if (type === TYPES.object) {
        localProps.platform = platform;
        localProps.editable = store.editable;
        localProps.pathPrefix = path;
        localProps.schemaPath = schemaPath;
        localProps.layoutType = definition.layoutType;
        localProps.layoutProps = definition.layoutProps;
      }
      if (definition.placeholder) {
        localProps.placeholder = definition.placeholder;
      }
      localProps.required = field.required;
      if (!store.editable || platform === DESKTOP) {
        delete localProps.required;
      }
      return localProps;
    });
    const isDisabled = computed(() => {
      return $props.disabled || $props.field.disabled || ($props.field.props && $props.field.props.disabled);
    });
    const removeArrayItem = (index: number) => {
      currentValue.value.splice(index, 1);
    };
    const addArrayItem = () => {
      if (currentValue.value) {
        if (type.value === TYPES.object) {
          currentValue.value.push({});
        } else {
          currentValue.value.push(null);
        }
      } else {
        if (type.value === TYPES.object) {
          currentValue.value = [{}];
        } else {
          currentValue.value = [null];
        }
      }
    };
    const getRules = () => {
      const {definition, field} = $props;
      const rules = field.rules || [];
      if (rules.length === 0) {
        if (field.required) {
          addRule(rules, field, {required: true, message: `${field.title}为必填项`});
        }
        if (typeof definition.min === 'number') {
          addRule(rules, field, {min: definition.min, message: `${field.title}不能小于${definition.min}`});
        }
        if (typeof definition.max === 'number') {
          addRule(rules, field, {max: definition.max, message: `${field.title}不能大于${definition.max}`});
        }
      }
      return rules;
    };
    const focus = () => {
      if ((this.$el as HTMLElement).focus) {
        (this.$el as HTMLElement).focus({preventScroll: false});
        this.$el.scrollIntoView({behavior: 'smooth'});
      }
    };

    const getEventMetadata = (event) => {
      return {event, path: $props.field.plainPath, field: $props.field};
    };

    const onFocus = (event) => {
      store.context.trigger(SchemaFormEvents.fieldFocus, getEventMetadata(event));
    };

    const onKeydown = (event) => {
      store.context.trigger(SchemaFormEvents.fieldKeydown, getEventMetadata(event));
    };

    const onKeyup = (event) => {
      store.context.trigger(SchemaFormEvents.fieldKeyup, getEventMetadata(event));
    };
    const type = computed(() => {
      return $props.field.type;
    });

    const getFormItemProps = () => {
      const {definition, field} = $props;
      const {platform, editable} = store;
      const component = getFormItemComponent(platform);
      const props: any = {
        required: editable ? definition.required : null,
        title: definition.title,
        label: definition.title
      };
      if (platform === DESKTOP) {
        if (definition.tip) {
          const popover = LibComponents.popover;
          props.label = <LibComponentsPopover
            content={definition.tip}
            trigger="hover">
          <span slot={popover === 'el-popover' ? 'reference' : 'default'}>
            {definition.title}
            <LibComponentsIcon style={{marginLeft: '5px', color: '#247dc5'}}
                               type={LibComponents.icons.info}/>
          </span>
          </LibComponentsPopover>;
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
      if (component === 'd-form-item' || component === 'a-form-item') {
        props.help = field.errors.join('、');
        if (props.help) {
          props.hasFeedback = true;
          props.validateStatus = 'error';
        }
      } else if (component === 'el-form-item') {
        props.error = field.errors.join('、');
      }
      return props;
    };
    const validate = () => {
      if (component.value.layout) {
        return true;
      }
      const {field} = $props;
      if (this.type === TYPES.object && this.$refs.array) {
        const array = arrayRef.value;
        const validateFields = array.$children.filter(it => (it as any).validate);
        return new Promise((resolve) => {
          Promise.all(validateFields.map(it => {
            return it.validate();
          })).then((values) => {
            resolve(values.filter(it => !!it).flat());
          });
        });
      }
      const rules = this.getRules();
      if (rules.length) {
        const validator = new AsyncValidator({
          [field.plainPath]: rules
        });
        let value = this.currentValue;
        if ([TYPES.integer, TYPES.double, TYPES.number].includes(this.type as any)) {
          value = parseFloat(value);
        }
        const model = {
          [field.plainPath]: value
        };
        return new Promise((resolve) => {
          validator.validate(model, {firstFields: true}, (errors) => {
            if (errors) {
              field.valid = false;
              field.errors = errors.map(error => error.message);
            } else {
              field.valid = true;
              field.errors = [];
            }
            if (errors) {
              resolve(errors.map(it => ({message: it.message, path: $props.field.plainPath})));
            } else {
              resolve(null);
            }
          });
        });
      }
      return true;
    };
    const onArrayItemInput = (val: any, index: number) => {
      currentValue.value.splice(index, 1, val);
      onInput(currentValue.value);
    };
    const onInput = (value) => {
      if (!isEqual(currentValue.value, value)) {
        currentValue.value = clone(value);
      }
    };
    const onBlur = (event) => {
      if (!$props.field.valid) {
        validate();
      }
      store.context.trigger(SchemaFormEvents.fieldBlur, this.getEventMetadata(event));
    };

    const renderInputComponent = () => {
      const {content, definition, field} = $props;
      const inputFieldDef = component.value;
      const InputFieldComponent = inputFieldDef.component;
      if (content) {
        return content;
      }
      if ((!store.editable || !$props.field.editable) && field.displayValue) {
        let displayValue: any = '';
        if (typeof field.displayValue === 'function') {
          displayValue = field.displayValue(currentValue);
        } else {
          displayValue = field.displayValue;
        }
        if (typeof displayValue === 'object') {
          return displayValue;
        } else {
          return <span>{displayValue}</span>;
        }
      }
      const style: any = Object.assign({}, props.value.style || {});
      if (inputFieldDef.layout) {
        props.value.layout = definition.layout;
        const noWrap = !definition.title;
        props.value.fields = getRealFields(definition.fields).map((field, index) => {
          return renderField(field, currentValue, index, !noWrap);
        });
      }
      if (field.array && inputFieldDef.forArray === false) {
        let ArrayComponent: any = ArrayWrapper;
        if (typeof definition.arrayComponent === 'string') {
          // @ts-ignore
          const componentDef = getComponentType(store, {
            type: definition.arrayComponent,
            props: definition.arrayProps
          });
          if (componentDef.component !== 'empty') {
            ArrayComponent = componentDef.component;
          }
        } else if (['function', 'object'].includes(typeof definition.arrayComponent)) {
          ArrayComponent = definition.arrayComponent;
        }
        const arrayProps = Object.assign({}, props.value, definition.arrayProps);
        const arrayClass = arrayProps.className;
        const arrayStyle = arrayProps.style;
        delete arrayProps.className;
        delete arrayProps.style;
        // @ts-ignore
        return <ArrayComponent
          props={arrayProps}
          class={arrayClass}
          style={arrayStyle}
          disabled={isDisabled}
          subForm={field.type === TYPES.object}
          addBtnText={props.value.addBtnText}
          ref={(el) => {
            arrayRef.value = el;
          }}
          key={field.plainPath}
          platform={platform}
          addBtnProps={props.value.addBtnProps}
          cellSpan={props.value.cellSpan}
          onRemove={async (index) => {
            try {
              const confirmFunc = getConfirmFunction(platform);
              await confirmFunc('确定删除该条吗？', '提示');
              removeArrayItem(index);
            } catch (e) {
              console.error(e);
            }
          }}
          onMoveDown={(index) => {
            if (index <= currentValue.length - 1) {
              swap(currentValue, index, index + 1);
            }
          }}
          onMoveUp={(index) => {
            if (index > 0) {
              swap(currentValue, index, index - 1);
            }
          }}
          onAdd={() => {
            this.addArrayItem();
          }}>
          {
            currentValue ? currentValue.map((v, index) => {
              const itemProps = Object.assign({}, props, {
                pathPrefix: this.path.concat(index),
                schemaPath: this.path
              });
              if (field.type === TYPES.object) {
                itemProps.definition = Object.assign({}, itemProps.definition);
                delete itemProps.definition.array;
              }
              const className = itemProps.className;
              const style = itemProps.style;
              delete itemProps.className;
              delete itemProps.style;
              // @ts-ignore
              return <InputFieldComponent
                attrs={itemProps}
                class={className}
                style={style}
                arrayIndex={index}
                disabled={isDisabled}
                key={field.plainPath + '-' + index}
                value={v}
                title={platform === 'mobile' ? field.title : null}
                onBlur={onBlur}
                onFocus={onFocus}
                onInput={(val) => {
                  onArrayItemInput(val, index);
                }}/>;
            }) : null
          }
        </ArrayComponent>;
      }
      props.disabled = isDisabled;
      props.value = currentValue;
      props.title = props.title || (platform === 'mobile' ? field.title : null);
      if (definition.type === TYPES.object
        && definition.props) {
        if (!definition.props.props) {
          definition.props.props = {};
        }
        Object.keys(definition.props).forEach(key => {
          if (key !== 'props') {
            definition.props!.props[key] = definition.props[key];
          }
        });
      }
      const className = props.className;
      delete props.className;
      delete props.style;
      const nativeEvents = {};
      const events = {};
      if (this.definition.events) {
        Object.keys(this.definition.events).forEach(eventName => {
          events[eventName] = (...args: any[]) => {
            this.definition.events[eventName](this.store.context, ...args);
          };
        });
      }
      if (this.definition.nativeEvents) {
        Object.keys(this.definition.nativeEvents).forEach(eventName => {
          nativeEvents[eventName] = (...args: any[]) => {
            this.definition.nativeEvents[eventName](this.store.context, ...args);
          };
        });
      }
      // @ts-ignore
      return <InputFieldComponent
        props={props}
        value={currentValue}
        class={className}
        attrs={props}
        style={style}
        nativeOn={nativeEvents}
        on={Object.assign({
          blur: onBlur,
          focus,
          keydown: this.onKeydown,
          keyup: this.onKeyup,
          input: onInput
        }, events)}
        key={field.plainPath}
        ref="input"/>;
    };
    onBeforeUnmount(() => {
      dispatch('ASchemaForm', 'SchemaForm.removeSchemaField', [$props.field]);
    });
    {
      const {field} = $props;
      if (currentValue.value === undefined || currentValue.value === null) {
        currentValue.value = getDefaultValue(field);
      }
      field.validate = validate;
      field.value = currentValue.value;
      field.focus = onFocus;
      if (this.definition.default) {
        currentValue.value = this.definition.default;
      }
      field.setGetValue = (value: any) => {
        if (value !== undefined) {
          this.currentValue = clone(value);
        } else {
          return this.currentValue;
        }
      };
      store.context.trigger(SchemaFormEvents.fieldCreate, {
        path: field.plainPath,
        value: currentValue,
        field: this.field
      });
    }
  },
  render() {
    const {props, field, type, definition, editable, store: {platform}} = this;
    if (definition.slot) {
      return this.store.root.$slots[definition.slot];
    }
    if (!editable) {
      props.definition = definition;
      props.field = field;
    }
    const inputComponent = this.renderInputComponent();
    let item = null;
    const FormItemComponent = getFormItemComponent(platform);
    const ColComponent = getColComponent();
    if (platform === DESKTOP) {
      const formItemProps = this.getFormItemProps();
      const style = formItemProps.style;
      const className = formItemProps.className;
      delete formItemProps.style;
      delete formItemProps.className;
      const noWrap = !definition.title;
      const formItem = noWrap ? inputComponent :
        <FormItemComponent attrs={Object.assign({}, formItemProps, {label: null})}
                           class={className}
                           style={style}>
          {definition?.wrapperProps?.noTitle ? null :
            <span slot="label">{formItemProps.label}</span>}
          {inputComponent}
          {
            definition.description ? <div>{definition.description}</div> : null
          }
        </FormItemComponent>;
      if (definition.span) {
        item = <ColComponent span={definition.span}>{formItem}</ColComponent>;
      } else {
        item = formItem;
      }
    } else if (platform === MOBILE) {
      if (!editable) {
        if (type === TYPES.object) {
          item = inputComponent;
        } else {
          item = <m-list-item title={definition.title} extra={inputComponent}/>;
        }
      } else {
        item = inputComponent;
      }
    }
    const style: any = {};
    if (!field.visible) {
      style.display = 'none';
    }
    (item as VNode).data.staticStyle = style;
    return item;
  }
});
