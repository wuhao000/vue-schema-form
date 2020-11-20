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

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8;

import { createVNode, createTextVNode } from "vue";
import { clone, isEqual } from '../uform/utils';
import Component, { mixins } from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import { DESKTOP, getButtonComponent, getFormComponent, getRowComponent, MOBILE } from '../utils/utils';
import FieldBasedComponent from './field-based-component';
import { getComponentType, getRealFields } from './utils';
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
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_mixins) {
  _inherits(InternalForm, _mixins);

  function InternalForm() {
    var _getPrototypeOf2;

    var _temp, _this;

    _classCallCheck(this, InternalForm);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(InternalForm)).call.apply(_getPrototypeOf2, [this].concat(args))), _initializerDefineProperty(_this, "title", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "arrayIndex", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "pathPrefix", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "definition", _descriptor4, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "schemaPath", _descriptor5, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "inline", _descriptor6, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "layoutType", _descriptor7, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "layoutProps", _descriptor8, _assertThisInitialized(_this)), _temp));
  }

  _createClass(InternalForm, [{
    key: "currentValueChanged",
    value: function currentValueChanged(currentValue, old) {
      this.$emit('input', currentValue);
      this.$emit('change', currentValue);
    }
  }, {
    key: "valueChanged",
    value: function valueChanged(value) {
      if (!isEqual(value, this.currentValue)) {
        if (this.definition.array) {
          this.currentValue = clone(value) || [];
        } else {
          this.currentValue = clone(value) || {};
        }
      } else if (!value) {
        this.currentValue = {};
      }
    }
  }, {
    key: "created",
    value: function created() {
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
    }
  }, {
    key: "renderTitle",
    value: function renderTitle() {
      var h = this.$createElement;

      if (this.$slots.title) {
        return this.$slots.title;
      } else if (this.store.props && this.title) {
        return createVNode("h2", {
          "class": "form-title"
        }, [this.title]);
      }
    }
  }, {
    key: "getGroups",
    value: function getGroups(currentValue) {
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
    }
  }, {
    key: "renderSingleFields",
    value: function renderSingleFields(currentValue) {
      var _this3 = this;

      var h = this.$createElement;
      var FormComponent = getFormComponent(this.store.platform);
      var groups = this.getGroups(currentValue);
      var formProps = this.getFormProps();
      var form = createVNode(FormComponent, {
        "attrs": formProps,
        "ref": "form",
        "nativeOn": {
          submit: function submit(e) {
            e.preventDefault();
          }
        },
        "on": this.$listeners
      }, {
        default: function _default() {
          return [_this3.definition.array ? _this3.renderTitle() : null, !_this3.definition.array && _this3.isDesktop ? _this3.renderTitle() : null, _this3.inline ? groups.reduce(function (a, b) {
            return a.concat(b);
          }) : groups.map(function (group) {
            return _this3.wrapGroup(group);
          })];
        }
      });

      if (this.layoutType) {
        // @ts-ignore
        var LayoutComponentDef = getComponentType(this.store, {
          type: this.layoutType,
          props: this.layoutProps
        }); // @ts-ignore

        return createVNode(LayoutComponentDef.component, {
          "props": this.layoutProps
        }, {
          default: function _default() {
            return [form];
          }
        });
      }

      return form;
    }
  }, {
    key: "renderAddFormButton",
    value: function renderAddFormButton() {
      var _this4 = this;

      var h = this.$createElement;
      var ButtonComponent = getButtonComponent();

      if (this.definition.array && this.store.editable) {
        return createVNode(ButtonComponent, {
          "attrs": {
            block: true,
            icon: 'plus',
            disabled: this.isDisabled
          },
          "class": "m-b",
          "onClick": function onClick() {
            _this4.addSubItem();
          }
        }, {
          default: function _default() {
            return [createTextVNode("\u65B0\u589E\u4E00\u6761")];
          }
        });
      }
    }
  }, {
    key: "addSubItem",
    value: function addSubItem() {
      this.currentValue.push({});
    }
  }, {
    key: "wrapGroup",
    value: function wrapGroup(group) {
      var h = this.$createElement;
      var RowComponent = getRowComponent();
      var props = this.store.props;

      if (this.isMobile || group.length === 1) {
        return group;
      }

      return createVNode(RowComponent, {
        "gutter": props && props.gutter || 0
      }, {
        default: function _default() {
          return [group];
        }
      });
    }
  }, {
    key: "getFormProps",
    value: function getFormProps() {
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
    }
  }, {
    key: "render",
    value: function render() {
      var h = arguments[0];
      return createVNode("div", null, [this.renderSingleFields(this.currentValue), this.renderAddFormButton()]);
    }
  }, {
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
}(mixins(FieldBasedComponent)), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "title", [_dec2], {
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