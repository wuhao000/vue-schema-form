import _mergeJSXProps3 from "@vue/babel-helper-vue-jsx-merge-props";
import _mergeJSXProps2 from "@vue/babel-helper-vue-jsx-merge-props";
import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _temp;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

import { clone, isEqual } from "../uform/utils";
import Component, { mixins } from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import { DESKTOP, getButtonComponent, getFormComponent, getRowComponent, MOBILE } from "../utils/utils";
import FieldBasedComponent from "./field-based-component";
import { getComponentType, getRealFields } from "./utils";
var InternalForm = (_dec = Component({
  inheritAttrs: false,
  name: 'InternalForm'
}), _dec2 = Prop([Object, String]), _dec3 = Prop([Number]), _dec4 = Prop([Array]), _dec5 = Prop({
  type: Object,
  required: true
}), _dec6 = Prop(Array), _dec7 = Prop({
  type: Boolean,
  default: false
}), _dec8 = Prop([String, Object]), _dec9 = Prop(Object), _dec10 = Watch('currentValue', {
  deep: true
}), _dec11 = Watch('value', {
  immediate: true,
  deep: true
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_mixins) {
  _inheritsLoose(InternalForm, _mixins);

  function InternalForm() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _mixins.call.apply(_mixins, [this].concat(args)) || this;

    _initializerDefineProperty(_assertThisInitialized(_this), "title", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_assertThisInitialized(_this), "arrayIndex", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_assertThisInitialized(_this), "pathPrefix", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_assertThisInitialized(_this), "definition", _descriptor4, _assertThisInitialized(_this));

    _initializerDefineProperty(_assertThisInitialized(_this), "schemaPath", _descriptor5, _assertThisInitialized(_this));

    _initializerDefineProperty(_assertThisInitialized(_this), "inline", _descriptor6, _assertThisInitialized(_this));

    _initializerDefineProperty(_assertThisInitialized(_this), "layoutType", _descriptor7, _assertThisInitialized(_this));

    _initializerDefineProperty(_assertThisInitialized(_this), "layoutProps", _descriptor8, _assertThisInitialized(_this));

    return _this;
  }

  var _proto = InternalForm.prototype;

  _proto.currentValueChanged = function currentValueChanged(currentValue, old) {
    this.$emit('input', currentValue);
    this.$emit('change', currentValue);
  };

  _proto.valueChanged = function valueChanged(value) {
    if (!isEqual(value, this.currentValue)) {
      if (this.definition.array) {
        this.currentValue = clone(value) || [];
      } else {
        this.currentValue = clone(value) || {};
      }
    } else if (!value) {
      this.currentValue = {};
    }
  };

  _proto.created = function created() {
    if (this.value) {
      if (this.definition.array) {
        if (this.value.length) {
          this.currentValue = clone(this.value);
        } else {
          this.currentValue = [{}];
        }
      } else {
        this.currentValue = clone(this.value);
      }
    } else {
      this.currentValue = this.definition.array ? [{}] : {};
    }
  };

  _proto.renderTitle = function renderTitle() {
    var h = this.$createElement;

    if (this.$slots.title) {
      return this.$slots.title;
    } else if (this.store.props && this.title) {
      return h("h2", {
        "class": "form-title"
      }, [this.title]);
    }
  };

  _proto.getGroups = function getGroups(currentValue) {
    var _this2 = this;

    if (!this.definition.fields) {
      return [];
    }

    var groups = [];
    var spanGroups = [];
    var lastHasSpan = false;
    getRealFields(this.definition.fields).forEach(function (field, index) {
      var vnode = _this2.renderField(field, currentValue, index, true);

      if (field.span) {
        if (lastHasSpan) {
          spanGroups[spanGroups.length - 1].push(field.span);
          groups[groups.length - 1].push(vnode);
        } else {
          spanGroups.push([field.span]);
          groups.push([vnode]);
        }

        lastHasSpan = true;
      } else {
        lastHasSpan = false;
        spanGroups.push([]);
        groups.push([vnode]);
      }
    });
    return groups;
  };

  _proto.renderSingleFields = function renderSingleFields(currentValue) {
    var _this3 = this;

    var h = this.$createElement;
    var FormComponent = getFormComponent(this.store.platform);
    var groups = this.getGroups(currentValue);
    var formProps = this.getFormProps();
    var form = h(FormComponent, _mergeJSXProps([{}, {
      "attrs": formProps
    }, {
      "ref": "form"
    }, {
      "nativeOn": {
        submit: function submit(e) {
          e.preventDefault();
        }
      }
    }, {}, {
      "on": this.$listeners
    }]), [this.definition.array ? this.renderTitle() : null, !this.definition.array && this.isDesktop ? this.renderTitle() : null, this.inline ? groups.reduce(function (a, b) {
      return a.concat(b);
    }) : groups.map(function (group) {
      return _this3.wrapGroup(group);
    })]);

    if (this.layoutType) {
      // @ts-ignore
      var LayoutComponentDef = getComponentType(this.store, {
        type: this.layoutType,
        props: this.layoutProps
      }); // @ts-ignore

      return h(LayoutComponentDef.component, _mergeJSXProps2([{}, {
        "props": this.layoutProps
      }]), [form]);
    }

    return form;
  };

  _proto.renderAddFormButton = function renderAddFormButton() {
    var _this4 = this;

    var h = this.$createElement;
    var ButtonComponent = getButtonComponent();

    if (this.definition.array && this.store.editable) {
      return h(ButtonComponent, _mergeJSXProps3([{}, {
        "attrs": {
          block: true,
          icon: 'plus',
          disabled: this.isDisabled
        }
      }, {
        "class": "m-b",
        "on": {
          "click": function click() {
            _this4.addSubItem();
          }
        }
      }]), ["\u65B0\u589E\u4E00\u6761"]);
    }
  };

  _proto.addSubItem = function addSubItem() {
    this.currentValue.push({});
  };

  _proto.wrapGroup = function wrapGroup(group) {
    var h = this.$createElement;
    var RowComponent = getRowComponent();
    var props = this.store.props;

    if (this.isMobile || group.length === 1) {
      return group;
    }

    return h(RowComponent, {
      "attrs": {
        "gutter": props && props.gutter || 0
      }
    }, [group]);
  };

  _proto.getFormProps = function getFormProps() {
    var formProps = _extends({
      labelWidth: this.$attrs.labelWidth,
      labelCol: this.$attrs.labelCol,
      wrapperCol: this.$attrs.wrapperCol
    }, this.store.props, this.$attrs);

    if (this.isMobile) {
      formProps.title = this.$slots.title || this.title;
    }

    formProps.inline = this.inline;
    formProps.disabled = this.isFormDisabled;
    return formProps;
  };

  _proto.render = function render() {
    var h = arguments[0];
    return h("div", [this.renderSingleFields(this.currentValue), this.renderAddFormButton()]);
  };

  _createClass(InternalForm, [{
    key: "form",
    get: function get() {
      return this.$refs.form;
    }
  }, {
    key: "isMobile",
    get: function get() {
      return this.store.platform === MOBILE;
    }
  }, {
    key: "isDesktop",
    get: function get() {
      return this.store.platform === DESKTOP;
    }
  }, {
    key: "isFormDisabled",
    get: function get() {
      return this.isDisabled || this.isLoading;
    }
  }, {
    key: "isDisabled",
    get: function get() {
      return this.store.disabled;
    }
  }, {
    key: "isLoading",
    get: function get() {
      return this.store.loading;
    }
  }, {
    key: "isReadonly",
    get: function get() {
      return this.store.readonly;
    }
  }]);

  return InternalForm;
}(mixins(FieldBasedComponent)), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "title", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "arrayIndex", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "pathPrefix", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "definition", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "schemaPath", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "inline", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "layoutType", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "layoutProps", [_dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "currentValueChanged", [_dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "currentValueChanged"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "valueChanged", [_dec11], Object.getOwnPropertyDescriptor(_class2.prototype, "valueChanged"), _class2.prototype)), _class2)) || _class);
export default InternalForm;