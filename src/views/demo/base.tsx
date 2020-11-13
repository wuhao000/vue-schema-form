import {getFormDefinition, getProps, getValue} from '@/views/demo/utils';

import {Component, computed, ref} from 'vue';

export default {
  name: 'Base',
  props: {
    platform: {type: String, default: 'desktop'},
    init: {type: Function}
  },
  setup() {
    const props = getProps();
    const value = ref(getValue());
    const options = {
      disabled: false,
      loading: false,
      readonly: false,
      displayMode: false,
      sticky: false,
      mobile: false
    };

    if (this.init) {
      this.init();
    }
    window.ondevicelight = () => {
      console.log(1);
    };
    window.ondevicemotion = () => {
      console.log(2);
    };
    window.ondeviceorientation = () => {
      console.log(3);
    };
    window.onresize = () => {
      console.log(window.outerHeight + '/' + window.outerWidth);
    };

    const optionFormDefinition = {
      title: '选项',
      props: {
        inline: true,
        title: '选项'
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
    const definition = computed(() => {
      return getFormDefinition();
    });

    const onOk = () => {
      // @ts-ignore
      this.$message.success('ok clicked');
    };

    const onReset = () => {
      // @ts-ignore
      this.$message.error('reset click');
    };

    const onCancel = () => {
      // @ts-ignore
      this.$message.warning('cancel clicked');
    };
    return {onCancel, onOk, onReset, definition}
  }
} as Component;
