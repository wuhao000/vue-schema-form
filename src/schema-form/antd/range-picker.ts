import locale from 'ant-design-vue/lib/date-picker/locale/zh_CN';
import Component from 'vue-class-component';
import {Model, Prop, Watch} from 'vue-property-decorator';
import BaseFormComponent from '../../mixins/base-input-component';
import moment from 'moment';

@Component
export default class DDateRangePicker extends BaseFormComponent {
  @Model('change')
  public value: any;
  @Prop({type: Object, default: () => locale})
  public locale: object;
  @Prop({type: String, default: 'zh'})
  public localeCode: string;
  @Prop({type: Boolean, default: false})
  public clearable: boolean;
  @Prop({type: Boolean, default: undefined})
  public showTime: boolean;
  public static install: (Vue) => void;

  public convertValue(value: Array<Date | number>): any {
    if (!value) {
      return undefined;
    }
    return value.filter(it => it !== null && it !== undefined).map(it => moment(it));
  }

  public convertValueBack(value: any): any {
    if (value) {
      return value.map(it => it.toDate());
    } else {
      return value;
    }
  }

  public getInputComponent(): {} {
    return 'a-range-picker';
  }

  public getProps() {
    return {
      allowClear: this.$attrs.allowClear !== undefined ? this.$attrs.allowClear : this.clearable
    };
  }


  @Watch('value')
  public valueChanged(value: any) {
    const convertValue = this.convertValue(value);
    if (this.stateValue === null || this['stateValue'] === undefined) {
      this.stateValue = convertValue;
    } else if (!convertValue) {
      this.stateValue = [];
    } else {
      if (this.stateValue.toString() !== convertValue.toString()) {
        this.stateValue = convertValue;
      }
    }
  }

}
