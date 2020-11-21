import Component from 'vue-class-component';
import BaseButton from '@/schema-form/common/base-button';

@Component({
  name: 'AntdButton'
})
export default class AntdButton extends BaseButton {
  public render() {
    return <a-button attrs={this.$attrs}
                     html-type="button"
                     onClick={this.onClick}>{this.title}</a-button>;
  }
}
