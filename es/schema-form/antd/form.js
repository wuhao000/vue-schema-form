var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _class3, _temp;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

import classNames from 'classnames';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Provide } from 'vue-property-decorator';
var DForm = (_dec = Component({
  inheritAttrs: false,
  name: 'DForm'
}), _dec2 = Prop({
  type: Boolean,
  default: false
}), _dec3 = Prop({
  type: String,
  default: 'default'
}), _dec4 = Prop({
  type: Boolean,
  default: false
}), _dec5 = Prop({
  type: Boolean,
  default: false
}), _dec6 = Prop({
  type: [Number, Object],
  default: function _default() {
    var layout = this.$options.propsData && this.$options.propsData.layout;

    if (layout === 'horizontal') {
      return {
        xs: {
          span: 24
        },
        sm: {
          span: 7
        }
      };
    }

    return 0;
  }
}), _dec7 = Prop({
  type: String,
  default: '确定'
}), _dec8 = Prop({
  type: String,
  default: '取消'
}), _dec9 = Prop(Boolean), _dec10 = Prop({
  type: [String, Number]
}), _dec11 = Prop({
  type: Boolean
}), _dec12 = Prop({
  type: String,
  default: 'horizontal'
}), _dec13 = Prop({
  type: Object
}), _dec14 = Prop({
  type: Object
}), _dec15 = Prop({
  type: Function,
  default: function _default() {
    return function () {};
  }
}), _dec16 = Prop({
  type: [Number, Object],
  default: function _default() {
    var layout = this.$options.propsData && this.$options.propsData.layout;

    if (layout === 'horizontal') {
      return {
        xs: {
          span: 24
        },
        sm: {
          span: 12
        },
        md: {
          span: 10
        }
      };
    }

    return 0;
  }
}), _dec17 = Provide('form'), _dec(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_Vue) {
  _inheritsLoose(DForm, _Vue);

  function DForm() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Vue.call.apply(_Vue, [this].concat(args)) || this;

    _initializerDefineProperty(_assertThisInitialized(_this), "okCancel", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_assertThisInitialized(_this), "size", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_assertThisInitialized(_this), "disabled", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_assertThisInitialized(_this), "readOnly", _descriptor4, _assertThisInitialized(_this));

    _initializerDefineProperty(_assertThisInitialized(_this), "labelCol", _descriptor5, _assertThisInitialized(_this));

    _initializerDefineProperty(_assertThisInitialized(_this), "okText", _descriptor6, _assertThisInitialized(_this));

    _initializerDefineProperty(_assertThisInitialized(_this), "cancelText", _descriptor7, _assertThisInitialized(_this));

    _initializerDefineProperty(_assertThisInitialized(_this), "inline", _descriptor8, _assertThisInitialized(_this));

    _initializerDefineProperty(_assertThisInitialized(_this), "labelWidth", _descriptor9, _assertThisInitialized(_this));

    _initializerDefineProperty(_assertThisInitialized(_this), "hideRequiredMark", _descriptor10, _assertThisInitialized(_this));

    _initializerDefineProperty(_assertThisInitialized(_this), "layout", _descriptor11, _assertThisInitialized(_this));

    _initializerDefineProperty(_assertThisInitialized(_this), "model", _descriptor12, _assertThisInitialized(_this));

    _initializerDefineProperty(_assertThisInitialized(_this), "rules", _descriptor13, _assertThisInitialized(_this));

    _initializerDefineProperty(_assertThisInitialized(_this), "onSubmit", _descriptor14, _assertThisInitialized(_this));

    _defineProperty(_assertThisInitialized(_this), "prefixCls", 'ant-form');

    _initializerDefineProperty(_assertThisInitialized(_this), "wrapperCol", _descriptor15, _assertThisInitialized(_this));

    _defineProperty(_assertThisInitialized(_this), "fields", []);

    _initializerDefineProperty(_assertThisInitialized(_this), "form", _descriptor16, _assertThisInitialized(_this));

    return _this;
  }

  var _proto = DForm.prototype;

  _proto.created = function created() {
    var _this2 = this;

    this.form = this;
    this.$on('d.form.addField', function (field) {
      if (field) {
        _this2.fields.push(field);
      }
    });
    /* istanbul ignore next */

    this.$on('d.form.removeField', function (field) {
      if (field.prop) {
        _this2.fields.splice(_this2.fields.indexOf(field), 1);
      }
    });
  };

  _proto.clearValidate = function clearValidate(props) {
    if (props === void 0) {
      props = [];
    }

    var fields = props.length ? typeof props === 'string' ? this.fields.filter(function (field) {
      return props === field.prop;
    }) : this.fields.filter(function (field) {
      return props.indexOf(field.prop) > -1;
    }) : this.fields;
    fields.forEach(function (field) {
      field.clearValidate();
    });
  };

  _proto.resetFields = function resetFields() {
    if (!this.model) {
      console.warn('[Element Warn][Form]model is required for resetFields to work.');
      return;
    }

    this.fields.forEach(function (field) {
      field.resetField();
    });
  };

  _proto.validate = function validate(callback) {
    var _this3 = this;

    if (!this.model) {
      return;
    }

    var promise;
    var copyCallback = callback; // if no callback, return promise

    if (typeof copyCallback !== 'function' && Promise) {
      promise = new Promise(function (resolve, reject) {
        copyCallback = function copyCallback(valid) {
          var errorField = _this3.fields.find(function (it) {
            return it.currentValidateStatus === 'error';
          });

          if (errorField) {
            errorField.focus();
          }

          valid ? resolve(valid) : reject(valid);
        };
      });
    }

    var valid = true;
    var count = 0; // 如果需要验证的fields为空，调用验证时立刻返回callback

    if (this.fields.length === 0 && copyCallback) {
      copyCallback(true);
    }

    var invalidFields = {};
    this.fields.forEach(function (field) {
      field.validate('', function (message, field) {
        if (message) {
          valid = false;
        }

        invalidFields = _extends({}, invalidFields, field);

        if (typeof copyCallback === 'function' && ++count === _this3.fields.length) {
          copyCallback(valid, invalidFields);
        }
      });
    });

    if (promise) {
      return promise;
    }
  };

  _proto.validateField = function validateField(props, cb) {
    var copyProps = [].concat(props);
    var fields = this.fields.filter(function (field) {
      return copyProps.indexOf(field.prop) !== -1;
    });

    if (!fields.length) {
      console.warn('[Element Warn]please pass correct props!');
      return;
    }

    fields.forEach(function (field) {
      field.validate('', cb);
    });
  };

  _proto.render = function render(h) {
    var _classNames;

    var prefixCls = this.prefixCls,
        hideRequiredMark = this.hideRequiredMark,
        onSubmit = this.onSubmit,
        $slots = this.$slots;
    var layout = this.getLayout();
    var formClassName = classNames(prefixCls, (_classNames = {}, _classNames[prefixCls + "-horizontal"] = layout === 'horizontal', _classNames[prefixCls + "-vertical"] = layout === 'vertical', _classNames[prefixCls + "-inline"] = layout === 'inline', _classNames[prefixCls + "-hide-required-mark"] = hideRequiredMark, _classNames));
    return h("form", {
      "on": {
        "submit": onSubmit
      },
      "class": formClassName
    }, [$slots.default, this.renderButtons()]);
  };

  _proto.getLayout = function getLayout() {
    if (this.inline) {
      return 'inline';
    } else {
      return this.layout;
    }
  };

  _proto.renderButtons = function renderButtons() {
    var _this4 = this;

    var h = this.$createElement;

    if (this.okCancel) {
      return h("div", {
        "class": this.prefixCls + '-footer-btns'
      }, [// @ts-ignore
      h("a-button", {
        "on": {
          "click": function click(e) {
            _this4.$emit('cancel', e);
          }
        }
      }, [this.cancelText]), // @ts-ignore
      h("a-button", {
        "on": {
          "click": function click(e) {
            _this4.$emit('ok', e);
          }
        },
        "attrs": {
          "type": 'primary'
        },
        "style": {
          marginLeft: '8px'
        }
      }, [this.okText])]);
    }
  };

  return DForm;
}(Vue), _defineProperty(_class3, "Item", void 0), _defineProperty(_class3, "install", void 0), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "okCancel", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "size", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "disabled", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "readOnly", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "labelCol", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "okText", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "cancelText", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "inline", [_dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "labelWidth", [_dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "hideRequiredMark", [_dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "layout", [_dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "model", [_dec13], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "rules", [_dec14], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "onSubmit", [_dec15], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "wrapperCol", [_dec16], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "form", [_dec17], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return this;
  }
})), _class2)) || _class);
export { DForm as default };