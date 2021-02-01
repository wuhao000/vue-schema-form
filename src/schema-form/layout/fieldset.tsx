import {LibComponents} from '@/schema-form/utils/utils';
import Component, {mixins} from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import BaseLayout from './base-layout';
import './fieldset.less';

@Component({
  name: 'FieldsetLayout'
})
export default class LayoutCard extends mixins(BaseLayout) {

  @Prop({type: [String, Object]})
  public title: string | object;
  public expand = false;

  public render() {
    return <fieldset class="layout-fieldset">
      <legend onClick={() => {
        this.expand = !this.expand;
      }}>
        {this.title}<LibComponents.icon type={this.expand ? 'caret-down' : 'caret-up'}/>
      </legend>
      <div style={{
        display: this.expand ? 'block' : 'none'
      }}>
        {this.fields}
        {this.$slots.default}
      </div>
    </fieldset>;
  }
}
