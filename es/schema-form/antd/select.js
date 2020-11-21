var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _class3, _temp;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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
import { noop } from 'ant-design-vue/lib/_util/vue-types/utils';
import Component from 'vue-class-component';
import { Prop, Provide } from 'vue-property-decorator';
import OptionsBasedComponent from "../mixins/options-based-component";
import { getNodeText } from "../utils/vnode";
/**
 * 选项较多的时候
 */

var DSelect = (_dec = Component({
  name: 'DSelect'
}), _dec2 = Prop({
  default: '请选择'
}), _dec3 = Prop({
  type: String,
  default: '没有内容'
}), _dec4 = Prop(Boolean), _dec5 = Prop(Boolean), _dec6 = Prop(Function), _dec7 = Prop({
  type: Boolean,
  default: false
}), _dec8 = Prop({
  type: String
}), _dec9 = Prop(), _dec10 = Prop({
  type: Number,
  default: 300
}), _dec11 = Provide('selectStore'), _dec(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_OptionsBasedComponen) {
  _inherits(DSelect, _OptionsBasedComponen);

  var _super = _createSuper(DSelect);

  function DSelect() {
    var _this;

    _classCallCheck(this, DSelect);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _initializerDefineProperty(_this, "placeholder", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "notFoundContent", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "searchable", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "multiple", _descriptor4, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "filter", _descriptor5, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "clearable", _descriptor6, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "defaultOptionLabel", _descriptor7, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "defaultOptionValue", _descriptor8, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "searchDebounceInterval", _descriptor9, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "store", _descriptor10, _assertThisInitialized(_this));

    return _this;
  }

  _createClass(DSelect, [{
    key: "onSearch",
    value: function onSearch(value) {
      this.store.inputValue = value;
      this.$emit('search', value);
    }
  }, {
    key: "getInitValue",
    value: function getInitValue() {
      return [];
    }
  }, {
    key: "onFocus",
    value: function onFocus() {
      this.store.inputValue = '';

      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      this.$emit.apply(this, ['focus'].concat(args));
    }
  }, {
    key: "onBlur",
    value: function onBlur() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      this.$emit.apply(this, ['blur'].concat(args));
    }
  }, {
    key: "getInputComponent",
    value: function getInputComponent() {
      return 'a-select';
    }
  }, {
    key: "getListeners",
    value: function getListeners() {
      return {
        keydown: this.$listeners.keydown || noop,
        focus: this.onFocus,
        blur: this.onBlur,
        search: this.onSearch
      };
    }
  }, {
    key: "onFilterOption",
    value: function onFilterOption(inputValue, option) {
      var input = inputValue.toLowerCase();
      var text = getNodeText(option);

      if (!this.filter && text) {
        return text.toLowerCase().includes(input);
      } else if (this.filter) {
        if (this.options) {
          return this.filter(inputValue, option.data.props);
        }

        return this.filter(inputValue, _extends({
          text: text
        }, option.componentOptions.propsData));
      }

      return true;
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
    key: "getProps",
    value: function getProps() {
      var _this2 = this;

      var props = {
        filterOption: this.onFilterOption,
        allowClear: this.$attrs.allowClear !== undefined ? this.$attrs.allowClear : this.clearable,
        showSearch: this.$attrs.showSearch !== undefined ? this.$attrs.showSearch : this.searchable,
        notFoundContent: this.notFoundContent
      };

      if (this.multiple && this.$attrs.mode === undefined) {
        props.mode = 'multiple';
      }

      if (this.options) {
        props.options = this.filterOptions();
      }

      if (this.defaultOptionLabel && props.options) {
        props.options = [{
          label: this.defaultOptionLabel,
          value: this.defaultOptionValue
        }].concat(props.options);
      }

      if (this.$slots.dropdownRender) {
        props.dropdownRender = function () {
          return _this2.$slots.dropdownRender[0];
        };
      }

      return props;
    }
  }, {
    key: "focus",
    value: function focus() {
      this.$children[0].focus();
    }
  }, {
    key: "blur",
    value: function blur() {
      this.$children[0].blur();
    }
  }, {
    key: "open",
    value: function open() {
      this.$children[0].$children[0].setOpenState(true);
    }
  }, {
    key: "close",
    value: function close() {
      var child = this.$children[0];

      if (child.close && typeof child.close === 'function') {
        child.close();
      }
    }
  }, {
    key: "filterOptions",
    value: function filterOptions() {
      var _this3 = this;

      var inputValue = this.store.inputValue;

      if (this.options) {
        var options = this.options;

        if (this.filter) {
          options = options.filter(function (option) {
            if (inputValue) {
              return _this3.filter(inputValue, option);
            }

            return true;
          });
        }

        return this.getResolvedOptions(options);
      }

      return null;
    }
  }]);

  return DSelect;
}(OptionsBasedComponent), _class3.install = void 0, _class3.Option = 'a-select-option', _class3.OptionGroup = 'a-select-option-group', _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "placeholder", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "notFoundContent", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "searchable", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "multiple", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "filter", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "clearable", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "defaultOptionLabel", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "defaultOptionValue", [_dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "searchDebounceInterval", [_dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "store", [_dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {
      inputValue: ''
    };
  }
})), _class2)) || _class);
export { DSelect as default };