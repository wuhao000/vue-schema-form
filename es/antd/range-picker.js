import _initializerDefineProperty from "@babel/runtime/helpers/esm/initializerDefineProperty";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/esm/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/esm/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;

import { isNotNull } from '../utils/utils';
import locale from 'ant-design-vue/lib/date-picker/locale/zh_CN';
import moment from 'moment';
import Component from 'vue-class-component';
import { Model, Prop, Watch } from 'vue-property-decorator';
import BaseFormComponent from '../mixins/base-input-component';
var DDateRangePicker = (_dec = Model('change'), _dec2 = Prop({
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
  type: Boolean,
  default: undefined
}), _dec6 = Watch('value'), Component(_class = (_class2 =
/*#__PURE__*/
function (_BaseFormComponent) {
  _inherits(DDateRangePicker, _BaseFormComponent);

  function DDateRangePicker() {
    var _getPrototypeOf2;

    var _temp, _this;

    _classCallCheck(this, DDateRangePicker);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DDateRangePicker)).call.apply(_getPrototypeOf2, [this].concat(args))), _initializerDefineProperty(_this, "value", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "locale", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "localeCode", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "clearable", _descriptor4, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "showTime", _descriptor5, _assertThisInitialized(_this)), _temp));
  }

  _createClass(DDateRangePicker, [{
    key: "convertValue",
    value: function convertValue(value) {
      if (!value) {
        return [null, null];
      }

      return value.map(function (it) {
        return isNotNull(it) ? moment(it) : null;
      });
    }
  }, {
    key: "convertValueBack",
    value: function convertValueBack(value) {
      if (value) {
        return value.map(function (it) {
          return it.toDate();
        });
      } else {
        return value;
      }
    }
  }, {
    key: "getInputComponent",
    value: function getInputComponent() {
      return 'a-range-picker';
    }
  }, {
    key: "getProps",
    value: function getProps() {
      return {
        allowClear: this.$attrs.allowClear !== undefined ? this.$attrs.allowClear : this.clearable
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

      if (this.stateValue === null || this['stateValue'] === undefined) {
        this.stateValue = convertValue;
      } else if (!convertValue) {
        this.stateValue = [];
      } else {
        if (this.stateValue.toString() !== convertValue.toString()) {
          this.stateValue = convertValue;
        }
      }
    }
  }]);

  return DDateRangePicker;
}(BaseFormComponent), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "value", [_dec], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "locale", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "localeCode", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "clearable", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "showTime", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "valueChanged", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "valueChanged"), _class2.prototype)), _class2)) || _class);
export { DDateRangePicker as default };