import className from 'classname';
import {Subject} from 'rxjs';
import {EffectsContext, EffectsHandlers, IField, Paths} from 'v-schema-form-types';
import {defineComponent, getCurrentInstance, nextTick, onMounted, provide, reactive, ref, watch} from 'vue';
import {IValidateResponse} from '../uform/types';
import {clone, isEqual} from '../uform/utils';
import runValidation from '../uform/validator';
import {registerAntd} from './antd/register';
import SchemaFormField from './internal/field';
import {hasListener, renderField, SchemaFormEvents} from './internal/utils';
import {registerLayout} from './layout/register';
import {
  appendPath,
  findFieldPath,
  isFuzzyPath,
  isPathMatchPatterns,
  match,
  replaceLastPath,
  takePath
} from './utils/path';
import {register, registerDisplay} from './utils/register';
import {LibComponents} from './utils/utils';

const LibComponentsContent = LibComponents.content;
const LibComponentsFooter = LibComponents.footer;


const SchemaForm = defineComponent({
  Field: SchemaFormField,
  install: null,
  registerAntd,
  registerComponent: register,
  registerLayout,
  registerDisplayComponent: registerDisplay,
  props: {
    prefixCls: {type: String, default: 'schema-form'},
    disabled: {type: Boolean, default: false},
    readonly: {type: Boolean, default: false},
    loading: {type: Boolean, default: false},
    actions: {type: Array},
    platform: {type: String, default: 'desktop'},
    mode: {type: String},
    editable: {type: Boolean, default: true},
    effects: {type: Function},
    schema: {type: Object, required: true},
    props: {type: Object, default: () => ({})},
    value: [Object, Array],
    title: [String, Object],
    inline: {type: Boolean},
    sticky: {type: Boolean, default: false}
  },
  setup($props, {attrs, emit, slots}) {
    const instance = getCurrentInstance();
    const currentValue = ref($props.value || {});
    const store = reactive({
      fields: {},
      disabled: $props.disabled,
      loading: $props.loading,
      readonly: $props.readonly,
      platform: $props.platform,
      props: $props.props,
      effects: $props.effects,
      inline: $props.inline,
      editable: $props.editable,
      context: null,
      mode: null,
      root: instance
    });
    provide('store', store);
    watch(() => $props, (val) => {
      store.readonly = val.readonly;
      store.disabled = val.disabled;
      store.platform = val.platform;
      store.props = val.props;
      store.mode = val.mode;
      store.loading = val.loading;
      store.editable = val.editable;
    }, {deep: true});
    const matchFields = (paths: Paths): IField[] => {
      const matchedPaths = match(paths, store.fields);
      return matchedPaths.map(path => store.fields[path]).filter(it => !!it);
    };
    const createContext = (): EffectsContext => {
      const context: EffectsContext = (...paths) => {
        return {
          paths: () => {
            return context(...paths).fields().map(it => it.plainPath);
          },
          fields: () => {
            return matchFields(paths);
          },
          toggle: (): EffectsHandlers => {
            matchFields(paths).forEach(field => {
              field.visible = !field.visible;
            });
            return context(...paths);
          },
          value: (value: any) => {
            const res = matchFields(paths).map(it => it.setGetValue(value));
            if (value === undefined) {
              if (paths.length === 1 && !isFuzzyPath(paths[0])) {
                return res[0];
              } else {
                return res;
              }
            }
          },
          hide: (): EffectsHandlers => {
            matchFields(paths).forEach(field => {
              field.visible = false;
            });
            return context(...paths);
          },
          show: (): EffectsHandlers => {
            matchFields(paths).forEach(field => {
              field.visible = true;
            });
            return context(...paths);
          },
          setEnum: (options: any): EffectsHandlers => {
            matchFields(paths).forEach(field => {
              field.enum = options;
            });
            return context(...paths);
          },
          setFieldProps: (props): EffectsHandlers => {
            matchFields(paths).forEach(field => {
              field.props = Object.assign({}, field.props, props);
            });
            return context(...paths);
          },
          onFieldCreate: (callback): EffectsHandlers => {
            context.subscribe(SchemaFormEvents.fieldCreate, paths, callback);
            return context(...paths);
          },
          onFieldBlur: (callback): EffectsHandlers => {
            context.subscribe(SchemaFormEvents.fieldBlur, paths, callback);
            return context(...paths);
          },
          setDisplayValue: (value: any) => {
            matchFields(paths).forEach(field => {
              field.displayValue = value;
            });
            return context(...paths);
          },
          onFieldFocus: (callback): EffectsHandlers => {
            context.subscribe(SchemaFormEvents.fieldFocus, paths, callback);
            return context(...paths);
          },
          onFieldCreateOrChange: (callback): EffectsHandlers => {
            return context(...paths).onFieldCreate(callback)
              .onFieldChange(callback);
          },
          onFieldChange: (callback): EffectsHandlers => {
            context.subscribe(SchemaFormEvents.fieldChange, paths, callback);
            return context(...paths);
          },
          subscribe: (event: string, callback): EffectsHandlers => {
            context.subscribe(event, paths, callback);
            return context(...paths);
          },
          takePath: (number: number): EffectsHandlers => {
            if (paths.length === 0) {
              return context();
            } else {
              if (typeof paths[0] === 'string') {
                return context(...takePath(paths as string[], number));
              } else {
                return context(...takePath((paths as SchemaFormField[]).map(it => findFieldPath(
                  it, store.fields
                )), number));
              }
            }
          },
          appendPath: (suffix: string): EffectsHandlers => {
            if (paths.length === 0) {
              return context();
            } else {
              if (typeof paths[0] === 'string') {
                return context(...appendPath(paths as string[], suffix));
              } else {
                return context(...appendPath((paths as SchemaFormField[]).map(it => findFieldPath(it, store.fields)), suffix));
              }
            }
          },
          disable: () => {
            matchFields(paths).forEach(field => {
              field.disabled = true;
            });
            return context(...paths);
          },
          enable: () => {
            matchFields(paths).forEach(field => {
              field.disabled = false;
            });
            return context(...paths);
          },
          replaceLastPath: (...last: string[]): EffectsHandlers => {
            return context(...replaceLastPath(paths as string[], last));
          }
        } as EffectsHandlers;
      };
      context.subscribe = (e: string, pathsOrHandler, handler) => {
        if (!context.subscribes[e]) {
          context.subscribes[e] = new Subject();
        }
        context.subscribes[e].subscribe({
          next: (v) => {
            nextTick(() => {
              if (typeof pathsOrHandler === 'function') {
                pathsOrHandler(v);
              } else {
                const patterns = typeof pathsOrHandler === 'string' ? [pathsOrHandler]
                  : (Array.isArray(pathsOrHandler) ? (pathsOrHandler as any[]).map((item: string | SchemaFormField) => {
                    if (typeof item === 'string') {
                      return item;
                    } else {
                      return findFieldPath(item, store.fields);
                    }
                  }) : [findFieldPath(pathsOrHandler, store.fields)]);
                if (isPathMatchPatterns(v.field, patterns)) {
                  if (e === SchemaFormEvents.fieldChange || e === SchemaFormEvents.fieldCreate) {
                    handler(v.value, v.path);
                  } else if ([SchemaFormEvents.fieldFocus, SchemaFormEvents.fieldBlur].includes(e as any)) {
                    handler(v.path);
                  } else {
                    handler(v);
                  }
                }
              }
            });
          }
        });
      };
      context.submit = (forceValidate: boolean, callback: (value) => any) => {
        onOk(forceValidate, callback);
      };
      context.validate = async (handler) => {
        const errors = await runValidation(currentValue.value, store.fields, true);
        if (handler) {
          handler(errors, context);
        } else {
          return errors;
        }
      };
      context.onValidate = (handler) => {
        context.subscribe(SchemaFormEvents.validate, handler);
      };
      context.subscribes = {};
      context.getValue = () => {
        return currentValue.value;
      };
      context.trigger = (event: string, value: any) => {
        nextTick(() => {
          const subject = store.context!.subscribes[event];
          if (subject) {
            subject.next(value);
          }
        });
      };
      return context;
    };
    const onOk = async (forceValidate: boolean, callback?: (value) => any) => {
      if (attrs.onOk) {
        if (forceValidate) {
          const errors = await validate();
          if (errors.length) {
            console.warn('有错误', errors);
            store.context.trigger(SchemaFormEvents.validate, errors);
          } else {
            if (callback) {
              callback(currentValue.value);
            } else {
              emit('ok', currentValue.value);
            }
          }
        } else {
          if (callback) {
            callback(currentValue.value);
          } else {
            emit('ok', currentValue.value);
          }
        }
      }
    };
    const setCurrentValue = () => {
      if (!(currentValue && isEqual($props.value, currentValue.value))) {
        if ($props.value) {
          currentValue.value = clone($props.value);
        } else if ($props.schema.array) {
          currentValue.value = [];
        } else {
          currentValue.value = {};
        }
      }
    };
    const createSubmitButton = (text: string = '', btnProps: object = null, action: () => any = null) => {
      const hasOkHandler = attrs.onOk !== undefined;
      if (!hasOkHandler) {
        return null;
      }
      const props: {
        okProps: any;
        cancelProps: any;
        okText: any;
      } = $props.props;
      const buttonProps = btnProps || (props && props.okProps) || {};
      if (!buttonProps.type) {
        buttonProps.type = 'primary';
      }
      buttonProps.disabled = $props.disabled;
      buttonProps.loading = $props.loading;
      return createButton(
        text || props && props.okText || '提交',
        action || (() => {
          onOk(true);
        }), buttonProps, 'confirm-btn'
      );
    };
    const createButton = (text, action, attrs, classes) => {
      const {platform} = $props;
      const ButtonComponent = platform === 'mobile' ? 'm-button' : LibComponents.button;
      const Button = <ButtonComponent class={classes}
                                      props={attrs}
                                      onClick={() => {
                                        action(store.context);
                                      }}>
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
    const createCancelButton = (text: string = '', btnProps: object = null, action: () => any = null) => {
      const hasCancelHandler = attrs.onCancel !== undefined;
      if (!hasCancelHandler) {
        return null;
      }
      const props: {
        cancelProps: any;
        cancelText: any;
      } = $props.props;
      const buttonProps = btnProps || (props && props.cancelProps) || {};
      buttonProps.disabled = $props.disabled || $props.loading;
      return createButton(
        text || props?.cancelText || '取消',
        action || onCancel, buttonProps,
        'cancel-btn'
      );
    };
    const createResetButton = (text: string = '', btnProps: object = null, action: () => any = null) => {
      const hasResetHandler = attrs.onReset !== undefined;
      if (!hasResetHandler) {
        return null;
      }
      const props: {
        cancelProps: any;
        cancelText: any;
      } = $props.props;
      const buttonProps = btnProps || (props && props.cancelProps) || {};
      buttonProps.disabled = $props.disabled || $props.loading;
      return createButton(
        text || props && props.cancelText || '重置',
        action || onReset, buttonProps, 'reset-btn'
      );
    };
    const onReset = () => {
      emit('reset');
    };
    const onCancel = () => {
      emit('cancel');
    };
    const renderButtons = () => {
      const {props} = store;
      const {actions} = $props;
      if (props && store.editable) {
        if (slots.btns) {
          return slots.btns;
        }
        const buttons = [];
        if (actions) {
          actions.forEach(action => {
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
                  const props: any = action.props || {};
                  props.disabled = $props.disabled || $props.loading;
                  buttons.push(createButton(action.text, action.action, props, null));
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
    watch(() => $props.value, () => {
      setCurrentValue();
    });
    watch(() => $props.currentValue, (v) => {
      const cloneValue = clone(v);
      emit('input', cloneValue);
      emit('change', cloneValue);
    }, {deep: true});
    onMounted(() => {
      if ($props.effects) {
        $props.effects(store.context!);
      }
    });

    setCurrentValue();
    store.context = createContext();
    store.editable = $props.mode !== undefined ? $props.mode === 'edit' : $props.editable;
    if ($props.mode !== undefined) {
      console.warn('mode属性已经废弃，请使用editable属性代替');
    }
    // this.$on('SchemaForm.addSchemaField', (field) => {
    //   if (field) {
    //     store.fields[field.plainPath] = field;
    //   }
    // });
    // this.$on('SchemaForm.removeSchemaField', (field) => {
    //   if (field) {
    //     delete store.fields[field.plainPath];
    //   }
    // });
    return {
      matchFields,
      createResetButton,
      createCancelButton,
      createButton,
      createSubmitButton,
      validate,
      onOk,
      store,
      onCancel,
      onReset,
      renderButtons
    };
  },
  render() {
    const {title, sticky, prefixCls, store, currentValue, schema} = this;
    const rootFieldDef: SchemaFormField = Object.assign({}, schema, {
      type: 'object',
      title,
      props: this.schema.props
    });
    let content: any = [
      this.$slots.header,
      renderField(null, store,
        rootFieldDef, currentValue, 0, false, this
      )
    ];
    let footer: any = [
      this.renderButtons(),
      this.$slots.footer
    ];
    if (this.sticky) {
      content = <LibComponentsContent>
        {content}
      </LibComponentsContent>;
      footer = <LibComponentsFooter>
        {footer}
      </LibComponentsFooter>;
    }
    const classes = className(prefixCls, {
      [`${prefixCls}-sticky`]: sticky
    }, `${prefixCls}-${this.platform}`);
    return <div class={classes}>
      {content}
      {footer}
    </div>;
  }
});
SchemaForm.install = (app) => {
  app.component('VSchemaForm', SchemaForm);
  app.component('VSchemaFormField', SchemaFormField);
};
export default SchemaForm;
