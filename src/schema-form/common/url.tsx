import {defineComponent} from 'vue';
import {getInputComponent, getSelectComponent} from '../internal/utils';
import {baseUrlProps, useBaseUrl} from './base-url';
import './url.less';

export default defineComponent({
  name: 'DUrl',
  props: {
    ...baseUrlProps
  },
  setup(props, ctx) {
    return {
      ...useBaseUrl(props, ctx)
    };
  },
  render() {
    const Select = getSelectComponent(this.platform);
    const Input = getInputComponent(this.platform);
    const inputProps = {
      [this.valueProp]: this.domain,
      ['onUpdate:' + this.valueProp]: value => {
        this.domain = value;
      }
    };
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
            <Input {...inputProps}
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
