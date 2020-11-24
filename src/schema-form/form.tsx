import className from 'classname';
import {Subject} from 'rxjs';
import {
  Actions,
  Effects,
  EffectsContext,
  EffectsHandlers,
  FormProps,
  IField,
  Paths,
  Platform,
  SchemaFormField, SchemaFormStore
} from '../../types';
import Vue, {VNode} from 'vue';
import Component from 'vue-class-component';
import {Prop, Provide, Watch} from 'vue-property-decorator';
import {IValidateResponse} from '../uform/types';
import {clone, isEqual} from '../uform/utils';
import runValidation from '../uform/validator';
import {registerAntd} from './antd/register';
import {registerElement} from './element/register';
import {hasListener, renderField, SchemaFormEvents} from './internal/utils';
import {registerLayout} from './layout/register';
import {registerAntdMobile} from './mobile/register';
import {
  appendPath,
  findFieldPath,
  isFuzzyPath,
  isPathMatchPatterns,
  match,
  replaceLastPath,
  takePath
} from './utils/path';
import {register, addComponent, registerResponsiveComponent, registerDisplay} from './utils/register';
import {ASchemaForm, LibComponents, MobileLibComponents} from './utils/utils';
import { registerVant } from './vant';


export const SCHEMA_FORM_STORE_INJECT_KEY = 'store';
export const SCHEMA_FIELD_INJECT_KEY = '_field';
export const SCHEMA_FIELD_FORM_VALUE_INJECT_KEY = '_form_value';

@Component({
  name: ASchemaForm
})
export default class SchemaForm extends Vue {
  public static Field: any;
  public static install: (Vue) => void;
  public static registerAntd = registerAntd;
  public static registerAntdMobile = registerAntdMobile;
  public static registerVant = registerVant;
  public static registerElement = registerElement;
  public static registerComponent = register;
  public static register = addComponent;
  public static registerResponsiveComponent = registerResponsiveComponent;
  public static registerLayout = registerLayout;
  public static registerDisplayComponent = registerDisplay;
  @Prop({type: String, default: 'schema-form'})
  public prefixCls: string;
  @Prop({type: Boolean, default: false})
  public disabled: boolean;
  @Prop({type: Boolean, default: false})
  public readonly: boolean;
  @Prop({type: Boolean, default: false})
  public loading: boolean;
  @Prop({type: Array})
  public actions: Actions;
  @Prop({type: String, default: 'desktop'})
  public platform: Platform;
  @Prop({type: String})
  public mode: 'edit' | 'display' | undefined;
  @Prop({type: Boolean, default: true})
  public editable: boolean;
  @Prop(Function)
  public effects: Effects;
  @Prop({type: Object, required: true})
  public schema: SchemaFormField;
  @Prop({type: Object, default: () => ({})})
  public props: FormProps;
  @Prop([Object, Array])
  public value: object | any[];
  @Prop([String, Object])
  public title: VNode | string;
  @Prop({type: Boolean, default: false})
  public inline: boolean;
  @Prop({type: Boolean, default: false})
  public sticky: boolean;
  @Provide(SCHEMA_FORM_STORE_INJECT_KEY)
  public store: SchemaFormStore = Vue.observable({
    fields: {},
    // @ts-ignore
    disabled: this.disabled,
    // @ts-ignore
    loading: this.loading,
    // @ts-ignore
    readonly: this.readonly,
    // @ts-ignore
    platform: this.platform,
    // @ts-ignore
    props: this.props,
    // @ts-ignore
    effects: this.effects,
    // @ts-ignore
    inline: this.inline,
    // @ts-ignore
    editable: this.editable,
    context: null,
    root: this
  });
  public currentValue: any = null;

  @Watch('readonly', {immediate: true})
  public readonlyChanged(readonly: boolean) {
    this.store.readonly = readonly;
  }

  @Watch('disabled', {immediate: true})
  public disabledChanged(disabled: boolean) {
    this.store.disabled = disabled;
  }

  @Watch('platform')
  public platformChanged(platform: 'mobile' | 'desktop') {
    this.store.platform = platform;
  }

  @Watch('props', {immediate: true, deep: true})
  public propsChanged(props: FormProps) {
    this.store.props = props;
  }

  @Watch('mode')
  public modeChanged(mode: 'edit' | 'display') {
    this.store.editable = mode === 'edit';
  }

  @Watch('loading', {immediate: true})
  public loadingChanged(loading: boolean) {
    this.store.loading = loading;
  }

  public mounted() {
    if (this.effects) {
      this.effects(this.store.context!);
    }
  }

  public matchFields(paths: Paths): IField[] {
    const matchedPaths = match(paths, this.store.fields);
    return matchedPaths.map(path => this.store.fields[path]).filter(it => !!it);
  }

