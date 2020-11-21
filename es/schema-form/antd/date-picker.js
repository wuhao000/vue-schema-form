var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _class3, _temp;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

import { isNotNull } from "../utils/utils";
import locale from 'ant-design-vue/lib/date-picker/locale/zh_CN';
import moment from 'moment';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import BaseFormComponent from "../mixins/base-input-component";
import RangePicker from "./range-picker";
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
}), _dec6 = Watch('value'), _dec(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_BaseFormComponent) {
  _inherits(DDatePicker, _BaseFormComponent);

  var _super = _createSuper(DDatePicker);

  function DDatePicker() {
    var _this;

    _classCallCheck(this, DDatePicker);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _initializerDefineProperty(_this, "locale", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "localeCode", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "clearable", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "mode", _descriptor4, _assertThisInitialized(_this));

    return _this;
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
}(BaseFormComponent), _class3.RangePicker = RangePicker, _class3.install = void 0, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "locale", [_dec2], {
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