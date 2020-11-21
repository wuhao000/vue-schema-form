var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
  _inheritsLoose(OptionsBasedComponent, _mixins);

  function OptionsBasedComponent() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _mixins.call.apply(_mixins, [this].concat(args)) || this;

    _initializerDefineProperty(_assertThisInitialized(_this), "labelProperty", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_assertThisInitialized(_this), "options", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_assertThisInitialized(_this), "valueProperty", _descriptor3, _assertThisInitialized(_this));

    return _this;
  }

  var _proto = OptionsBasedComponent.prototype;

  _proto.beforeUpdate = function beforeUpdate() {
    this.setProps();
  };

  _proto.created = function created() {
    this.setProps();
  };

  _proto.getOptions = function getOptions() {
    return this.getResolvedOptions(this.options);
  };

  _proto.getResolvedOptions = function getResolvedOptions(options) {
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
  };

  _proto.setProps = function setProps() {
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
  };

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