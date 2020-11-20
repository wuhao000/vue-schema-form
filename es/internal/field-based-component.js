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
import { renderField as _renderField } from './utils';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Inject, Prop } from 'vue-property-decorator';
var FieldBasedComponent = (_dec = Component({
  name: 'FieldBasedComponent'
}), _dec2 = Prop([Array, Object]), _dec3 = Prop(Array), _dec4 = Inject(SCHEMA_FORM_STORE_INJECT_KEY), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inherits(FieldBasedComponent, _Vue);

  function FieldBasedComponent() {
    var _getPrototypeOf2;

    var _temp, _this;

    _classCallCheck(this, FieldBasedComponent);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(FieldBasedComponent)).call.apply(_getPrototypeOf2, [this].concat(args))), _initializerDefineProperty(_this, "value", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "pathPrefix", _descriptor2, _assertThisInitialized(_this)), _this.currentValue = null, _initializerDefineProperty(_this, "store", _descriptor3, _assertThisInitialized(_this)), _temp));
  }

  _createClass(FieldBasedComponent, [{
    key: "renderField",
    value: function renderField(field, currentValue, index, wrap) {
      return _renderField(this.pathPrefix, this.store, field, currentValue, index, wrap, this.$createElement, this);
    }
  }]);

  return FieldBasedComponent;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "value", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "pathPrefix", [_dec3], {
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
export { FieldBasedComponent as default };