import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import _initializerDefineProperty from "@babel/runtime/helpers/esm/initializerDefineProperty";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/esm/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/esm/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16;

import { createVNode, resolveComponent } from "vue";
import classNames from 'classnames';
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
}), _dec17 = Provide('form'), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inherits(DForm, _Vue);

  function DForm() {
    var _getPrototypeOf2;

    var _temp, _this;

    _classCallCheck(this, DForm);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DForm)).call.apply(_getPrototypeOf2, [this].concat(args))), _initializerDefineProperty(_this, "okCancel", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "size", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "disabled", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "readOnly", _descriptor4, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "labelCol", _descriptor5, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "okText", _descriptor6, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "cancelText", _descriptor7, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "inline", _descriptor8, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "labelWidth", _descriptor9, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "hideRequiredMark", _descriptor10, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "layout", _descriptor11, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "model", _descriptor12, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "rules", _descriptor13, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "onSubmit", _descriptor14, _assertThisInitialized(_this)), _this.prefixCls = 'ant-form', _initializerDefineProperty(_this, "wrapperCol", _descriptor15, _assertThisInitialized(_this)), _this.fields = [], _initializerDefineProperty(_this, "form", _descriptor16, _assertThisInitialized(_this)), _temp));
  }

  _createClass(DForm, [{
    key: "created",
    value: function created() {
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
    }
  }, {
    key: "clearValidate",
    value: function clearValidate() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var fields = props.length ? typeof props === 'string' ? this.fields.filter(function (field) {
        return props === field.prop;
      }) : this.fields.filter(function (field) {
        return props.indexOf(field.prop) > -1;
      }) : this.fields;
      fields.forEach(function (field) {
        field.clearValidate();
      });
    }
  }, {
    key: "resetFields",
    value: function resetFields() {
      if (!this.model) {
        console.warn('[Element Warn][Form]model is required for resetFields to work.');
        return;
      }

      this.fields.forEach(function (field) {
        field.resetField();
      });
    }
  }, {
    key: "validate",
    value: function validate(callback) {
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
    }
  }, {
    key: "validateField",
    value: function validateField(props, cb) {
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
    }
  }, {
    key: "render",
    value: function render(h) {
      var _classNames;

      var prefixCls = this.prefixCls,
          hideRequiredMark = this.hideRequiredMark,
          onSubmit = this.onSubmit,
          $slots = this.$slots;
      var layout = this.getLayout();
      var formClassName = classNames(prefixCls, (_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-horizontal"), layout === 'horizontal'), _defineProperty(_classNames, "".concat(prefixCls, "-vertical"), layout === 'vertical'), _defineProperty(_classNames, "".concat(prefixCls, "-inline"), layout === 'inline'), _defineProperty(_classNames, "".concat(prefixCls, "-hide-required-mark"), hideRequiredMark), _classNames));
      return createVNode("form", {
        "onSubmit": onSubmit,
        "class": formClassName
      }, [$slots.default, this.renderButtons()]);
    }
  }, {
    key: "getLayout",
    value: function getLayout() {
      if (this.inline) {
        return 'inline';
      } else {
        return this.layout;
      }
    }
  }, {
    key: "renderButtons",
    value: function renderButtons() {
      var _this4 = this;

      var h = this.$createElement;

      if (this.okCancel) {
        return createVNode("div", {
          "class": this.prefixCls + '-footer-btns'
        }, [// @ts-ignore
        createVNode(resolveComponent("a-button"), {
          "onClick": function onClick(e) {
            _this4.$emit('cancel', e);
          }
        }, {
          default: function _default() {
            return [_this4.cancelText];
          }
        }), // @ts-ignore
        createVNode(resolveComponent("a-button"), {
          "onClick": function onClick(e) {
            _this4.$emit('ok', e);
          },
          "type": 'primary',
          "style": {
            marginLeft: '8px'
          }
        }, {
          default: function _default() {
            return [_this4.okText];
          }
        })]);
      }
    }
  }]);

  return DForm;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "okCancel", [_dec2], {
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