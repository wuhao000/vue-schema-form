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

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
  _inheritsLoose(DTimeRangePicker, _BaseFormComponent);

  function DTimeRangePicker() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _BaseFormComponent.call.apply(_BaseFormComponent, [this].concat(args)) || this;

    _initializerDefineProperty(_assertThisInitialized(_this), "separator", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_assertThisInitialized(_this), "value", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_assertThisInitialized(_this), "clearable", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_assertThisInitialized(_this), "placeholder", _descriptor4, _assertThisInitialized(_this));

    _initializerDefineProperty(_assertThisInitialized(_this), "format", _descriptor5, _assertThisInitialized(_this));

    return _this;
  }

  var _proto = DTimeRangePicker.prototype;

  _proto.convertValue = function convertValue(value) {
    if (!value) {
      return [null, null];
    }

    return value;
  };

  _proto.convertValueBack = function convertValueBack(value) {
    return value;
  };

  _proto.getProps = function getProps() {
    return {
      allowClear: this.$attrs.allowClear !== undefined ? this.$attrs.allowClear : this.clearable
    };
  };

  _proto.valueChanged = function valueChanged(value) {
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
  };

  return DTimeRangePicker;
}(BaseFormComponent), _defineProperty(_class3, "install", void 0), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "separator", [_dec2], {
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