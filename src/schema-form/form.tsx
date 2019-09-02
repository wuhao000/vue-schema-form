import InternalForm from '@/schema-form/internal/form';
import {hasListener, SchemaFormStore} from '@/schema-form/internal/utils';
import {match} from '@/schema-form/utils/path';
import {ASchemaForm, LibComponents, register, registerAntd, registerAntdMobile, registerDisplay, registerElement} from '@/schema-form/utils/utils';
import {FormDescriptor, FormProps, Platform} from '@/types/bean';
import {Effects, EffectsContext, EffectsHandlers} from '@/types/form';
import className from 'classname';
import Vue, {VNode} from 'vue';
import Component from 'vue-class-component';
import {Prop, Provide, Watch} from 'vue-property-decorator';


@Component({
  name: ASchemaForm
})
export default class SchemaForm extends Vue {

  public static Field: any;
  public static install: (Vue) => void;
  public static registerAntd = registerAntd;
  public static registerAntdMobile = registerAntdMobile;
  public static registerElement = registerElement;
  public static registerComponent = register;
  public static registerDisplayComponent = registerDisplay;
  @Prop({type: Boolean, default: false})
  public disabled: boolean;
  @Prop({type: Boolean, default: false})
  public readonly: boolean;
  @Prop({type: Boolean, default: false})
  public loading: boolean;
  @Prop({type: Array})
  public actions: Array<string | { name: string; text: string; props?: object; action?: () => {} }>;
  @Prop({type: String, default: 'desktop'})
  public platform: Platform;
  @Prop({type: String, default: 'edit'})
  public mode: 'edit' | 'display';
  @Prop(Function)
  public effects: Effects;
  @Prop(Object)
  public definition: FormDescriptor;
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

  public context: EffectsContext;

  @Provide()
  public store: SchemaFormStore = {
    fields: {},
    disabled: this.disabled,
    mode: this.mode,
    loading: this.loading,
    readonly: this.readonly,
    platform: this.platform,
    props: this.props,
    effects: this.effects,
    inline: this.inline,
    slots: this.$slots
  };

  @Watch('$slots')
  public slotsChanged(slots: any) {
    this.store.slots = slots;
  }

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
    this.$forceUpdate();
  }

  @Watch('props', {immediate: true, deep: true})
  public propsChanged(props: FormProps) {
    this.store.props = props;
  }

  @Watch('mode')
  public modeChanged(mode: 'edit' | 'display') {
    this.store.mode = mode;
    this.$forceUpdate();
  }

  @Watch('loading', {immediate: true})
  public loadingChanged(loading: boolean) {
    this.store.loading = loading;
  }


  public mounted() {
    if (this.effects) {
      this.effects(this.context);
    }
  }

  public createContext(): EffectsContext {
    const context: EffectsContext = (paths: string | string[]) => {
      let matchedPaths = [];
      if (typeof paths === 'string') {
        matchedPaths = match([paths], Object.keys(this.store.fields));
      } else if (Array.isArray(paths)) {
        matchedPaths = match(paths, Object.keys(this.store.fields));
      }
      const fields = matchedPaths.map(path => this.store.fields[path]).filter(it => !!it);
      return {
        fields: () => {
          return fields;
        },
        toggle: () => {
          fields.forEach(field => {
            field.visible = !field.visible;
          });
        },
        hide: () => {
          fields.forEach(field => {
            field.visible = false;
          });
        },
        show: () => {
          fields.forEach(field => {
            field.visible = true;
          });
        },
        setEnum: (options: any) => {
          fields.forEach(field => {
            field.props = Object.assign(field.props, {options});
          });
        },
        setFieldProps: (props) => {
          fields.forEach(field => {
            field.props = Object.assign(field.props, props);
          });
        },
        onFieldChange: (callback) => {
          fields.forEach(field => {
            field.onChange = callback;
          });
        },
        subscribe: (event: string, callback) => {
          fields.forEach(field => {
            if (event === 'fieldChange') {
              field.onChange = callback;
            }
          });
        }
      } as EffectsHandlers;
    };
    context.getValue = () => {
      return this.value;
    };
    return context;
  }

  public created() {
    this.context = this.createContext();
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

  public render() {
    let content: any = [
      this.$slots.header,
      <InternalForm
          title={this.title}
          value={this.value}
          slots={this.$slots}
          scopedSlots={this.$scopedSlots}
          definition={this.definition}>
      </InternalForm>
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
    const classes = className('schema-form', {
      'schema-form-sticky': this.sticky
    });
    return <div class={classes}>
      {content}
      {footer}
    </div>;
  }

  public renderButtons() {
    const {props} = this.store;
    const {actions} = this;
    if (props && this.store.mode === 'edit') {
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
                buttons.push(this.createButton(action.text, action.action,
                    action.props, null));
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

  public async onOk() {
    if (hasListener(this, 'ok')) {
      const valid = await this.validate();
      const errors = valid.filter((it: any) => it && it !== true).flat();
      if (errors.length) {
        console.warn('有错误', errors);
        if (this.platform === 'desktop') {
          if ((this as any).$message) {
            (this as any).$message.error(errors[0].message);
          }
        } else {
          (this as any).$toast.fail(errors[0].message);
        }
      } else {
        this.$emit('ok', this.value);
      }
    }
  }

  public validate(): Promise<object[]> | [] {
    const fields = Object.keys(this.store.fields).map(key => this.store.fields[key]);
    if (fields.length) {
      return Promise.all(fields.map(it => (it as any).validate()));
    }
    return [];
  }

  private createSubmitButton(text: string = null, btnProps: object = null, action: () => any = null) {
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
    return this.createButton(
        text || props && props.okText || '提交',
        action || this.onOk, buttonProps, 'confirm-btn'
    );
  }

  private createButton(text, action, attrs, classes) {
    const {platform} = this;
    const ButtonComponent = platform === 'mobile' ? 'm-button' : LibComponents.button;
    const Button = <ButtonComponent class={classes}
                                    attrs={attrs}
                                    onClick={() => {
                                      action(this.context);
                                    }}>
      {text}
    </ButtonComponent>;
    if (platform === 'mobile') {
      return [<m-white-space/>, Button];
    }
    return Button;
  }

  private createCancelButton(text: string = null, btnProps: object = null, action: () => any = null) {
    const hasCancelHandler = hasListener(this, 'cancel');
    if (!hasCancelHandler) {
      return null;
    }
    const {props} = this;
    const buttonProps = btnProps || (props && props.cancelProps) || {};
    buttonProps.disabled = this.disabled || this.loading;
    return this.createButton(
        text || props && props.cancelText || '取消',
        action || this.onCancel, buttonProps,
        'cancel-btn'
    );
  }

  private createResetButton(text: string = null, btnProps: object = null, action: () => any = null) {
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
}
