import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';

@Component({
  name: 'DisplayField'
})
class PlainDisplayField extends Vue {

  @Prop()
  public value: any;
  @Prop()
  public title: string | any;

  public render() {
    const {value} = this;
    return <m-list-item title={this.title}
                        text={true}
                        extra={value}/>;
  }

}

export default PlainDisplayField as any;
