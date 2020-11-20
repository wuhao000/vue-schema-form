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

import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import BaseFormComponent from '../mixins/base-input-component';
var DCascader = (_dec = Component({
  name: 'DCascader',
  inheritAttrs: false
}), _dec2 = Prop({
  type: String,
  default: ''
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_BaseFormComponent) {
  _inherits(DCascader, _BaseFormComponent);

  function DCascader() {
    var _getPrototypeOf2;

    var _temp, _this;

    _classCallCheck(this, DCascader);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DCascader)).call.apply(_getPrototypeOf2, [this].concat(args))), _initializerDefineProperty(_this, "placeholder", _descriptor, _assertThisInitialized(_this)), _temp));
  }

  _createClass(DCascader, [{
    key: "getInputComponent",
    value: function getInputComponent() {
      return 'a-cascader';
    }
  }]);

  return DCascader;
}(BaseFormComponent), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "placeholder", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { DCascader as default };