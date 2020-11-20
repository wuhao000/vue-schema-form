import _initializerDefineProperty from "@babel/runtime/helpers/esm/initializerDefineProperty";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/esm/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/esm/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

var protocols = ['http', 'https'];
import { SCHEMA_FORM_STORE_INJECT_KEY } from '../form';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Inject, Prop, Watch } from 'vue-property-decorator';
var UrlInput = (_dec = Component({
  name: 'UrlInput'
}), _dec2 = Prop(Boolean), _dec3 = Prop({
  type: Array,
  default: function _default() {
    return protocols;
  }
}), _dec4 = Prop(String), _dec5 = Inject(SCHEMA_FORM_STORE_INJECT_KEY), _dec6 = Watch('current'), _dec7 = Watch('value', {
  immediate: true
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inherits(UrlInput, _Vue);

  function UrlInput() {
    var _getPrototypeOf2;

    var _temp, _this;

    _classCallCheck(this, UrlInput);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(UrlInput)).call.apply(_getPrototypeOf2, [this].concat(args))), _initializerDefineProperty(_this, "disabled", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "protocols", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "value", _descriptor3, _assertThisInitialized(_this)), _this.domain = '', _this.protocol = 'https', _initializerDefineProperty(_this, "store", _descriptor4, _assertThisInitialized(_this)), _temp));
  }

  _createClass(UrlInput, [{
    key: "currentChanged",
    value: function currentChanged(current) {
      this.$emit('input', current);
      this.$emit('change', current);
    }
  }, {
    key: "valueChanged",
    value: function valueChanged(v) {
      if (typeof v === 'string') {
        if (v !== this.current) {
          var protocol = this.protocols.find(function (p) {
            return v.startsWith(p + '://');
          });

          if (protocol) {
            this.protocol = protocol;
          }

          this.domain = v.replace(protocol + '://', '');
        }
      } else {
        this.protocol = null;
        this.domain = null;
      }
    }
  }, {
    key: "current",
    get: function get() {
      return (this.protocol ? this.protocol + '://' : '') + (this.domain ? this.domain : '');
    }
  }, {
    key: "options",
    get: function get() {
      return this.protocols.map(function (p) {
        return {
          value: p,
          label: p + '://'
        };
      });
    }
  }]);

  return UrlInput;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "disabled", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "protocols", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "value", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "store", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "currentChanged", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "currentChanged"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "valueChanged", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "valueChanged"), _class2.prototype)), _class2)) || _class);
export { UrlInput as default };