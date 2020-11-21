<template >
<div class="d-time-range-picker">
  <time-picker :format="format"
               :allow-clear="clearable || $attrs.allowClear"
               :placeholder="placeholder[0]"
               v-bind="$attrs"
               v-model="stateValue[0]"></time-picker>
  <span class="d-time-range-picker-separator">{{ separator }}</span>
  <time-picker :format="format"
               :allow-clear="clearable || $attrs.allowClear"
               :placeholder="placeholder[1]"
               v-bind="$attrs"
               v-model="stateValue[1]"></time-picker>
</div>
</template>
<script lang="js">
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _class3, _temp;

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

import Component from 'vue-class-component';
import { Model, Prop, Watch } from 'vue-property-decorator';
import BaseFormComponent from "../mixins/base-input-component";
import TimePicker from "./time-picker";
var DTimeRangePicker = (_dec = Component({
  components: {
    TimePicker: TimePicker
  }
}), _dec2 = Prop({
  type: String,
  default: '-'
}), _dec3 = Model('change'), _dec4 = Prop({
  type: Boolean,
  default: false
}), _dec5 = Prop({
  type: Array,
  default: function _default() {
    return ['开始时间', '结束时间'];
  }
}), _dec6 = Prop({
  type: String,
  default: 'HH:mm:ss'
}), _dec7 = Watch('value'), _dec(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_BaseFormComponent) {
  _inherits(DTimeRangePicker, _BaseFormComponent);

  var _super = _createSuper(DTimeRangePicker);

  function DTimeRangePicker() {
    var _this;

    _classCallCheck(this, DTimeRangePicker);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _initializerDefineProperty(_this, "separator", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "value", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "clearable", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "placeholder", _descriptor4, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "format", _descriptor5, _assertThisInitialized(_this));

    return _this;
  }

  _createClass(DTimeRangePicker, [{
    key: "convertValue",
    value: function convertValue(value) {
      if (!value) {
        return [null, null];
      }

      return value;
    }
  }, {
    key: "convertValueBack",
    value: function convertValueBack(value) {
      return value;
    }
  }, {
    key: "getProps",
    value: function getProps() {
      return {
        allowClear: this.$attrs.allowClear !== undefined ? this.$attrs.allowClear : this.clearable
      };
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

  return DTimeRangePicker;
}(BaseFormComponent), _class3.install = void 0, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "separator", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "value", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "clearable", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "placeholder", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "format", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "valueChanged", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "valueChanged"), _class2.prototype)), _class2)) || _class);
export { DTimeRangePicker as default };
</script>
<style >
.d-time-range-picker {
  display: flex;
  align-items: center;
  &-separator {
    padding: 0 10px;
  }
}
</style>