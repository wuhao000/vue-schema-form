import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

import Component from 'vue-class-component';
import { mixins } from 'vue-class-component/lib/util';
import { Prop, Watch } from 'vue-property-decorator';
import { isNotNull } from "../utils/utils";
import hasProp, { hasListener } from "../utils/props-util";
import Emitter from "./emitter";

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
}), _dec2 = Prop(Boolean), _dec3 = Prop(), _dec4 = Prop([String, Number]), _dec5 = Watch('stateValue'), _dec6 = Watch('value'), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_mixins) {
  _inheritsLoose(PureInputComponent, _mixins);

  function PureInputComponent() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _mixins.call.apply(_mixins, [this].concat(args)) || this;

    _initializerDefineProperty(_assertThisInitialized(_this), "block", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_assertThisInitialized(_this), "value", _descriptor2, _assertThisInitialized(_this));

    _defineProperty(_assertThisInitialized(_this), "stateValue", _this.initValue);

    _initializerDefineProperty(_assertThisInitialized(_this), "width", _descriptor3, _assertThisInitialized(_this));

    return _this;
  }

  var _proto = PureInputComponent.prototype;

  _proto.getSlots = function getSlots() {
    return {};
  };

  _proto.getInitValue = function getInitValue() {
    return null;
  };

  _proto.stateValueChanged = function stateValueChanged(value) {
    var val = this.convertValueBack(value);

    if (hasProp(this, 'value')) {
      this.$emit('input', val);
    }

    this.dispatch('DFormItem', 'd.form.change', [val]);
  };

  _proto.valueChanged = function valueChanged(value) {
    if (this.stateValue !== this.convertValue(value)) {
      this.stateValue = this.convertValue(value);
    }
  };

  _proto.mounted = function mounted() {
    this.dispatch('DFormItem', 'd.form-item.setControl', [this]);
  };

  _proto.beforeDestroy = function beforeDestroy() {
    this.dispatch('DFormItem', 'd.form-item.setControl', [null]);
  };

  _proto.convertValue = function convertValue(value) {
    return value;
  };

  _proto.convertValueBack = function convertValueBack(value) {
    return value;
  };

  _proto.getInputComponent = function getInputComponent() {
    return {};
  };

  _proto.getListeners = function getListeners() {
    return {};
  };

  _proto.getProps = function getProps() {
    return {};
  };

  _proto.getSlotProps = function getSlotProps() {
    var _this2 = this;

    var props = {};
    Object.keys(this.$slots).forEach(function (slotKey) {
      if (slotKey !== 'default') {
        props[slotKey] = _this2.$slots[slotKey];
      }
    });
    return props;
  };

  _proto.handleBlur = function handleBlur() {
    this.dispatch('DFormItem', 'd.form.blur', [this.stateValue]);
  };

  _proto.handleChange = function handleChange(value) {
    if (isNotNull(value) && value.toString() === '[object InputEvent]') {
      return;
    }

    var comp = this.getInputComponent();
    this.$emit('change', value);

    if (comp.model && comp.model.prop === 'value' && comp.model.event === 'change') {
      this.stateValue = value;
    }
  };

  _proto.handleKeydown = function handleKeydown() {
    for (var _len2 = arguments.length, margs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      margs[_key2] = arguments[_key2];
    }

    this.$emit.apply(this, ['keydown'].concat(margs));
  };

  _proto.handleKeyup = function handleKeyup() {
    for (var _len3 = arguments.length, margs = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      margs[_key3] = arguments[_key3];
    }

    this.$emit.apply(this, ['keyup'].concat(margs));
  };

  _proto.onInput = function onInput(value) {
    var val = value;

    if (value && value.toString() === '[object InputEvent]') {
      val = value.target.value;
    }

    this.$emit('input', val);
    this.$emit('change', val);

    if (!(hasProp(this, 'value') && hasListener(this, 'input'))) {
      this.stateValue = val;
    }
  };

  _proto.getValue = function getValue() {
    if (Array.isArray(this.stateValue)) {
      if (isArrayEmpty(this.stateValue)) {
        return [];
      }
    }

    return this.stateValue;
  };

  _proto.render = function render() {
    var h = arguments[0];
    var CustomComponent = this.getInputComponent();
    var value = this.getValue(); // @ts-ignore

    return h(CustomComponent, _mergeJSXProps([{}, {
      "attrs": this.props
    }, {
      "attrs": {
        "value": value,
        "slots": this.slots
      },
      "scopedSlots": this.$scopedSlots
    }, {
      "on": this.listeners
    }, {
      "style": this.cssStyle
    }]), [this.getDefaultSlot()]);
  };

  _proto.getDefaultSlot = function getDefaultSlot() {
    return this.$slots.default;
  };

  _createClass(PureInputComponent, [{
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
      return _extends({}, this.getSlotProps(), this.$attrs, this.$props, this.getProps(), {
        visible: this.stateValue
      });
    }
  }]);

  return PureInputComponent;
}(mixins(Emitter)), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "block", [_dec2], {
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