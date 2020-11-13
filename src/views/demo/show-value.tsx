import {Component, ref} from 'vue';
import beautify from 'js-beautify';

export default {
  name: 'ShowValue',
  props: {
    value: {}
  },
  setup() {
    const valueModalVisible = ref(false);
    const showData = () => {
      valueModalVisible.value = true;
    };
    const getContent = () => {
      return beautify(JSON.stringify(this.value));
    };
    return {valueModalVisible, getContent, showData}
  },
  render() {
    return <div>
      <d-button onClick={this.showData}>查看数据</d-button>
      <ae-modal hideCancel
                onOk={() => {
                  this.valueModalVisible = false;
                }}
                vModel={this.valueModalVisible}>
        {this.valueModalVisible ? <pre>
          {this.getContent()}
        </pre> : null}
      </ae-modal>
    </div>;
  }
} as Component;
