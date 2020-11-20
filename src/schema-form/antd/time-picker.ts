import locale from 'ant-design-vue/lib/time-picker/locale/zh_CN';
import moment, {Moment} from 'moment';
import Component from 'vue-class-component';
import {Prop, Watch} from 'vue-property-decorator';
import BaseFormComponent from '../mixins/base-input-component';
import {isNotNull, isNull} from '../utils/utils';

@Component
export default class DTimePicker extends BaseFormComponent {
  public static install: (Vue) => void;
  @Prop({type: Object, default: () => locale})
  public locale: object;
  @Prop({type: String, default: 'zh'})
  public localeCode: string;
  @Prop({type: Boolean, default: false})
  public clearable: boolean;
  @Prop({type: String, default: 'HH:mm:ss'})
  public format: string;

  public convertValue(value: any): any {
    if (!value) {
      return undefined;
    }
    if (typeof value === 'string') {
      return moment(value, this.format);
    } else {
      return moment(value);
    }
  }

  public convertValueBack(value: Moment): any {
    if (isNotNull(value)) {
      return value.format(this.format);
    }
    return value;
  }

  public handleChange(value) {
    if (isNotNull(value) && value.toString() === '[object InputEvent]') {
      return;
    }
    this.$emit('change', value);
    this.stateValue = value;
  }

  public getInputComponent(): {} {
    return 'a-time-picker';
  }

  public getProps() {
    return {
      allowClear: this.$attrs.allowClear !== undefined ? this.$attrs.allowClear : this.clearable,
      format: this.format
    };
  }

  @Watch('value')
  public valueChanged(value: any) {
    const convertValue = this.convertValue(value);
    if (isNull(this.stateValue)) {
      this.stateValue = convertValue;
    } else if (!convertValue) {
      this.stateValue = undefined;
    } else {
      if (this.stateValue.toString() !== convertValue.toString()) {
        this.stateValue = convertValue;
      }
    }
  }

}
