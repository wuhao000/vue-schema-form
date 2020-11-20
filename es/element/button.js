import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";

var _dec, _class;

import { resolveComponent, createVNode } from "vue";
import Component from 'vue-class-component';
import BaseButton from '../common/base-button';
var ElementButton = (_dec = Component({
  name: 'ElementButton'
}), _dec(_class =
/*#__PURE__*/
function (_BaseButton) {
  _inherits(ElementButton, _BaseButton);

  function ElementButton() {
    _classCallCheck(this, ElementButton);

    return _possibleConstructorReturn(this, _getPrototypeOf(ElementButton).apply(this, arguments));
  }

  _createClass(ElementButton, [{
    key: "render",
    value: function render() {
      var _this = this;

      var h = arguments[0];
      return createVNode(resolveComponent("el-button"), {
        "props": this.$attrs,
        "onClick": this.onClick
      }, {
        default: function _default() {
          return [_this.title];
        }
      });
    }
  }]);

  return ElementButton;
}(BaseButton)) || _class);
export { ElementButton as default };