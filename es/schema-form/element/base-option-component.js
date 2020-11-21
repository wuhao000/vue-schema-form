import _mergeJSXProps2 from "@vue/babel-helper-vue-jsx-merge-props";
import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import { getOptionProperty } from "../utils/utils";
export default {
  name: 'BaseOptionComponent',
  props: {
    options: Array,
    labelProperty: {
      type: String,
      default: 'label'
    },
    valueProperty: {
      type: String,
      default: 'value'
    },
    value: {}
  },
  render: function render() {
    var _this = this;

    var h = arguments[0];
    var InputComponent = this.component;
    var OptionComponent = this.optionComponent;
    var props = Object.assign({
      value: this.value
    }, this.$attrs);

    if (props.value === undefined) {
      if (props.multiple) {
        props.value = [];
      } else {
        props.value = null;
      }
    }

    return h(InputComponent, _mergeJSXProps2([{}, {
      "props": props
    }, {}, {
      "on": this.$listeners
    }]), [this.options.map(function (option) {
      var props = {};
      props[_this.labelProp] = getOptionProperty(option, _this.labelProperty);
      props[_this.valueProp] = getOptionProperty(option, _this.valueProperty);
      return h(OptionComponent, _mergeJSXProps([{}, {
        "props": props
      }]), [_this.labelProp === 'text' ? props[_this.labelProp] : null]);
    })]);
  },
  computed: {
    labelProp: function labelProp() {
      return 'label';
    },
    valueProp: function valueProp() {
      return 'value';
    },
    component: function component() {
      return '';
    },
    optionComponent: function optionComponent() {
      return '';
    }
  }
};