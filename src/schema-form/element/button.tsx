import Component from 'vue-class-component';
import BaseButton from '../common/base-button';

@Component({
  name: 'ElementButton'
})
export default class ElementButton extends BaseButton {
  public render() {
    return <el-button props={this.$attrs}
                      onClick={this.onClick}>{this.title}</el-button>;
  }
}
