import BaseOptionComponent from './base-option-component';

export default {
  mixins: [BaseOptionComponent],
  props: {
    button: Boolean
  },
  computed: {
    labelProp() {
      return 'text';
    },
    valueProp() {
      return 'label';
    },
    component() {
      return 'el-checkbox-group';
    },
    optionComponent(this: any) {
      if (this.button) {
        return 'el-checkbox-button';
      }
      return 'el-checkbox';
    }
  }
};
