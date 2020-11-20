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

import locale from 'ant-design-vue/lib/time-picker/locale/zh_CN';
import moment from 'moment';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import BaseFormComponent from '../mixins/base-input-component';
import { isNotNull, isNull } from '../utils/utils';
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
}), _dec5 = Watch('value'), Component(_class = (_class2 =
/*#__PURE__*/
function (_BaseFormComponent) {
  _inherits(DTimePicker, _BaseFormComponent);

  function DTimePicker() {
    var _getPrototypeOf2;

    var _temp, _this;

    _classCallCheck(this, DTimePicker);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DTimePicker)).call.apply(_getPrototypeOf2, [this].concat(args))), _initializerDefineProperty(_this, "locale", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "localeCode", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "clearable", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "format", _descriptor4, _assertThisInitialized(_this)), _temp));
  }

  _createClass(DTimePicker, [{
    key: "convertValue",
    value: function convertValue(value) {
      if (!value) {
        return undefined;
      }

      if (typeof value === 'string') {
        return moment(value, this.format);
      } else {
        return moment(value);
      }
    }
  }, {
    key: "convertValueBack",
    value: function convertValueBack(value) {
      if (isNotNull(value)) {
        return value.format(this.format);
      }

      return value;
    }
  }, {
    key: "handleChange",
    value: function handleChange(value) {
      if (isNotNull(value) && value.toString() === '[object InputEvent]') {
        return;
      }

      this.$emit('change', value);
      this.stateValue = value;
    }
  }, {
    key: "getInputComponent",
    value: function getInputComponent() {
      return 'a-time-picker';
    }
  }, {
    key: "getProps",
    value: function getProps() {
      return {
        allowClear: this.$attrs.allowClear !== undefined ? this.$attrs.allowClear : this.clearable,
        format: this.format
      };
    }
  }, {
    key: "valueChanged",
    value: function valueChanged(value) {
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
    }
  }]);

  return DTimePicker;
}(BaseFormComponent), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "locale", [_dec], {
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