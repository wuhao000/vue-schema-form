import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

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

import "../styles/image-picker.less";
import "../styles/mobile-image-picker.less";
import { SCHEMA_FORM_STORE_INJECT_KEY } from "../form";
import Vue from 'vue';
import Component from 'vue-class-component';
import { Inject, Prop, Watch } from 'vue-property-decorator';
import { isSame } from "../utils/array";
var MobileImagePicker = (_dec = Component({
  name: 'MobileImagePicker'
}), _dec2 = Prop([String, Array]), _dec3 = Prop({
  type: Boolean,
  default: false
}), _dec4 = Inject(SCHEMA_FORM_STORE_INJECT_KEY), _dec5 = Watch('value', {
  immediate: true
}), _dec6 = Watch('currentValue'), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Vue) {
  _inherits(MobileImagePicker, _Vue);

  var _super = _createSuper(MobileImagePicker);

  function MobileImagePicker() {
    var _this;

    _classCallCheck(this, MobileImagePicker);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _initializerDefineProperty(_this, "value", _descriptor, _assertThisInitialized(_this));

    _this.currentValue = [];

    _initializerDefineProperty(_this, "multiple", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "store", _descriptor3, _assertThisInitialized(_this));

    return _this;
  }

  _createClass(MobileImagePicker, [{
    key: "valueChanged",
    value: function valueChanged(value) {
      if (this.value) {
        if (this.multiple) {
          this.currentValue = this.value.map(function (it) {
            return {
              url: it
            };
          });
        } else {
          this.currentValue = [{
            url: this.value
          }];
        }
      } else {
        this.currentValue = [];
      }
    }
  }, {
    key: "currentValueChanged",
    value: function currentValueChanged(currentValue) {
      if (currentValue && currentValue.length) {
        var value = currentValue.map(function (it) {
          return it.url;
        });

        if (this.multiple) {
          if (this.value) {
            if (!isSame(this.value, value)) {
              this.$emit('input', value);
            }
          } else {
            this.$emit('input', []);
          }
        } else {
          if (this.value !== currentValue[0].url) {
            this.$emit('input', currentValue[0].url);
          }
        }
      } else {
        if (this.value) {
          this.$emit('input', null);
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var h = arguments[0];
      var currentValue = this.currentValue;
      var props = Object.assign({}, this.$attrs);
      props.length = this.length;
      props.selectable = currentValue.length < this.length;
      props.value = currentValue;
      return h("m-list-item", {
        "attrs": {
          "title": this.$attrs.title,
          "multipleLine": true
        }
      }, [// @ts-ignore
      h("m-image-picker", _mergeJSXProps([{
        "slot": "extra"
      }, {
        "props": props
      }, {
        "on": {
          "input": function input(v) {
            _this2.currentValue = v;
          }
        }
      }]))]);
    }
  }, {
    key: "length",
    get: function get() {
      return this.multiple ? 10 : 1;
    }
  }]);

  return MobileImagePicker;
}(Vue), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "value", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "multiple", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "store", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "valueChanged", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "valueChanged"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "currentValueChanged", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "currentValueChanged"), _class2.prototype)), _class2)) || _class);
export { MobileImagePicker as default };