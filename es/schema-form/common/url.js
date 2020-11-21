var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

var protocols = ['http', 'https'];
import { SCHEMA_FORM_STORE_INJECT_KEY } from "../form";
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
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Vue) {
  _inheritsLoose(UrlInput, _Vue);

  function UrlInput() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Vue.call.apply(_Vue, [this].concat(args)) || this;

    _initializerDefineProperty(_assertThisInitialized(_this), "disabled", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_assertThisInitialized(_this), "protocols", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_assertThisInitialized(_this), "value", _descriptor3, _assertThisInitialized(_this));

    _defineProperty(_assertThisInitialized(_this), "domain", '');

    _defineProperty(_assertThisInitialized(_this), "protocol", 'https');

    _initializerDefineProperty(_assertThisInitialized(_this), "store", _descriptor4, _assertThisInitialized(_this));

    return _this;
  }

  var _proto = UrlInput.prototype;

  _proto.currentChanged = function currentChanged(current) {
    this.$emit('input', current);
    this.$emit('change', current);
  };

  _proto.valueChanged = function valueChanged(v) {
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
  };

  _createClass(UrlInput, [{
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
}(Vue), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "disabled", [_dec2], {
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