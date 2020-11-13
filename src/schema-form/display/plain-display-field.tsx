import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
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
