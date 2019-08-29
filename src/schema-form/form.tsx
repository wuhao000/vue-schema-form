import BaseForm from '@/schema-form/internal/base-form';
import {
  ASchemaForm,
  register,
  registerAntd,
  registerAntdMobile,
  registerDisplay,
  registerElement
} from '@/schema-form/utils';
import Component, {mixins} from 'vue-class-component';
import {Prop, Provide, Watch} from 'vue-property-decorator';


@Component({
  name: ASchemaForm
})
export default class SchemaForm extends mixins(BaseForm) {

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

  @Provide()
  public store = {
    fields: {},
    disabled: false,
    loading: false,
    readonly: false
  };

  @Watch('readonly', {immediate: true})
  public readonlyChanged(readonly: boolean) {
    this.store.readonly = readonly;
  }

  @Watch('disabled', {immediate: true})
  public disabledChanged(disabled: boolean) {
    this.store.disabled = disabled;
  }

  @Watch('loading', {immediate: true})
  public loadingChanged(loading: boolean) {
    this.store.loading = loading;
  }

  public created() {
    this.$on('SchemaForm.addField', (field) => {
      if (field) {
        this.fields.push(field);
      }
    });
    /* istanbul ignore next */
    this.$on('SchemaForm.removeField', (field) => {
      if (field.prop) {
        this.fields.splice(this.fields.indexOf(field), 1);
      }
    });
  }

}
