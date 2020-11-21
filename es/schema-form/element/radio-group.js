import BaseOptionComponent from "./base-option-component";
export default {
  mixins: [BaseOptionComponent],
  props: {
    button: Boolean
  },
  computed: {
    labelProp: function labelProp() {
      return 'text';
    },
    valueProp: function valueProp() {
      return 'label';
    },
    component: function component() {
      return 'el-radio-group';
    },
    optionComponent: function optionComponent() {
      if (this.button) {
        return 'el-radio-button';
      }

      return 'el-radio';
    }
  }
};