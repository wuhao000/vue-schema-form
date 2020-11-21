var _dec, _class, _dec2, _class2, _dec3, _dec4, _class3, _class4, _descriptor, _temp, _dec5, _class6, _dec6, _class7, _class8, _temp2;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import BaseFormComponent from "../mixins/base-input-component";
import hasProp, { hasListener } from "../utils/props-util";
var DInput = (_dec6 = Component({
  name: 'DInput',
  inheritAttrs: false
}), _dec6(_class7 = (_temp2 = _class8 = /*#__PURE__*/function (_BaseFormComponent) {
  _inheritsLoose(DInput, _BaseFormComponent);

  function DInput() {
    return _BaseFormComponent.apply(this, arguments) || this;
  }

  var _proto5 = DInput.prototype;

  _proto5.getInputComponent = function getInputComponent() {
    return 'a-input';
  };

  _proto5.getInitValue = function getInitValue() {
    return '';
  };

  _proto5.onInput = function onInput(value) {
    var val = value;

    if (value && ['[object InputEvent]', '[object Event]'].includes(value.toString())) {
      val = value.target.value;
    }

    if (typeof val !== 'object' && typeof val !== 'function') {
      this.$emit('input', val);

      if (!(hasProp(this, 'value') && hasListener(this, 'input'))) {
        this.stateValue = val;
      }
    }
  };

  _proto5.handleChange = function handleChange(value) {
    if (typeof value !== 'object' && typeof value !== 'function') {
      var comp = this.getInputComponent();

      if (comp.model && comp.model.prop === 'value' && comp.model.event === 'change') {
        this.$emit('change', value);
        this.stateValue = value;
      }
    }
  };

  return DInput;
}(BaseFormComponent), _defineProperty(_class8, "install", void 0), _defineProperty(_class8, "Group", void 0), _defineProperty(_class8, "Search", void 0), _defineProperty(_class8, "TextArea", void 0), _defineProperty(_class8, "Password", void 0), _temp2)) || _class7);
export { DInput as default };
var DInputGroup = (_dec = Component({
  name: 'DInputGroup',
  inheritAttrs: false
}), _dec(_class = /*#__PURE__*/function (_DInput) {
  _inheritsLoose(DInputGroup, _DInput);

  function DInputGroup() {
    return _DInput.apply(this, arguments) || this;
  }

  var _proto = DInputGroup.prototype;

  _proto.getInputComponent = function getInputComponent() {
    return 'a-input-group';
  };

  return DInputGroup;
}(DInput)) || _class);
var DInputPassword = (_dec2 = Component({
  name: 'DInputPassword',
  inheritAttrs: false
}), _dec2(_class2 = /*#__PURE__*/function (_DInput2) {
  _inheritsLoose(DInputPassword, _DInput2);

  function DInputPassword() {
    return _DInput2.apply(this, arguments) || this;
  }

  var _proto2 = DInputPassword.prototype;

  _proto2.getInputComponent = function getInputComponent() {
    return 'a-input-password';
  };

  return DInputPassword;
}(DInput)) || _class2);
var DInputSearch = (_dec3 = Component({
  name: 'DInputSearch',
  inheritAttrs: false
}), _dec4 = Prop({}), _dec3(_class3 = (_class4 = (_temp = /*#__PURE__*/function (_DInput3) {
  _inheritsLoose(DInputSearch, _DInput3);

  function DInputSearch() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _DInput3.call.apply(_DInput3, [this].concat(args)) || this;

    _initializerDefineProperty(_assertThisInitialized(_this), "enterButton", _descriptor, _assertThisInitialized(_this));

    return _this;
  }

  var _proto3 = DInputSearch.prototype;

  _proto3.getInputComponent = function getInputComponent() {
    return 'a-input-search';
  };

  _proto3.getSlots = function getSlots() {
    var h = this.$createElement;
    var enterButton;

    if (this.$slots.enterButton) {
      if (this.$slots.enterButton.length) {
        enterButton = this.$slots.enterButton[0];
      } else {
        enterButton = h("div", [this.$slots.enterButton]);
      }
    }

    return {
      enterButton: enterButton
    };
  };

  _proto3.getDefaultSlot = function getDefaultSlot() {
    var h = this.$createElement;

    if (this.$slots.default) {
      if (this.$slots.default.length) {
        return this.$slots.default[0];
      } else {
        return h("div", [this.$slots.default]);
      }
    }
  };

  return DInputSearch;
}(DInput), _temp), (_descriptor = _applyDecoratedDescriptor(_class4.prototype, "enterButton", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class4)) || _class3);
var DTextArea = (_dec5 = Component({
  name: 'DTextarea',
  inheritAttrs: false
}), _dec5(_class6 = /*#__PURE__*/function (_DInput4) {
  _inheritsLoose(DTextArea, _DInput4);

  function DTextArea() {
    return _DInput4.apply(this, arguments) || this;
  }

  var _proto4 = DTextArea.prototype;

  _proto4.getInputComponent = function getInputComponent() {
    return 'a-textarea';
  };

  return DTextArea;
}(DInput)) || _class6);
DInput.TextArea = DTextArea;
DInput.Search = DInputSearch;
DInput.Group = DInputGroup;
DInput.Password = DInputPassword;