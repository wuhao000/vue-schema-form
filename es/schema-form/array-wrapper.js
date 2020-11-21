import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _temp;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

import { SCHEMA_FORM_STORE_INJECT_KEY } from "./form";
import Vue from 'vue';
import Component from 'vue-class-component';
import { Inject, Prop } from 'vue-property-decorator';
import { getButtonComponent, getColComponent, getRowComponent, LibComponents, MOBILE } from "./utils/utils";
var ArrayWrapper = (_dec = Component({
  name: 'ArrayWrapper'
}), _dec2 = Prop({
  type: Number,
  default: 24
}), _dec3 = Prop(String), _dec4 = Prop(Object), _dec5 = Prop({
  type: Number,
  default: 20
}), _dec6 = Prop({
  type: Boolean,
  default: true
}), _dec7 = Prop({
  type: Boolean,
  default: true
}), _dec8 = Prop({
  type: Number,
  default: 0
}), _dec9 = Prop({
  type: Boolean,
  default: false
}), _dec10 = Inject(SCHEMA_FORM_STORE_INJECT_KEY), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Vue) {
  _inheritsLoose(ArrayWrapper, _Vue);

  function ArrayWrapper() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Vue.call.apply(_Vue, [this].concat(args)) || this;

    _initializerDefineProperty(_assertThisInitialized(_this), "cellSpan", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_assertThisInitialized(_this), "addBtnText", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_assertThisInitialized(_this), "addBtnProps", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_assertThisInitialized(_this), "gutter", _descriptor4, _assertThisInitialized(_this));

    _initializerDefineProperty(_assertThisInitialized(_this), "showRemoveBtn", _descriptor5, _assertThisInitialized(_this));

    _initializerDefineProperty(_assertThisInitialized(_this), "showAddBtn", _descriptor6, _assertThisInitialized(_this));

    _initializerDefineProperty(_assertThisInitialized(_this), "maxLength", _descriptor7, _assertThisInitialized(_this));

    _initializerDefineProperty(_assertThisInitialized(_this), "subForm", _descriptor8, _assertThisInitialized(_this));

    _initializerDefineProperty(_assertThisInitialized(_this), "store", _descriptor9, _assertThisInitialized(_this));

    return _this;
  }

  var _proto = ArrayWrapper.prototype;

  _proto.renderAddButton = function renderAddButton() {
    var _this$addBtnProps;

    var h = this.$createElement;

    if (!this.store.editable || !this.showAddBtn || this.maxLength > 0 && this.$slots.default && this.$slots.default.length >= this.maxLength) {
      return;
    }

    var ColComponent = getColComponent();
    var ButtonComponent = getButtonComponent();

    if (this.store.platform === 'mobile') {
      ButtonComponent = 'm-button';
    }

    var buttonStyle = {};

    if ((_this$addBtnProps = this.addBtnProps) === null || _this$addBtnProps === void 0 ? void 0 : _this$addBtnProps.block) {
      buttonStyle.width = '100%';
    }

    var props = _extends({}, this.addBtnProps);

    props.disabled = this.store && (this.store.disabled || this.store.loading) || props.disabled;

    if (!props.icon) {
      props.icon = 'plus';
    }

    var button = h(ButtonComponent, _mergeJSXProps([{
      "on": {
        "click": this.onAddClick
      },
      "style": buttonStyle
    }, {
      "attrs": props
    }]), [this.addBtnText || '添加']);

    if (this.subForm) {
      return h("div", {
        "style": {
          margin: '10px 15px'
        }
      }, [button]);
    }

    return h(ColComponent, {
      "attrs": {
        "span": this.cellSpan
      }
    }, [button]);
  };

  _proto.onAddClick = function onAddClick() {
    this.$emit('add');
  };

  _proto.render = function render() {
    var h = arguments[0];
    var RowComponent = getRowComponent();
    var content = [this.renderFields(), this.renderAddButton()];

    if (this.subForm) {
      return h("div", [content]);
    }

    if (this.$attrs.platform === 'mobile') {
      return content;
    } else {
      return h(RowComponent, {
        "attrs": {
          "gutter": this.gutter,
          "type": "flex"
        }
      }, [content]);
    }
  };

  _proto.renderFields = function renderFields() {
    var _this2 = this;

    var h = this.$createElement;

    if (this.store.platform === MOBILE) {
      return this.$slots.default && this.$slots.default.map(function (it, index) {
        return h("div", {
          "style": {
            position: 'relative'
          }
        }, [[_this2.renderDeleteBtn(index), it]]);
      });
    }

    return this.$slots.default && this.$slots.default.map(function (it, index) {
      return h(LibComponents.col, {
        "attrs": {
          "span": _this2.cellSpan
        }
      }, [h(LibComponents.layout, [h(LibComponents.content, [it]), h(LibComponents.sider, [_this2.renderDesktopDeleteBtn(index)])])]);
    });
  };

  _proto.renderDeleteBtn = function renderDeleteBtn(index) {
    var _this3 = this;

    var h = this.$createElement;

    if (!this.store.editable || !this.showRemoveBtn) {
      return null;
    }

    return h("a", {
      "style": {
        color: '#e94721',
        position: 'absolute',
        right: 0,
        top: '15px',
        cursor: 'pointer'
      },
      "on": {
        "click": function click() {
          _this3.$emit('remove', index);
        }
      }
    }, [h(LibComponents.icon, {
      "attrs": {
        "type": "delete"
      }
    }), "\u5220\u9664"]);
  };

  _proto.renderDesktopDeleteBtn = function renderDesktopDeleteBtn(index) {
    var _this4 = this;

    var h = this.$createElement;

    if (!this.store.editable || !this.showRemoveBtn) {
      return null;
    }

    return h("div", {
      "style": {
        textAlign: 'right'
      },
      "class": "d-image-picker"
    }, [h("a", {
      "style": {
        color: '#e94721',
        cursor: 'pointer'
      },
      "on": {
        "click": function click() {
          _this4.$emit('remove', index);
        }
      }
    }, [h(LibComponents.icon, {
      "attrs": {
        "type": "delete"
      }
    }), "\u5220\u9664"])]);
  };

  return ArrayWrapper;
}(Vue), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "cellSpan", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "addBtnText", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "addBtnProps", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "gutter", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "showRemoveBtn", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "showAddBtn", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "maxLength", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "subForm", [_dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "store", [_dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { ArrayWrapper as default };