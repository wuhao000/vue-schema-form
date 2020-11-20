import _extends from "@babel/runtime/helpers/esm/extends";
import { createVNode } from "vue";
import { getOptionProperty } from '../utils/utils';
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

    var props = _extends({
      value: this.value
    }, this.$attrs);

    if (props.value === undefined) {
      if (props.multiple) {
        props.value = [];
      } else {
        props.value = null;
      }
    }

    return createVNode(InputComponent, {
      "props": props,
      "on": this.$listeners
    }, {
      default: function _default() {
        return [_this.options.map(function (option) {
          var props = {};
          props[_this.labelProp] = getOptionProperty(option, _this.labelProperty);
          props[_this.valueProp] = getOptionProperty(option, _this.valueProperty);
          return createVNode(OptionComponent, {
            "props": props
          }, {
            default: function _default() {
              return [_this.labelProp === 'text' ? props[_this.labelProp] : null];
            }
          });
        })];
      }
    });
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