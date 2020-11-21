import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _class3, _temp;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

import AsyncValidator from 'async-validator';
import debounce from 'lodash.debounce';
import Component, { mixins } from 'vue-class-component';
import { Inject, Prop, Provide } from 'vue-property-decorator';
import Emitter from "../mixins/emitter";
import { getPropByPath, noop } from "./utils";
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
}), _dec12 = Prop({}), _dec(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_mixins) {
  _inheritsLoose(DFormItem, _mixins);

  function DFormItem() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _mixins.call.apply(_mixins, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "control", null);

    _defineProperty(_assertThisInitialized(_this), "currentHelp", '');

    _defineProperty(_assertThisInitialized(_this), "currentValidateStatus", '');

    _initializerDefineProperty(_assertThisInitialized(_this), "form", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_assertThisInitialized(_this), "formItem", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_assertThisInitialized(_this), "hasFeedback", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_assertThisInitialized(_this), "help", _descriptor4, _assertThisInitialized(_this));

    _initializerDefineProperty(_assertThisInitialized(_this), "label", _descriptor5, _assertThisInitialized(_this));

    _initializerDefineProperty(_assertThisInitialized(_this), "labelWidth", _descriptor6, _assertThisInitialized(_this));

    _initializerDefineProperty(_assertThisInitialized(_this), "prop", _descriptor7, _assertThisInitialized(_this));

    _initializerDefineProperty(_assertThisInitialized(_this), "required", _descriptor8, _assertThisInitialized(_this));

    _initializerDefineProperty(_assertThisInitialized(_this), "rules", _descriptor9, _assertThisInitialized(_this));

    _defineProperty(_assertThisInitialized(_this), "validateDisabled", true);

    _initializerDefineProperty(_assertThisInitialized(_this), "validateStatus", _descriptor10, _assertThisInitialized(_this));

    _initializerDefineProperty(_assertThisInitialized(_this), "value", _descriptor11, _assertThisInitialized(_this));

    return _this;
  }

  var _proto = DFormItem.prototype;

  _proto.beforeDestroy = function beforeDestroy() {
    if (this.prop) {
      this.dispatch('DForm', 'd.form.removeField', [this]);
    }
  };

  _proto.created = function created() {
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
  };

  _proto.focus = function focus() {
    if (this.control && this.control.focus.bind(this.control).bind(this.control).bind(this.control).bind(this.control).bind(this.control)) {
      this.control.focus();
    }
  };

  _proto.getFilteredRule = function getFilteredRule(trigger) {
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
  };

  _proto.getRules = function getRules() {
    var formRules = this.form && this.form.rules;
    var selfRules = this.rules;
    var requiredRule = this.required !== undefined ? {
      required: this.required
    } : [];
    var prop = getPropByPath(formRules, this.prop || '');
    formRules = formRules ? prop.o[this.prop || ''] || prop.v : [];
    return [].concat(selfRules || formRules || []).concat(requiredRule);
  };

  _proto.onFieldBlur = function onFieldBlur() {
    this.validate('blur');
  };

  _proto.onFieldChange = function onFieldChange() {
    if (this.validateDisabled) {
      this.validateDisabled = false;
      return;
    }

    this.validate('change');
  };

  _proto.render = function render() {
    var h = arguments[0];

    var props = _extends({}, this.$props);

    if (this.$slots.label) {
      props.label = this.$slots.label;
    }

    props.help = this.help || this.currentHelp;
    props.labelCol = this.labelCol;
    props.validateStatus = this.validateStatus || this.currentValidateStatus;
    props.wrapperCol = this.wrapperCol;
    return h("a-form-item", _mergeJSXProps([{}, {
      "props": props
    }, {}, {
      "attrs": this.$attrs
    }]), [this.$slots.default]);
  };

  _proto.validate = function validate(trigger, callback) {
    var _this3 = this;

    if (callback === void 0) {
      callback = noop;
    }

    this.$nextTick(function () {
      var _model;

      _this3.validateDisabled = false;

      var rules = _this3.getFilteredRule(trigger);

      if ((!rules || rules.length === 0) && _this3.required === undefined) {
        callback();
        return true;
      }

      _this3.currentValidateStatus = 'validating';
      var descriptor = {};

      if (rules && rules.length > 0) {
        rules.forEach(function (rule) {
          delete rule.trigger;
        });
      }

      descriptor[_this3.prop] = rules;
      var validator = new AsyncValidator(descriptor);
      var model = (_model = {}, _model[_this3.prop] = _this3.fieldValue, _model);
      validator.validate(model, {
        firstFields: true
      }, function (errors, invalidFields) {
        _this3.currentValidateStatus = !errors ? 'success' : 'error';
        _this3.currentHelp = errors ? errors[0].message : '';
        callback(_this3.currentHelp, invalidFields);

        _this3.$emit('validate', !errors, errors);

        _this3.form && _this3.form.$emit('validate', _this3.prop, !errors, _this3.currentHelp || null);
      });
    });
  };

  _createClass(DFormItem, [{
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
}(mixins(Emitter)), _defineProperty(_class3, "componentName", void 0), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "form", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "formItem", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return _extends({}, this.$props, this.$data, {
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