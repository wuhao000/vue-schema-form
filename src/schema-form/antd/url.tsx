import Component, {mixins} from 'vue-class-component';
import BaseUrl from '../common/url';

@Component({
  name: 'DUrlInput'
})
export default class DUrlInput extends mixins(BaseUrl) {
  public render() {
    return <div class="ant-url-input">
      <a-input-group compact={true}>
        <a-select vModel={this.protocol}
                  placeholder="请选择"
                  disabled={this.disabled}
                  options={this.options}>
        </a-select>
        <a-input vModel={this.domain}
                 class="input-with-select"
                 placeholder="请输入内容"
                 style="display:inline-block;width: 50%"
                 disabled={this.disabled}>
        </a-input>
      </a-input-group>
    </div>;
  }
}
