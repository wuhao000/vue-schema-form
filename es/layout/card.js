import _initializerDefineProperty from "@babel/runtime/helpers/esm/initializerDefineProperty";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/esm/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/esm/initializerWarningHelper";

var _dec, _dec2, _class, _class2, _descriptor;

import { resolveComponent, createVNode } from "vue";
import BaseLayout from './base-layout';
import Component, { mixins } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
var LayoutCard = (_dec = Component({
  name: 'Card'
}), _dec2 = Prop({
  type: [String, Object]
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_mixins) {
  _inherits(LayoutCard, _mixins);

  function LayoutCard() {
    var _getPrototypeOf2;

    var _temp, _this;

    _classCallCheck(this, LayoutCard);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(LayoutCard)).call.apply(_getPrototypeOf2, [this].concat(args))), _initializerDefineProperty(_this, "title", _descriptor, _assertThisInitialized(_this)), _temp));
  }

  _createClass(LayoutCard, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var h = arguments[0];
      return createVNode(resolveComponent("a-card"), {
        "title": this.title
      }, {
        default: function _default() {
          return [_this2.fields, _this2.$slots.default];
        }
      });
    }
  }]);

  return LayoutCard;
}(mixins(BaseLayout)), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "title", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { LayoutCard as default };