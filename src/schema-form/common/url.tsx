import {defineComponent} from 'vue';
import {LibComponents} from '../utils/utils';
import {baseUrlProps, useBaseUrl} from './base-url';
import './url.less';
import {getInputComponent, getSelectComponent} from '../internal/utils';

export default defineComponent({
  name: 'DUrl',
  props: {
    ...baseUrlProps
  },
  setup(props, ctx) {
    return {...useBaseUrl(props, ctx)};
  },
  render() {
    const Select  = getSelectComponent(this.platform)
    const Input  = getInputComponent(this.platform)
    return (
        <div class="d-url-input">
          <div>
            <Select v-model={[this.protocol, this.valueProp]}
                      disabled={this.disabled}
                      options={this.options}
                      size={this.size}
                      class="protocol-select"
                      placeholder="请选择">
            </Select>
            <Input v-model={[this.domain, this.valueProp]}
                     disabled={this.disabled}
                     class="input-with-select"
                     size={this.size}
                     placeholder="请输入内容"
                     style="display:block">
            </Input>
          </div>
        </div>
    );
  }
});
