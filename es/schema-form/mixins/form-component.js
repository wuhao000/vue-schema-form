var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

import Vue from 'vue';
import Component from 'vue-class-component';
import { Inject, Prop } from 'vue-property-decorator';
export var FormComponent = (_dec = Component({
  name: 'FormComponent'
}), _dec2 = Prop({
  type: String
}), _dec3 = Prop({
  type: Boolean
}), _dec4 = Prop({
  type: Boolean
}), _dec5 = Inject({
  from: 'form',
  default: undefined
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Vue) {
  _inheritsLoose(FormComponent, _Vue);

  function FormComponent() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Vue.call.apply(_Vue, [this].concat(args)) || this;

    _initializerDefineProperty(_assertThisInitialized(_this), "size", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_assertThisInitialized(_this), "disabled", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_assertThisInitialized(_this), "readOnly", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_assertThisInitialized(_this), "form", _descriptor4, _assertThisInitialized(_this));

    return _this;
  }

  _createClass(FormComponent, [{
    key: "isDisabled",
    get: function get() {
      var disabled = this.disabled;

      if (this.form) {
        if (!disabled) {
          disabled = this.form.disabled;
        }
      }

      return disabled;
    }
  }, {
    key: "componentSize",
    get: function get() {
      var size = this.size;

      if (this.form) {
        if (size === undefined || size === null) {
          size = this.form.size;
        }
      }

      return size;
    }
  }, {
    key: "isReadonly",
    get: function get() {
      var isReadonly = this.readOnly;

      if (this.form) {
        if (!isReadonly) {
          isReadonly = this.form.readOnly;
        }
      }

      return isReadonly;
    }
  }]);

  return FormComponent;
}(Vue), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "size", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "disabled", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "readOnly", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "form", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);