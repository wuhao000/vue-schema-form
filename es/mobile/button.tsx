import Component, {mixins} from 'vue-class-component';
import BaseButton from '../common/base-button';

@Component({
  name: 'MobileButton'
})
export default class MobileButton extends mixins(BaseButton) {

  public render() {
    return <m-button props={this.$attrs}
                     onClick={this.onClick}>{this.title}</m-button>;
  }
}
