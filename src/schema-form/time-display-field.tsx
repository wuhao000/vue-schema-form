import {SchemaFormField} from '@/types/bean';
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';

@Component({
  name: 'DisplayField'
})
class DisplayField extends Vue {

  @Prop()
  public value: any;
  @Prop(Object)
  public definition: SchemaFormField;

  public render() {
    const {value} = this;
    let format = 'YYYY-MM-DD HH:mm:ss';
    if (this.definition.type === 'Date') {
      format = 'YYYY-MM-DD';
    }
    return <span vTime={value} format={format}/>;
  }

}

export default DisplayField as any;
