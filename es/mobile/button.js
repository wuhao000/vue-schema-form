import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";

var _dec, _class;

import { resolveComponent, createVNode } from "vue";
import Component, { mixins } from 'vue-class-component';
import BaseButton from '../common/base-button';
var MobileButton = (_dec = Component({
  name: 'MobileButton'
}), _dec(_class =
/*#__PURE__*/
function (_mixins) {
  _inherits(MobileButton, _mixins);

  function MobileButton() {
    _classCallCheck(this, MobileButton);

    return _possibleConstructorReturn(this, _getPrototypeOf(MobileButton).apply(this, arguments));
  }

  _createClass(MobileButton, [{
    key: "render",
    value: function render() {
      var _this = this;

      var h = arguments[0];
      return createVNode(resolveComponent("m-button"), {
        "props": this.$attrs,
        "onClick": this.onClick
      }, {
        default: function _default() {
          return [_this.title];
        }
      });
    }
  }]);

  return MobileButton;
}(mixins(BaseButton))) || _class);
export { MobileButton as default };