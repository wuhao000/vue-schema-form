import {Options, Vue} from 'vue-class-component';
import BaseButton from '../common/base-button';

@Options({
  name: 'AntdButton'
})
export default class AntdButton extends BaseButton {
  public render() {
    return <d-button attrs={this.$attrs}
                     html-type="button"
                     onClick={this.onClick}>{this.title}</d-button>;
  }
}
