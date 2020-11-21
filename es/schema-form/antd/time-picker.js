var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _class3, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

import locale from 'ant-design-vue/lib/time-picker/locale/zh_CN';
import moment from 'moment';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import BaseFormComponent from "../mixins/base-input-component";
import { isNotNull, isNull } from "../utils/utils";
var DTimePicker = (_dec = Prop({
  type: Object,
  default: function _default() {
    return locale;
  }
}), _dec2 = Prop({
  type: String,
  default: 'zh'
}), _dec3 = Prop({
  type: Boolean,
  default: false
}), _dec4 = Prop({
  type: String,
  default: 'HH:mm:ss'
}), _dec5 = Watch('value'), Component(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_BaseFormComponent) {
  _inheritsLoose(DTimePicker, _BaseFormComponent);

  function DTimePicker() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _BaseFormComponent.call.apply(_BaseFormComponent, [this].concat(args)) || this;

    _initializerDefineProperty(_assertThisInitialized(_this), "locale", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_assertThisInitialized(_this), "localeCode", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_assertThisInitialized(_this), "clearable", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_assertThisInitialized(_this), "format", _descriptor4, _assertThisInitialized(_this));

    return _this;
  }

  var _proto = DTimePicker.prototype;

  _proto.convertValue = function convertValue(value) {
    if (!value) {
      return undefined;
    }

    if (typeof value === 'string') {
      return moment(value, this.format);
    } else {
      return moment(value);
    }
  };

  _proto.convertValueBack = function convertValueBack(value) {
    if (isNotNull(value)) {
      return value.format(this.format);
    }

    return value;
  };

  _proto.handleChange = function handleChange(value) {
    if (isNotNull(value) && value.toString() === '[object InputEvent]') {
      return;
    }

    this.$emit('change', value);
    this.stateValue = value;
  };

  _proto.getInputComponent = function getInputComponent() {
    return 'a-time-picker';
  };

  _proto.getProps = function getProps() {
    return {
      allowClear: this.$attrs.allowClear !== undefined ? this.$attrs.allowClear : this.clearable,
      format: this.format
    };
  };

  _proto.valueChanged = function valueChanged(value) {
    var convertValue = this.convertValue(value);

    if (isNull(this.stateValue)) {
      this.stateValue = convertValue;
    } else if (!convertValue) {
      this.stateValue = undefined;
    } else {
      if (this.stateValue.toString() !== convertValue.toString()) {
        this.stateValue = convertValue;
      }
    }
  };

  return DTimePicker;
}(BaseFormComponent), _defineProperty(_class3, "install", void 0), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "locale", [_dec], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "localeCode", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "clearable", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "format", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "valueChanged", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "valueChanged"), _class2.prototype)), _class2)) || _class);
export { DTimePicker as default };