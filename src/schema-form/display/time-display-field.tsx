import {SchemaFormField} from '../../../types';
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';

@Component({
  name: 'TimeDisplayField'
})
class DisplayField extends Vue {

  @Prop()
  public value: any;
  @Prop(Object)
  public definition: SchemaFormField;

  public render() {
    const {value} = this;
    let format = 'YYYY-MM-DD HH:mm:ss';
    if (this.definition.type === 'date') {
      format = 'YYYY-MM-DD';
    } else if (this.definition.type === 'month') {
      format = 'YYYY-MM';
    } else if (this.definition.type === 'year') {
      format = 'YYYY';
    } else if (this.definition.type === 'daterange') {
      format = 'YYYY-MM-DD';
    } else if (this.definition.type === 'time') {
      format = 'HH:mm:ss';
    }
    if (this.definition.type === 'daterange' && value) {
      return <span>
        <span vTime={value[0]} format={format}/>
        <span> - </span>
        <span vTime={value[1]} format={format}/>
      </span>;
    }
    return <span vTime={value} format={format}/>;
  }

}

export default DisplayField as any;
