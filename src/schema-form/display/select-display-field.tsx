import {getOptions} from '@/schema-form/utils';
import {SchemaFormField} from '@/types/bean';
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';

@Component({
  name: 'SelectDisplayField'
})
class DisplayField extends Vue {

  @Prop()
  public value: any;
  @Prop(Object)
  public definition: SchemaFormField;

  public render() {
    const {definition, value} = this;
    const options = getOptions(definition);
    if (value) {
      let selected = [];
      if (this.definition.array) {
        selected = options.filter(it => value.includes(it[this.valueProperty]));
      } else {
        selected = options.filter(it => value === it[this.valueProperty]);
      }
      return <span>{selected.map(it => it[this.LabelProperty]).join('、')}</span>;
    } else {
      return <span/>;
    }
  }

  get valueProperty() {
    return this.definition.props.valueProperty || 'value';
  }

  get LabelProperty() {
    return this.definition.props.labelProperty || 'label';
  }
}

export default DisplayField as any;
