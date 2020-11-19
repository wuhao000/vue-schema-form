import {isNotNull} from '../utils/utils';
import Component from 'vue-class-component';
import {Model} from 'vue-property-decorator';
import BaseFormComponent from '../../mixins/base-input-component';


@Component({
  name: 'DInputNumber',
  inheritAttrs: false
})
export default class DInputNumber extends BaseFormComponent {

  @Model('change')
  public value: any;

  public getInputComponent() {
    return 'a-input-number';
  }

  public handleChange(value) {
    if (isNotNull(value) && value.toString() === '[object InputEvent]') {
      return;
    }
    this.$emit('change', value);
    this.stateValue = value;
  }

}
