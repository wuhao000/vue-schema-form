import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import _initializerDefineProperty from "@babel/runtime/helpers/esm/initializerDefineProperty";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/esm/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/esm/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3;

import { createVNode } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import Component from 'vue-class-component';
import { mixins } from 'vue-class-component/lib/util';
import { Prop, Watch } from 'vue-property-decorator';
import { isNotNull } from '../utils/utils';
import hasProp, { hasListener } from '../utils/props-util';
import Emitter from './emitter';

function isArrayEmpty(array) {
  if (array === null || array === undefined || array.length === 0 || array.filter(function (it) {
    return it !== null && it !== undefined;
  }).length === 0) {
    return true;
  }

  return false;
}

var PureInputComponent = (_dec = Component({
  name: 'PureInputComponent'
}), _dec2 = Prop(Boolean), _dec3 = Prop(), _dec4 = Prop([String, Number]), _dec5 = Watch('stateValue'), _dec6 = Watch('value'), _dec(_class = (_class2 =
/*#__PURE__*/
function (_mixins) {
  _inherits(PureInputComponent, _mixins);

  function PureInputComponent() {
    var _getPrototypeOf2;

    var _temp, _this;

    _classCallCheck(this, PureInputComponent);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(PureInputComponent)).call.apply(_getPrototypeOf2, [this].concat(args))), _initializerDefineProperty(_this, "block", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "value", _descriptor2, _assertThisInitialized(_this)), _this.stateValue = _this.initValue, _initializerDefineProperty(_this, "width", _descriptor3, _assertThisInitialized(_this)), _temp));
  }

  _createClass(PureInputComponent, [{
    key: "getSlots",
    value: function getSlots() {
      return {};
    }
  }, {
    key: "getInitValue",
    value: function getInitValue() {
      return null;
    }
  }, {
    key: "stateValueChanged",
    value: function stateValueChanged(value) {
      var val = this.convertValueBack(value);

      if (hasProp(this, 'value')) {
        this.$emit('input', val);
      }

      this.dispatch('DFormItem', 'd.form.change', [val]);
    }
  }, {
    key: "valueChanged",
    value: function valueChanged(value) {
      if (this.stateValue !== this.convertValue(value)) {
        this.stateValue = this.convertValue(value);
      }
    }
  }, {
    key: "mounted",
    value: function mounted() {
      this.dispatch('DFormItem', 'd.form-item.setControl', [this]);
    }
  }, {
    key: "beforeDestroy",
    value: function beforeDestroy() {
      this.dispatch('DFormItem', 'd.form-item.setControl', [null]);
    }
  }, {
    key: "convertValue",
    value: function convertValue(value) {
      return value;
    }
  }, {
    key: "convertValueBack",
    value: function convertValueBack(value) {
      return value;
    }
  }, {
    key: "getInputComponent",
    value: function getInputComponent() {
      return {};
    }
  }, {
    key: "getListeners",
    value: function getListeners() {
      return {};
    }
  }, {
    key: "getProps",
    value: function getProps() {
      return {};
    }
  }, {
    key: "getSlotProps",
    value: function getSlotProps() {
      var _this2 = this;

      var props = {};
      Object.keys(this.$slots).forEach(function (slotKey) {
        if (slotKey !== 'default') {
          props[slotKey] = _this2.$slots[slotKey];
        }
      });
      return props;
    }
  }, {
    key: "handleBlur",
    value: function handleBlur() {
      this.dispatch('DFormItem', 'd.form.blur', [this.stateValue]);
    }
  }, {
    key: "handleChange",
    value: function handleChange(value) {
      if (isNotNull(value) && value.toString() === '[object InputEvent]') {
        return;
      }

      var comp = this.getInputComponent();
      this.$emit('change', value);

      if (comp.model && comp.model.prop === 'value' && comp.model.event === 'change') {
        this.stateValue = value;
      }
    }
  }, {
    key: "handleKeydown",
    value: function handleKeydown() {
      for (var _len2 = arguments.length, margs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        margs[_key2] = arguments[_key2];
      }

      this.$emit.apply(this, ['keydown'].concat(margs));
    }
  }, {
    key: "handleKeyup",
    value: function handleKeyup() {
      for (var _len3 = arguments.length, margs = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        margs[_key3] = arguments[_key3];
      }

      this.$emit.apply(this, ['keyup'].concat(margs));
    }
  }, {
    key: "onInput",
    value: function onInput(value) {
      var val = value;

      if (value && value.toString() === '[object InputEvent]') {
        val = value.target.value;
      }

      this.$emit('input', val);
      this.$emit('change', val);

      if (!(hasProp(this, 'value') && hasListener(this, 'input'))) {
        this.stateValue = val;
      }
    }
  }, {
    key: "getValue",
    value: function getValue() {
      if (Array.isArray(this.stateValue)) {
        if (isArrayEmpty(this.stateValue)) {
          return [];
        }
      }

      return this.stateValue;
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var h = arguments[0];
      var CustomComponent = this.getInputComponent();
      var value = this.getValue(); // @ts-ignore

      return createVNode(CustomComponent, {
        "attrs": this.props,
        "value": value,
        "scopedSlots": this.$scopedSlots,
        "slots": this.slots,
        "on": this.listeners,
        "style": this.cssStyle
      }, {
        default: function _default() {
          return [_this3.getDefaultSlot()];
        }
      });
    }
  }, {
    key: "getDefaultSlot",
    value: function getDefaultSlot() {
      return this.$slots.default;
    }
  }, {
    key: "cssStyle",
    get: function get() {
      var style = {};

      if (this.block) {
        style.display = 'block';
      }

      if (this.width) {
        if (typeof this.width === 'number') {
          style.width = this.width + 'px';
        } else {
          style.width = this.width;
        }
      }

      return style;
    }
  }, {
    key: "initValue",
    get: function get() {
      var convertValue = this.convertValue(this.value);

      if (convertValue !== null && convertValue !== undefined) {
        return convertValue;
      } else {
        return this.getInitValue();
      }
    }
  }, {
    key: "listeners",
    get: function get() {
      return _extends({}, this.$listeners, {
        input: this.onInput,
        blur: this.handleBlur,
        change: this.handleChange,
        keydown: this.handleKeydown,
        keyup: this.handleKeyup
      }, this.getListeners());
    }
  }, {
    key: "slots",
    get: function get() {
      return _extends({}, this.$slots, this.getSlots());
    }
  }, {
    key: "props",
    get: function get() {
      return _objectSpread({}, this.getSlotProps(), {}, this.$attrs, {}, this.$props, {}, this.getProps(), {
        visible: this.stateValue
      });
    }
  }]);

  return PureInputComponent;
}(mixins(Emitter)), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "block", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "value", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "width", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "stateValueChanged", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "stateValueChanged"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "valueChanged", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "valueChanged"), _class2.prototype)), _class2)) || _class);
export { PureInputComponent as default };