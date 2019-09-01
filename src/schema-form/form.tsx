import InternalForm from '@/schema-form/internal/form';
import {hasListener, SchemaFormStore} from '@/schema-form/internal/utils';
import {ASchemaForm, getButtonComponent, register, registerAntd, registerAntdMobile, registerDisplay, registerElement} from '@/schema-form/utils';
import {FormDescriptor, FormProps, Platform} from '@/types/bean';
import {Effects, EffectsContext, EffectsHandlers} from '@/types/form';
import {IField} from '@/uform/types';
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
  @Prop(Object)
  public value: object;
  @Prop([String, Object])
  public title: VNode | string;
  @Prop({type: Boolean, default: false})
  public inline: boolean;

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
    return (paths: string | string[]) => {
      let fields: IField[] = [];
      if (typeof paths === 'string') {
        fields.push(this['store'].fields[paths]);
      } else if (Array.isArray(paths)) {
        fields = paths.map(path => this['store'].fields[path]);
      }
      fields = fields.filter(it => !!it);
      return {
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
    return <InternalForm
        title={this.title}
        value={this.value}
        slots={this.$slots}
        scopedSlots={this.$scopedSlots}
        definition={this.definition}>
      {this.renderButtons()}
    </InternalForm>;
  }

  public renderButtons() {
    const {props} = this.store;
    const ButtonComponent = getButtonComponent();
    if (props && this.store.mode === 'edit') {
      if (this.$slots.btns) {
        return this.$slots.btns;
      }
      const hasOkHandler = hasListener(this, 'ok');
      const hasCancelHandler = hasListener(this, 'cancel');
      const hasResetHandler = hasListener(this, 'reset');
      if (this.store.platform === 'mobile') {
        return <div class="action-btns">
          {hasOkHandler ? <m-white-space/> : null}
          {hasOkHandler ? <m-button type="primary"
                                    disabled={this.disabled}
                                    loading={this.loading}
                                    attrs={props && props.okProps}
                                    onClick={() => {
                                      this.onOk();
                                    }}>
            {props && props.okText || '提交'}
          </m-button> : null}
          {hasCancelHandler ? <m-white-space/> : null}
          {hasCancelHandler ? <m-button
              disabled={this.disabled || this.loading}
              onClick={() => {
                this.$emit('cancel');
              }}
              attrs={props && props.cancelProps}>
            {props && props.cancelText || '取消'}
          </m-button> : null}
          {hasResetHandler ? <m-white-space/> : null}
          {hasResetHandler ? <m-button
              disabled={this.disabled || this.loading}
              type="error"
              onClick={() => {
                this.$emit('reset');
              }}
              attrs={props && props.resetProps}>
            {props && props.resetText || '重置'}
          </m-button> : null}
        </div>;
      } else {
        return <div class="action-btns">
          {hasCancelHandler ? <ButtonComponent disabled={this.disabled || this.loading}
                                               onClick={() => {
                                                 this.$emit('cancel');
                                               }}
                                               class="cancel-btn"
                                               attrs={props && props.cancelProps}>
            {props && props.cancelText || '取消'}
          </ButtonComponent> : null}
          {hasOkHandler ? <ButtonComponent type="primary"
                                           disabled={this.disabled}
                                           loading={this.loading}
                                           class="confirm-btn"
                                           attrs={props && props.okProps}
                                           onClick={() => {
                                             this.onOk();
                                           }}>
            {props && props.okText || '提交'}
          </ButtonComponent> : null}
          {hasResetHandler ? <ButtonComponent type="danger"
                                              class="reset-btn"
                                              disabled={this.disabled || this.loading}
                                              attrs={props && props.resetProps}
                                              onClick={() => {
                                                this.$emit('reset');
                                              }}>
            {props && props.resetText || '重置'}
          </ButtonComponent> : null}
        </div>;
      }
    }
  }

  public async onOk() {
    if (hasListener(this, 'ok')) {
      const valid = await this.validate();
      const errors = valid.filter((it: any) => it && it !== true).flat();
      if (errors.length) {
        console.warn('有错误', errors);
        (this as any).$message.error(errors[0].message);
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
}
