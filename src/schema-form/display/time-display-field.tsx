import {SchemaFormField} from '@/types/bean';
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
    if (this.definition.type === 'time') {
      return <span>{this.value}</span>;
    }
    let format = 'YYYY-MM-DD HH:mm:ss';
    if (this.definition.type === 'date') {
      format = 'YYYY-MM-DD';
    }
    return <span vTime={value} format={format}/>;
  }

}

export default DisplayField as any;
