import BaseOptionComponent from './base-option-component';

export default {
  mixins: [BaseOptionComponent],
  computed: {
    component() {
      return 'el-select';
    },
    optionComponent(this: any) {
      return 'el-option';
    }
  }
};
