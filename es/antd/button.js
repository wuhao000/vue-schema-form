import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";

var _dec, _class;

import { resolveComponent, createVNode } from "vue";
import Component from 'vue-class-component';
import BaseButton from '../common/base-button';
var AntdButton = (_dec = Component({
  name: 'AntdButton'
}), _dec(_class =
/*#__PURE__*/
function (_BaseButton) {
  _inherits(AntdButton, _BaseButton);

  function AntdButton() {
    _classCallCheck(this, AntdButton);

    return _possibleConstructorReturn(this, _getPrototypeOf(AntdButton).apply(this, arguments));
  }

  _createClass(AntdButton, [{
    key: "render",
    value: function render() {
      var _this = this;

      var h = arguments[0];
      return createVNode(resolveComponent("a-button"), {
        "attrs": this.$attrs,
        "html-type": "button",
        "onClick": this.onClick
      }, {
        default: function _default() {
          return [_this.title];
        }
      });
    }
  }]);

  return AntdButton;
}(BaseButton)) || _class);
export { AntdButton as default };