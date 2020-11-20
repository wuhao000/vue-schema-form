import _typeof from "@babel/runtime/helpers/esm/typeof";
import _initializerDefineProperty from "@babel/runtime/helpers/esm/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/esm/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/esm/initializerWarningHelper";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";

var _dec, _class, _dec2, _class2, _dec3, _dec4, _class3, _class4, _descriptor, _dec5, _class6, _dec6, _class7;

import { createVNode } from "vue";
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import BaseFormComponent from '../mixins/base-input-component';
import hasProp, { hasListener } from '../utils/props-util';
var DInput = (_dec6 = Component({
  name: 'DInput',
  inheritAttrs: false
}), _dec6(_class7 =
/*#__PURE__*/
function (_BaseFormComponent) {
  _inherits(DInput, _BaseFormComponent);

  function DInput() {
    _classCallCheck(this, DInput);

    return _possibleConstructorReturn(this, _getPrototypeOf(DInput).apply(this, arguments));
  }

  _createClass(DInput, [{
    key: "getInputComponent",
    value: function getInputComponent() {
      return 'a-input';
    }
  }, {
    key: "getInitValue",
    value: function getInitValue() {
      return '';
    }
  }, {
    key: "onInput",
    value: function onInput(value) {
      var val = value;

      if (value && ['[object InputEvent]', '[object Event]'].includes(value.toString())) {
        val = value.target.value;
      }

      if (_typeof(val) !== 'object' && typeof val !== 'function') {
        this.$emit('input', val);

        if (!(hasProp(this, 'value') && hasListener(this, 'input'))) {
          this.stateValue = val;
        }
      }
    }
  }, {
    key: "handleChange",
    value: function handleChange(value) {
      if (_typeof(value) !== 'object' && typeof value !== 'function') {
        var comp = this.getInputComponent();

        if (comp.model && comp.model.prop === 'value' && comp.model.event === 'change') {
          this.$emit('change', value);
          this.stateValue = value;
        }
      }
    }
  }]);

  return DInput;
}(BaseFormComponent)) || _class7);
export { DInput as default };
var DInputGroup = (_dec = Component({
  name: 'DInputGroup',
  inheritAttrs: false
}), _dec(_class =
/*#__PURE__*/
function (_DInput) {
  _inherits(DInputGroup, _DInput);

  function DInputGroup() {
    _classCallCheck(this, DInputGroup);

    return _possibleConstructorReturn(this, _getPrototypeOf(DInputGroup).apply(this, arguments));
  }

  _createClass(DInputGroup, [{
    key: "getInputComponent",
    value: function getInputComponent() {
      return 'a-input-group';
    }
  }]);

  return DInputGroup;
}(DInput)) || _class);
var DInputPassword = (_dec2 = Component({
  name: 'DInputPassword',
  inheritAttrs: false
}), _dec2(_class2 =
/*#__PURE__*/
function (_DInput2) {
  _inherits(DInputPassword, _DInput2);

  function DInputPassword() {
    _classCallCheck(this, DInputPassword);

    return _possibleConstructorReturn(this, _getPrototypeOf(DInputPassword).apply(this, arguments));
  }

  _createClass(DInputPassword, [{
    key: "getInputComponent",
    value: function getInputComponent() {
      return 'a-input-password';
    }
  }]);

  return DInputPassword;
}(DInput)) || _class2);
var DInputSearch = (_dec3 = Component({
  name: 'DInputSearch',
  inheritAttrs: false
}), _dec4 = Prop({}), _dec3(_class3 = (_class4 =
/*#__PURE__*/
function (_DInput3) {
  _inherits(DInputSearch, _DInput3);

  function DInputSearch() {
    var _getPrototypeOf2;

    var _temp, _this;

    _classCallCheck(this, DInputSearch);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DInputSearch)).call.apply(_getPrototypeOf2, [this].concat(args))), _initializerDefineProperty(_this, "enterButton", _descriptor, _assertThisInitialized(_this)), _temp));
  }

  _createClass(DInputSearch, [{
    key: "getInputComponent",
    value: function getInputComponent() {
      return 'a-input-search';
    }
  }, {
    key: "getSlots",
    value: function getSlots() {
      var h = this.$createElement;
      var enterButton;

      if (this.$slots.enterButton) {
        if (this.$slots.enterButton.length) {
          enterButton = this.$slots.enterButton[0];
        } else {
          enterButton = createVNode("div", null, [this.$slots.enterButton]);
        }
      }

      return {
        enterButton: enterButton
      };
    }
  }, {
    key: "getDefaultSlot",
    value: function getDefaultSlot() {
      var h = this.$createElement;

      if (this.$slots.default) {
        if (this.$slots.default.length) {
          return this.$slots.default[0];
        } else {
          return createVNode("div", null, [this.$slots.default]);
        }
      }
    }
  }]);

  return DInputSearch;
}(DInput), (_descriptor = _applyDecoratedDescriptor(_class4.prototype, "enterButton", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class4)) || _class3);
var DTextArea = (_dec5 = Component({
  name: 'DTextarea',
  inheritAttrs: false
}), _dec5(_class6 =
/*#__PURE__*/
function (_DInput4) {
  _inherits(DTextArea, _DInput4);

  function DTextArea() {
    _classCallCheck(this, DTextArea);

    return _possibleConstructorReturn(this, _getPrototypeOf(DTextArea).apply(this, arguments));
  }

  _createClass(DTextArea, [{
    key: "getInputComponent",
    value: function getInputComponent() {
      return 'a-textarea';
    }
  }]);

  return DTextArea;
}(DInput)) || _class6);
DInput.TextArea = DTextArea;
DInput.Search = DInputSearch;
DInput.Group = DInputGroup;
DInput.Password = DInputPassword;