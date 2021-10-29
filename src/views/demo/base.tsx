import {message} from 'ant-design-vue';
import {ref} from 'vue';
import {getFormDefinition, getProps, getValue} from './utils';

export const baseDemoProps = {
  platform: {type: String, default: 'desktop'},
  init: null
};

export const useBaseDemo = ($props) => {
  const props = getProps();
  const value = ref(getValue());
  const options = ref({
    disabled: false,
    loading: false,
    readonly: false,
    displayMode: false,
    sticky: false,
    mobile: false
  });
  if ($props.init) {
    $props.init();
  }
  const optionFormDefinition = {
    props: {
      inline: true
    },
    fields: [{
      title: '禁用', type: 'boolean', property: 'disabled'
    }, {
      title: '加载中', type: 'boolean', property: 'loading'
    }, {
      title: '详情模式', type: 'boolean', property: 'displayMode'
    }, {
      title: '固定模式', type: 'boolean', property: 'sticky'
    }]
  };
  const definition = getFormDefinition();
  return {
    options, props, value, definition, optionFormDefinition,
    onOk: () => {
      message.success('ok clicked');
    },
    onReset: () => {
      message.info('reset clicked');
    },
    onCancel: () => {
      console.log('aaa');
      message.error('cancel clicked');
    }
  };
};
