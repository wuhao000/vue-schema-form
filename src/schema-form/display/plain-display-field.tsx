import {Options, Vue} from 'vue-class-component';
import {Prop} from 'vue-property-decorator';

@Options({
  name: 'DisplayField'
})
class PlainDisplayField extends Vue {

  @Prop()
  public value: any;

  public render() {
    const {value} = this;
    return <span>{value}</span>;
  }

}

export default PlainDisplayField as any;
