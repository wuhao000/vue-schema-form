import _initializerDefineProperty from "@babel/runtime/helpers/esm/initializerDefineProperty";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/esm/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/esm/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _class3, _temp2;

import { isNotNull } from '../utils/utils';
import locale from 'ant-design-vue/lib/date-picker/locale/zh_CN';
import moment from 'moment';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import BaseFormComponent from '../mixins/base-input-component';
import RangePicker from './range-picker';
var DDatePicker = (_dec = Component({
  name: 'DDatePicker'
}), _dec2 = Prop({
  type: Object,
  default: function _default() {
    return locale;
  }
}), _dec3 = Prop({
  type: String,
  default: 'zh'
}), _dec4 = Prop({
  type: Boolean,
  default: false
}), _dec5 = Prop({
  type: String,
  default: 'date'
}), _dec6 = Watch('value'), _dec(_class = (_class2 = (_temp2 = _class3 =
/*#__PURE__*/
function (_BaseFormComponent) {
  _inherits(DDatePicker, _BaseFormComponent);

  function DDatePicker() {
    var _getPrototypeOf2;

    var _temp, _this;

    _classCallCheck(this, DDatePicker);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DDatePicker)).call.apply(_getPrototypeOf2, [this].concat(args))), _initializerDefineProperty(_this, "locale", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "localeCode", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "clearable", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "mode", _descriptor4, _assertThisInitialized(_this)), _temp));
  }

  _createClass(DDatePicker, [{
    key: "convertValue",
    value: function convertValue(value) {
      if (!value) {
        return undefined;
      }

      if (typeof value === 'string') {
        return moment(value, this.format);
      } else if (typeof value === 'number') {
        return moment(value);
      } else {
        return moment(value);
      }
    }
  }, {
    key: "convertValueBack",
    value: function convertValueBack(value) {
      if (value) {
        return value.toDate();
      } else {
        return value;
      }
    }
  }, {
    key: "getInputComponent",
    value: function getInputComponent() {
      if (this.mode === 'date' || this.mode === 'datetime') {
        return 'a-date-picker';
      } else if (this.mode === 'month') {
        return 'a-month-picker';
      } else if (this.mode === 'week') {
        return 'a-week-picker';
      }
    }
  }, {
    key: "getProps",
    value: function getProps() {
      return {
        mode: this.mode === 'datetime' ? 'date' : this.mode,
        showTime: this.shouldShowTime,
        allowClear: this.$attrs.allowClear !== undefined ? this.$attrs.allowClear : this.clearable,
        format: this.format
      };
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
    key: "valueChanged",
    value: function valueChanged(value) {
      var convertValue = this.convertValue(value);

      if (this['stateValue'] === null || this['stateValue'] === undefined) {
        this['stateValue'] = convertValue;
      } else if (!convertValue) {
        this['stateValue'] = undefined;
      } else {
        if (this['stateValue'].toString() !== convertValue.toString()) {
          this['stateValue'] = convertValue;
        }
      }
    }
  }, {
    key: "shouldShowTime",
    get: function get() {
      return this.mode === 'datetime';
    }
  }, {
    key: "format",
    get: function get() {
      switch (this.mode) {
        case 'date':
          return 'YYYY-MM-DD';

        case 'datetime':
          return 'YYYY-MM-DD HH:mm:ss';
      }
    }
  }]);

  return DDatePicker;
}(BaseFormComponent), _class3.RangePicker = RangePicker, _temp2), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "locale", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "localeCode", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "clearable", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "mode", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "valueChanged", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "valueChanged"), _class2.prototype)), _class2)) || _class);
export { DDatePicker as default };