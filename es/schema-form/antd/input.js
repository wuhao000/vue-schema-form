var _dec, _class, _dec2, _class2, _dec3, _dec4, _class3, _class4, _descriptor, _temp, _dec5, _class6, _dec6, _class7, _class8, _temp2;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import BaseFormComponent from "../mixins/base-input-component";
import hasProp, { hasListener } from "../utils/props-util";
var DInput = (_dec6 = Component({
  name: 'DInput',
  inheritAttrs: false
}), _dec6(_class7 = (_temp2 = _class8 = /*#__PURE__*/function (_BaseFormComponent) {
  _inherits(DInput, _BaseFormComponent);

  var _super5 = _createSuper(DInput);

  function DInput() {
    _classCallCheck(this, DInput);

    return _super5.apply(this, arguments);
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
}(BaseFormComponent), _class8.install = void 0, _class8.Group = void 0, _class8.Search = void 0, _class8.TextArea = void 0, _class8.Password = void 0, _temp2)) || _class7);
export { DInput as default };
var DInputGroup = (_dec = Component({
  name: 'DInputGroup',
  inheritAttrs: false
}), _dec(_class = /*#__PURE__*/function (_DInput) {
  _inherits(DInputGroup, _DInput);

  var _super = _createSuper(DInputGroup);

  function DInputGroup() {
    _classCallCheck(this, DInputGroup);

    return _super.apply(this, arguments);
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
}), _dec2(_class2 = /*#__PURE__*/function (_DInput2) {
  _inherits(DInputPassword, _DInput2);

  var _super2 = _createSuper(DInputPassword);

  function DInputPassword() {
    _classCallCheck(this, DInputPassword);

    return _super2.apply(this, arguments);
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
}), _dec4 = Prop({}), _dec3(_class3 = (_class4 = (_temp = /*#__PURE__*/function (_DInput3) {
  _inherits(DInputSearch, _DInput3);

  var _super3 = _createSuper(DInputSearch);

  function DInputSearch() {
    var _this;

    _classCallCheck(this, DInputSearch);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super3.call.apply(_super3, [this].concat(args));

    _initializerDefineProperty(_this, "enterButton", _descriptor, _assertThisInitialized(_this));

    return _this;
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
          enterButton = h("div", [this.$slots.enterButton]);
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
          return h("div", [this.$slots.default]);
        }
      }
    }
  }]);

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
  _inherits(DTextArea, _DInput4);

  var _super4 = _createSuper(DTextArea);

  function DTextArea() {
    _classCallCheck(this, DTextArea);

    return _super4.apply(this, arguments);
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