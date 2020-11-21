var _dec, _dec2, _class, _class2, _descriptor, _class3, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import BaseFormComponent from "../mixins/base-input-component";
var DCascader = (_dec = Component({
  name: 'DCascader',
  inheritAttrs: false
}), _dec2 = Prop({
  type: String,
  default: ''
}), _dec(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_BaseFormComponent) {
  _inheritsLoose(DCascader, _BaseFormComponent);

  function DCascader() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _BaseFormComponent.call.apply(_BaseFormComponent, [this].concat(args)) || this;

    _initializerDefineProperty(_assertThisInitialized(_this), "placeholder", _descriptor, _assertThisInitialized(_this));

    return _this;
  }

  var _proto = DCascader.prototype;

  _proto.getInputComponent = function getInputComponent() {
    return 'a-cascader';
  };

  return DCascader;
}(BaseFormComponent), _defineProperty(_class3, "install", void 0), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "placeholder", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { DCascader as default };