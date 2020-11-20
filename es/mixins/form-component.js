import _initializerDefineProperty from "@babel/runtime/helpers/esm/initializerDefineProperty";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/esm/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/esm/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

import Vue from 'vue';
import Component from 'vue-class-component';
import { Inject, Prop } from 'vue-property-decorator';
export var FormComponent = (_dec = Component({
  name: 'FormComponent'
}), _dec2 = Prop({
  type: String
}), _dec3 = Prop({
  type: Boolean
}), _dec4 = Prop({
  type: Boolean
}), _dec5 = Inject({
  from: 'form',
  default: undefined
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inherits(FormComponent, _Vue);

  function FormComponent() {
    var _getPrototypeOf2;

    var _temp, _this;

    _classCallCheck(this, FormComponent);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(FormComponent)).call.apply(_getPrototypeOf2, [this].concat(args))), _initializerDefineProperty(_this, "size", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "disabled", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "readOnly", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "form", _descriptor4, _assertThisInitialized(_this)), _temp));
  }

  _createClass(FormComponent, [{
    key: "isDisabled",
    get: function get() {
      var disabled = this.disabled;

      if (this.form) {
        if (!disabled) {
          disabled = this.form.disabled;
        }
      }

      return disabled;
    }
  }, {
    key: "componentSize",
    get: function get() {
      var size = this.size;

      if (this.form) {
        if (size === undefined || size === null) {
          size = this.form.size;
        }
      }

      return size;
    }
  }, {
    key: "isReadonly",
    get: function get() {
      var isReadonly = this.readOnly;

      if (this.form) {
        if (!isReadonly) {
          isReadonly = this.form.readOnly;
        }
      }

      return isReadonly;
    }
  }]);

  return FormComponent;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "size", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "disabled", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "readOnly", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "form", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);