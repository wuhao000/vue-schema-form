import BaseForm from '@/schema-form/internal/base-form';
import {
  ASchemaForm,
  register,
  registerAntd,
  registerAntdMobile,
  registerDisplay,
  registerElement
} from '@/schema-form/utils';
import {EffectsContext, EffectsHandlers} from '@/types/form';
import {IField} from '@/uform/types';
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
  public context: EffectsContext;

  @Provide()
  public store = {
    fields: {},
    disabled: false,
    loading: false,
    readonly: false,
    mode: 'edit'
  };

  @Watch('mode', {immediate: true})
  public modeChanged(mode: string) {
    this.store.mode = mode;
    this.$forceUpdate();
  }

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
    this.$on('SchemaForm.addField', (field) => {
      if (field) {
        this.fields.push(field);
      }
    });
    this.$on('SchemaForm.addSchemaField', (field) => {
      if (field) {
        this.store.fields[field.plainPath] = field;
      }
    });
    this.$on('SchemaForm.removeField', (field) => {
      if (field.prop) {
        this.fields.splice(this.fields.indexOf(field), 1);
      }
    });
    this.$on('SchemaForm.removeSchemaField', (field) => {
      if (field) {
        delete this.store.fields[field.plainPath];
      }
    });
  }

}
