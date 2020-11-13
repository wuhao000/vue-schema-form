import Vue from 'vue';
import Component from 'vue-class-component';
import {Inject, Prop} from 'vue-property-decorator';

@Component({
  name: 'FormComponent'
})
export class FormComponent extends Vue {

  @Prop({type: String})
  public size: 'small' | 'large' | 'default';
  @Prop({type: Boolean})
  public disabled: boolean;
  @Prop({type: Boolean})
  public readOnly: boolean;
  @Inject({from: 'form', default: undefined})
  public form: any;

  get isDisabled() {
    let disabled = this.disabled;
    if (this.form) {
      if (!disabled) {
        disabled = this.form.disabled;
      }
    }
    return disabled;
  }

  get componentSize() {
    let size = this.size;
    if (this.form) {
      if (size === undefined || size === null) {
        size = this.form.size;
      }
    }
    return size;
  }

  get isReadonly() {
    let isReadonly = this.readOnly;
    if (this.form) {
      if (!isReadonly) {
        isReadonly = this.form.readOnly;
      }
    }
    return isReadonly;
  }
}
