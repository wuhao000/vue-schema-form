var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

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

import Component, { mixins } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { getOptionProperty } from "../utils/option";
import BaseFormComponent from "./base-input-component";
var OptionsBasedComponent = (_dec = Component({
  name: 'OptionsBasedComponent'
}), _dec2 = Prop({
  type: [String, Function],
  default: 'label'
}), _dec3 = Prop({
  type: Array
}), _dec4 = Prop({
  type: [String, Function],
  default: 'value'
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_mixins) {
  _inherits(OptionsBasedComponent, _mixins);

  var _super = _createSuper(OptionsBasedComponent);

  function OptionsBasedComponent() {
    var _this;

    _classCallCheck(this, OptionsBasedComponent);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _initializerDefineProperty(_this, "labelProperty", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "options", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "valueProperty", _descriptor3, _assertThisInitialized(_this));

    return _this;
  }

  _createClass(OptionsBasedComponent, [{
    key: "beforeUpdate",
    value: function beforeUpdate() {
      this.setProps();
    }
  }, {
    key: "created",
    value: function created() {
      this.setProps();
    }
  }, {
    key: "getOptions",
    value: function getOptions() {
      return this.getResolvedOptions(this.options);
    }
  }, {
    key: "getResolvedOptions",
    value: function getResolvedOptions(options) {
      var _this2 = this;

      if (options) {
        return options.map(function (option) {
          var op = _extends({}, option);

          op.label = getOptionProperty(option, _this2.labelProperty);
          op.value = getOptionProperty(option, _this2.valueProperty);
          return op;
        });
      } else {
        return null;
      }
    }
  }, {
    key: "setProps",
    value: function setProps() {
      var _this3 = this;

      if (this.$slots.default) {
        this.$slots.default.forEach(function (node) {
          if (node.componentOptions && node.componentOptions.propsData['disabled'] === undefined) {
            node.componentOptions.propsData['disabled'] = _this3['isDisabled'];
          }

          if (node.componentOptions && node.componentOptions.propsData['readonly'] === undefined) {
            node.componentOptions.propsData['readonly'] = _this3['isReadonly'];
          }
        });
      }
    }
  }]);

  return OptionsBasedComponent;
}(mixins(BaseFormComponent)), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "labelProperty", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "options", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "valueProperty", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { OptionsBasedComponent as default };