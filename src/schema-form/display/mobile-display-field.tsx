import {Options, Vue} from 'vue-class-component';
import {Prop} from 'vue-property-decorator';

@Options({
  name: 'DisplayField'
})
class PlainDisplayField extends Vue {

  @Prop()
  public value: any;
  @Prop()
  public title: string | any;

  public render() {
    const {value} = this;
    return <span>{value !== undefined && value !== null ? value.toString() : null}</span>;
  }

}

export default PlainDisplayField as any;