  public createContext(): EffectsContext {
    const context: EffectsContext = (...paths) => {
      return {
        paths: () => {
          return context(...paths).fields().map(it => it.plainPath);
        },
        fields: () => {
          return this.matchFields(paths);
        },
        toggle: (): EffectsHandlers => {
          this.matchFields(paths).forEach(field => {
            field.visible = !field.visible;
          });
          return context(...paths);
        },
        value: (value: any) => {
          const res = this.matchFields(paths).map(it =>
              typeof value === 'function' ? it.setGetValue(value(it)) : it.setGetValue(value));
          if (value === undefined) {
            if (paths.length === 1 && !isFuzzyPath(paths[0])) {
              return res[0];
            } else {
              return res;
            }
          }
        },
        hide: (): EffectsHandlers => {
          this.matchFields(paths).forEach(field => {
            field.visible = false;
          });
          return context(...paths);
        },
        show: (): EffectsHandlers => {
          this.matchFields(paths).forEach(field => {
            field.visible = true;
          });
          return context(...paths);
        },
        setEnum: (options: any): EffectsHandlers => {
          this.matchFields(paths).forEach(field => {
            if (typeof options === 'function') {
              field.enum = options(field);
            } else {
              field.enum = options;
            }
          });
          return context(...paths);
        },
        setTitle: (title) => {
          this.matchFields(paths).forEach(field => {
            if (typeof title === 'function') {
              field.title = title(field);
            } else {
              field.title = title;
            }
          });
          return context(...paths);
        },
        setFieldProps: (props): EffectsHandlers => {
          this.matchFields(paths).forEach(field => {
            if (typeof props === 'function') {
              field.props = Object.assign({}, field.props, props(field));
            } else {
              field.props = Object.assign({}, field.props, props);
            }
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
        setDisplayValue: (value) => {
          this.matchFields(paths).forEach(field => {
            if (typeof value === 'function') {
              field.displayValue = value(field);
            } else {
              field.displayValue = value;
            }
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
                  it, this.store.fields
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
              return context(...appendPath((paths as SchemaFormField[]).map(it => findFieldPath(it, this.store.fields)), suffix));
            }
          }
        },
        disable: () => {
          this.matchFields(paths).forEach(field => {
            field.disabled = true;
          });
          return context(...paths);
        },
        enable: () => {
          this.matchFields(paths).forEach(field => {
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
          this.$nextTick(() => {
            if (typeof pathsOrHandler === 'function') {
              pathsOrHandler(v);
            } else {
              const patterns = typeof pathsOrHandler === 'string' ? [pathsOrHandler]
                  : (Array.isArray(pathsOrHandler) ? (pathsOrHandler as any[]).map((item: string | SchemaFormField) => {
                    if (typeof item === 'string') {
                      return item;
                    } else {
                      return findFieldPath(item, this.store.fields);
                    }
                  }) : [findFieldPath(pathsOrHandler, this.store.fields)]);
              if (isPathMatchPatterns(v.field, patterns)) {
                if (e === SchemaFormEvents.fieldChange || e === SchemaFormEvents.fieldCreate) {
                  handler(v.value, v.path, v.field);
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
      this.onOk(forceValidate, callback);
    };
    context.validate = async (handler) => {
      const errors = await runValidation(this.currentValue, this.store.fields, true);
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
      return this.currentValue;
    };
    context.trigger = (event: string, value: any) => {
      this.$nextTick(() => {
        const subject = this.store.context!.subscribes[event];
        if (subject) {
          subject.next(value);
        }
      });
    };
    return context;
  }

  @Watch('value', {deep: true})
  public valueChanged() {
    this.setCurrentValue();
  }

  public created() {
    this.setCurrentValue();
    this.store.context = this.createContext();
    this.store.editable = this.mode !== undefined ? this.mode === 'edit' : this.editable;
    if (this.mode !== undefined) {
      console.warn('mode属性已经废弃，请使用editable属性代替');
    }
    this.$watch(() => this.editable, (editable: boolean) => {
      this.store.editable = editable;
    });
    this.$on('SchemaForm.addSchemaField', (field) => {
      if (field) {
        this.store.fields[field.plainPath] = field;
      }
    });
    this.$on('SchemaForm.removeSchemaField', (field) => {
      if (field) {
        delete this.store.fields[field.plainPath];
      }
    });
  }

  @Watch('currentValue', {deep: true})
  public currentValueChanged(v) {
    const cloneValue = clone(v);
    this.$emit('input', cloneValue);
    this.$emit('change', cloneValue);
  }

  public render() {
    const {title, sticky, prefixCls, store, currentValue, schema} = this;
    const rootFieldDef: SchemaFormField = Object.assign({}, schema, {
      type: 'object',
      title,
      props: this.schema.props
    });
    let content: any = [
      this.$slots.header,
      renderField(null, store,
          rootFieldDef, currentValue, 0, false, this.$createElement, this
      )
    ];
    let footer: any = [
      this.renderButtons(),
      this.$slots.footer
    ];
    if (this.sticky) {
      content = <LibComponents.content>
        {content}
      </LibComponents.content>;
      footer = <LibComponents.footer>
        {footer}
      </LibComponents.footer>;
    }
    const classes = className(prefixCls, {
      [`${prefixCls}-sticky`]: sticky
    }, `${prefixCls}-${this.platform}`);
    return <div class={classes}>
      {content}
      {footer}
    </div>;
  }

  public renderButtons() {
    const {props} = this.store;
    const {actions} = this;
    if (props && this.store.editable) {
      if (this.$slots.btns) {
        return this.$slots.btns;
      }
      const buttons = [];
      if (actions) {
        actions.forEach(action => {
          if (typeof action === 'string') {
            switch (action) {
              case 'submit':
                buttons.push(this.createSubmitButton());
                break;
              case 'cancel':
                buttons.push(this.createCancelButton());
                break;
              case 'reset':
                buttons.push(this.createResetButton());
                break;
            }
          } else if (typeof action === 'object') {
            switch (action.name) {
              case 'submit':
                buttons.push(this.createSubmitButton(action.text, action.props, action.action));
                break;
              case 'cancel':
                buttons.push(this.createCancelButton(action.text, action.props, action.action));
                break;
              case 'reset':
                buttons.push(this.createResetButton(action.text, action.props, action.action));
                break;
              default:
                const props: any = action.props || {};
                props.disabled = this.disabled || this.loading;
                buttons.push(this.createButton(action.text, action.action, props, null));
                break;
            }
          }
        });
      } else {
        buttons.push(this.createCancelButton());
        buttons.push(this.createSubmitButton());
        buttons.push(this.createResetButton());
      }
      return <div class="action-btns">
        {buttons}
      </div>;
    }
  }

  public async onOk(forceValidate: boolean,
                    callback?: (value) => any) {
    if (hasListener(this, 'ok')) {
      if (forceValidate) {
        const errors = await this.validate();
        if (errors.length) {
          console.warn('有错误', errors);
          this.store.context.trigger(SchemaFormEvents.validate, errors);
        } else {
          if (callback) {
            callback(this.currentValue);
          } else {
            this.$emit('ok', this.currentValue);
          }
        }
      } else {
        if (callback) {
          callback(this.currentValue);
        } else {
          this.$emit('ok', this.currentValue);
        }
      }
    }
  }

  public validate(): Promise<IValidateResponse[]> | [] {
    return runValidation(this.currentValue, this.store.fields, true);
  }

  private createSubmitButton(text: string = '', btnProps: object = null, action: () => any = null) {
    const hasOkHandler = hasListener(this, 'ok');
    if (!hasOkHandler) {
      return null;
    }
    const {props} = this;
    const buttonProps = btnProps || (props && props.okProps) || {};
    if (!buttonProps.type) {
      buttonProps.type = 'primary';
    }
    buttonProps.disabled = this.disabled;
    buttonProps.loading = this.loading;
    return this.createButton(
        text || props && props.okText || '提交',
        action || (() => {
          this.onOk(true);
        }), buttonProps, 'confirm-btn'
    );
  }

  private createButton(text, action, attrs, classes) {
    const {platform} = this;
    const ButtonComponent = platform === 'mobile' ? MobileLibComponents.button : LibComponents.button;
    const Button = <ButtonComponent class={classes}
                                    props={attrs}
                                    onClick={() => {
                                      action(this.store.context);
                                    }}>
      {text}
    </ButtonComponent>;
    if (platform === 'mobile') {
      return [<m-white-space/>, Button];
    }
    return Button;
  }

  private createCancelButton(text: string = '', btnProps: object = null, action: () => any = null) {
    const hasCancelHandler = hasListener(this, 'cancel');
    if (!hasCancelHandler) {
      return null;
    }
    const {props} = this;
    const buttonProps = btnProps || (props && props.cancelProps) || {};
    buttonProps.disabled = this.disabled || this.loading;
    return this.createButton(
        text || props?.cancelText || '取消',
        action || this.onCancel, buttonProps,
        'cancel-btn'
    );
  }

  private createResetButton(text: string = '', btnProps: object = null, action: () => any = null) {
    const hasResetHandler = hasListener(this, 'reset');
    if (!hasResetHandler) {
      return null;
    }
    const {props} = this;
    const buttonProps = btnProps || (props && props.cancelProps) || {};
    buttonProps.disabled = this.disabled || this.loading;
    return this.createButton(
        text || props && props.cancelText || '重置',
        action || this.onReset, buttonProps, 'reset-btn'
    );
  }

  public onReset() {
    this.$emit('reset');
  }

  public onCancel() {
    this.$emit('cancel');
  }

  private setCurrentValue() {
    if (!(this.currentValue && isEqual(this.value, this.currentValue))) {
      if (this.value) {
        this.currentValue = clone(this.value);
      } else if (this.schema.array) {
        this.currentValue = [];
      } else {
        this.currentValue = {};
      }
    }
  }
}
