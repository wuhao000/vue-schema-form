import Component from 'vue-class-component';
import BaseButton from '../common/base-button';

@Component({
  name: 'AntdButton'
})
export default class AntdButton extends BaseButton {
  public render() {
    return <d-button attrs={this.$attrs}
                     html-type="button"
                     onClick={this.onClick}>{this.title}</d-button>;
  }
}
