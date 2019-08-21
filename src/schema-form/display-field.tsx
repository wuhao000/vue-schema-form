import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';

@Component({
  name: 'DisplayField'
})
class DisplayField extends Vue {

  @Prop()
  public value: any;

  public render() {
    const {value} = this;
    return <span>{value}</span>;
  }

}

export default DisplayField as any;
