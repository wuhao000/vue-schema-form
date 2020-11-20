import _initializerDefineProperty from "@babel/runtime/helpers/esm/initializerDefineProperty";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/esm/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/esm/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;

import { SCHEMA_FORM_STORE_INJECT_KEY } from '../form';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Inject, Prop } from 'vue-property-decorator';
var BaseButton = (_dec = Component({
  name: 'BaseButton'
}), _dec2 = Prop(), _dec3 = Prop({
  type: [String, Object]
}), _dec4 = Inject(SCHEMA_FORM_STORE_INJECT_KEY), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inherits(BaseButton, _Vue);

  function BaseButton() {
    var _getPrototypeOf2;

    var _temp, _this;

    _classCallCheck(this, BaseButton);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(BaseButton)).call.apply(_getPrototypeOf2, [this].concat(args))), _initializerDefineProperty(_this, "action", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "title", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "store", _descriptor3, _assertThisInitialized(_this)), _temp));
  }

  _createClass(BaseButton, [{
    key: "onClick",
    value: function onClick(e) {
      if (this.action) {
        this.action(this.store.context, e);
      }
    }
  }]);

  return BaseButton;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "action", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "title", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "store", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { BaseButton as default };