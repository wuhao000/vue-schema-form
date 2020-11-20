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

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11;

import { resolveComponent, createVNode } from "vue";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import AsyncValidator from 'async-validator';
import debounce from 'lodash.debounce';
import Component, { mixins } from 'vue-class-component';
import { Inject, Prop, Provide } from 'vue-property-decorator';
import Emitter from '../mixins/emitter';
import { getPropByPath, noop } from './utils';
var DFormItem = (_dec = Component({
  name: 'DFormItem'
}), _dec2 = Inject({
  from: 'form',
  default: function _default() {
    return undefined;
  }
}), _dec3 = Provide('formItem'), _dec4 = Prop({
  type: Boolean,
  default: false
}), _dec5 = Prop({
  type: String
}), _dec6 = Prop({
  type: String,
  default: ''
}), _dec7 = Prop({
  type: [String, Number]
}), _dec8 = Prop({
  type: String,
  default: ''
}), _dec9 = Prop({
  type: Boolean,
  default: false
}), _dec10 = Prop({
  type: [Object, Array]
}), _dec11 = Prop({
  type: String
}), _dec12 = Prop({}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_mixins) {
  _inherits(DFormItem, _mixins);

  function DFormItem() {
    var _getPrototypeOf2;

    var _temp, _this;

    _classCallCheck(this, DFormItem);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DFormItem)).call.apply(_getPrototypeOf2, [this].concat(args))), _this.control = null, _this.currentHelp = '', _this.currentValidateStatus = '', _initializerDefineProperty(_this, "form", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "formItem", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "hasFeedback", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "help", _descriptor4, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "label", _descriptor5, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "labelWidth", _descriptor6, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "prop", _descriptor7, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "required", _descriptor8, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "rules", _descriptor9, _assertThisInitialized(_this)), _this.validateDisabled = true, _initializerDefineProperty(_this, "validateStatus", _descriptor10, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "value", _descriptor11, _assertThisInitialized(_this)), _temp));
  }

  _createClass(DFormItem, [{
    key: "beforeDestroy",
    value: function beforeDestroy() {
      if (this.prop) {
        this.dispatch('DForm', 'd.form.removeField', [this]);
      }
    }
  }, {
    key: "created",
    value: function created() {
      var _this2 = this;

      if (this.prop) {
        this.dispatch('DForm', 'd.form.addField', [this]);
        this.$on('d.form-item.setControl', function (control) {
          _this2.control = control;
        });
        var rules = this.getRules();

        if (rules.length || this.required !== undefined) {
          this.$on('d.form.blur', this.onFieldBlur);
          this.$on('el.form.blur', this.onFieldBlur);
          this.$on('d.form.change', this.onFieldChange);
          this.$on('el.form.change', this.onFieldChange);
        }
      }

      this.validate = debounce(this.validate, 300);
    }
  }, {
    key: "focus",
    value: function focus() {
      if (this.control && this.control.focus.bind(this.control).bind(this.control).bind(this.control).bind(this.control).bind(this.control)) {
        this.control.focus();
      }
    }
  }, {
    key: "getFilteredRule",
    value: function getFilteredRule(trigger) {
      var rules = this.getRules();
      return rules.filter(function (rule) {
        if (!rule.trigger || trigger === '') {
          return true;
        }

        if (Array.isArray(rule.trigger)) {
          return rule.trigger.indexOf(trigger) > -1;
        } else {
          return rule.trigger === trigger;
        }
      }).map(function (rule) {
        return _extends({}, rule);
      });
    }
  }, {
    key: "getRules",
    value: function getRules() {
      var formRules = this.form && this.form.rules;
      var selfRules = this.rules;
      var requiredRule = this.required !== undefined ? {
        required: this.required
      } : [];
      var prop = getPropByPath(formRules, this.prop || '');
      formRules = formRules ? prop.o[this.prop || ''] || prop.v : [];
      return [].concat(selfRules || formRules || []).concat(requiredRule);
    }
  }, {
    key: "onFieldBlur",
    value: function onFieldBlur() {
      this.validate('blur');
    }
  }, {
    key: "onFieldChange",
    value: function onFieldChange() {
      if (this.validateDisabled) {
        this.validateDisabled = false;
        return;
      }

      this.validate('change');
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var h = arguments[0];

      var props = _extends({}, this.$props);

      if (this.$slots.label) {
        props.label = this.$slots.label;
      }

      props.help = this.help || this.currentHelp;
      props.labelCol = this.labelCol;
      props.validateStatus = this.validateStatus || this.currentValidateStatus;
      props.wrapperCol = this.wrapperCol;
      return createVNode(resolveComponent("a-form-item"), {
        "props": props,
        "attrs": this.$attrs
      }, {
        default: function _default() {
          return [_this3.$slots.default];
        }
      });
    }
  }, {
    key: "validate",
    value: function validate(trigger) {
      var _this4 = this;

      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
      this.$nextTick(function () {
        _this4.validateDisabled = false;

        var rules = _this4.getFilteredRule(trigger);

        if ((!rules || rules.length === 0) && _this4.required === undefined) {
          callback();
          return true;
        }

        _this4.currentValidateStatus = 'validating';
        var descriptor = {};

        if (rules && rules.length > 0) {
          rules.forEach(function (rule) {
            delete rule.trigger;
          });
        }

        descriptor[_this4.prop] = rules;
        var validator = new AsyncValidator(descriptor);

        var model = _defineProperty({}, _this4.prop, _this4.fieldValue);

        validator.validate(model, {
          firstFields: true
        }, function (errors, invalidFields) {
          _this4.currentValidateStatus = !errors ? 'success' : 'error';
          _this4.currentHelp = errors ? errors[0].message : '';
          callback(_this4.currentHelp, invalidFields);

          _this4.$emit('validate', !errors, errors);

          _this4.form && _this4.form.$emit('validate', _this4.prop, !errors, _this4.currentHelp || null);
        });
      });
    }
  }, {
    key: "fieldValue",
    get: function get() {
      if (this.value !== null && this.value !== undefined) {
        return this.value;
      }

      var model = this.form && this.form.model;

      if (!model || !this.prop) {
        return;
      }

      var path = this.prop;

      if (path.indexOf(':') !== -1) {
        path = path.replace(/:/, '.');
      }

      return getPropByPath(model, path, true).v;
    }
  }, {
    key: "isRequired",
    get: function get() {
      if (this.required) {
        return this.required;
      } else {
        return this.getRules().some(function (it) {
          return it.required;
        });
      }
    }
  }, {
    key: "labelCol",
    get: function get() {
      var labelCol = {};

      if (this.$attrs['label-col']) {
        labelCol = this.$attrs['label-col'];
      }

      if (this.form && this.form.labelCol) {
        if (typeof this.form.labelCol === 'number') {
          labelCol.span = this.form.labelCol;
        } else {
          labelCol = this.form.labelCol;
        }
      }

      labelCol.style = this.labelStyle;
      return labelCol;
    }
  }, {
    key: "labelStyle",
    get: function get() {
      var labelWidth = this.labelWidth ? this.labelWidth : this.form && this.form.labelWidth;
      var style = {};

      if (labelWidth) {
        style.width = typeof labelWidth === 'number' ? labelWidth + 'px' : labelWidth;
        style.float = 'left';
      }

      return style;
    }
  }, {
    key: "wrapperCol",
    get: function get() {
      var wrapperCol = {};

      if (this.$attrs['wrapper-col']) {
        wrapperCol = this.$attrs['wrapper-col'];
      }

      if (this.form && this.form.wrapperCol) {
        if (typeof this.form.wrapperCol === 'number') {
          wrapperCol.span = this.form.wrapperCol;
        } else {
          wrapperCol = this.form.wrapperCol;
        }
      } else if (this.form && this.form.labelCol) {
        if (typeof this.form.labelCol === 'number') {
          wrapperCol.span = 24 - this.form.labelCol;
        }
      }

      wrapperCol.style = this.wrapperStyle;
      return wrapperCol;
    }
  }, {
    key: "wrapperStyle",
    get: function get() {
      var labelWidth = this.labelWidth ? this.labelWidth : this.form && this.form.labelWidth;
      var style = {};

      if (labelWidth) {
        style.marginLeft = typeof labelWidth === 'number' ? labelWidth + 'px' : labelWidth;
      }

      return style;
    }
  }]);

  return DFormItem;
}(mixins(Emitter)), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "form", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "formItem", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _objectSpread({}, this.$props, {}, this.$data, {
      validate: this.validate
    });
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "hasFeedback", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "help", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "label", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "labelWidth", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "prop", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "required", [_dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "rules", [_dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "validateStatus", [_dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "value", [_dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { DFormItem as default };