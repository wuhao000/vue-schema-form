import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";

var _dec, _class;

import { resolveComponent, createVNode } from "vue";
import Component, { mixins } from 'vue-class-component';
import BaseUrl from '../common/url';
var DUrlInput = (_dec = Component({
  name: 'DUrlInput'
}), _dec(_class =
/*#__PURE__*/
function (_mixins) {
  _inherits(DUrlInput, _mixins);

  function DUrlInput() {
    _classCallCheck(this, DUrlInput);

    return _possibleConstructorReturn(this, _getPrototypeOf(DUrlInput).apply(this, arguments));
  }

  _createClass(DUrlInput, [{
    key: "render",
    value: function render() {
      var _this = this;

      var h = arguments[0];
      return createVNode("div", {
        "class": "ant-url-input"
      }, [createVNode(resolveComponent("a-input-group"), {
        "compact": true
      }, {
        default: function _default() {
          return [createVNode(resolveComponent("a-select"), {
            "placeholder": "请选择",
            "disabled": _this.disabled,
            "options": _this.options,
            "model": {
              value: _this.protocol,
              callback: function callback($$v) {
                _this.protocol = $$v;
              }
            }
          }, null), createVNode(resolveComponent("a-input"), {
            "class": "input-with-select",
            "placeholder": "请输入内容",
            "style": "display:inline-block;width: 50%",
            "disabled": _this.disabled,
            "model": {
              value: _this.domain,
              callback: function callback($$v) {
                _this.domain = $$v;
              }
            }
          }, null)];
        }
      })]);
    }
  }]);

  return DUrlInput;
}(mixins(BaseUrl))) || _class);
export { DUrlInput as default };