import BaseOptionComponent from './base-option-component';
export default {
  mixins: [BaseOptionComponent],
  computed: {
    component: function component() {
      return 'el-select';
    },
    optionComponent: function optionComponent() {
      return 'el-option';
    }
  }
};