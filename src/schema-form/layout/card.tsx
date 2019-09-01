import BaseLayout from '@/schema-form/layout/base-layout';
import Component, {mixins} from 'vue-class-component';
import {Prop} from 'vue-property-decorator';

@Component({
  name: 'Card'
})
export default class Card extends mixins(BaseLayout) {

  @Prop()
  public title: any;

  public render() {
    return <a-card title={this.title}>
      {this.fields}
    </a-card>;
  }
}
