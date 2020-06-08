import {mixins, Options} from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import BaseLayout from './base-layout';

@Options({
  name: 'Card'
})
export default class Card extends mixins(BaseLayout) {

  @Prop()
  public title: any;

  public render() {
    return <a-card title={this.title}>
      {this.fields}
      {this.$slots.default}
    </a-card>;
  }
}
