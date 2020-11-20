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
import _initializerDefineProperty from "@babel/runtime/helpers/esm/initializerDefineProperty";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/esm/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/esm/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;

import Component from 'vue-class-component';
import { Model, Prop, Watch } from 'vue-property-decorator';
import BaseFormComponent from '../mixins/base-input-component';
import TimePicker from './time-picker';
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
}), _dec7 = Watch('value'), _dec(_class = (_class2 =
/*#__PURE__*/
function (_BaseFormComponent) {
  _inherits(DTimeRangePicker, _BaseFormComponent);

  function DTimeRangePicker() {
    var _getPrototypeOf2;

    var _temp, _this;

    _classCallCheck(this, DTimeRangePicker);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DTimeRangePicker)).call.apply(_getPrototypeOf2, [this].concat(args))), _initializerDefineProperty(_this, "separator", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "value", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "clearable", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "placeholder", _descriptor4, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "format", _descriptor5, _assertThisInitialized(_this)), _temp));
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
}(BaseFormComponent), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "separator", [_dec2], {
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