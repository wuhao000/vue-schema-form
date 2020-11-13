import {getOptions} from '../utils/utils';
import {IField} from 'types';
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';

@Component({
  name: 'SelectDisplayField'
})
class SelectDisplayField extends Vue {

  @Prop()
  public value: any;
  @Prop(Object)
  public field: IField;

  public render() {
    const {field, value} = this;
    const options = getOptions(field);
    if (value) {
      let selected = [];
      if (field.array) {
        selected = options.filter(it => value.includes(it[this.valueProperty]) || value.includes(it));
      } else {
        selected = options.filter(it => value === it[this.valueProperty] || value === it);
      }
      return <span>{selected.map(it => typeof it === 'object' ? it[this.LabelProperty] : it).join('、')}</span>;
    } else {
      return <span/>;
    }
  }

  get valueProperty() {
    return this.field.props.valueProperty || 'value';
  }

  get LabelProperty() {
    return this.field.props.labelProperty || 'label';
  }
}

export default SelectDisplayField as any;
