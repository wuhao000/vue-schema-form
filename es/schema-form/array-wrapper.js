import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _temp;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

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
  _inherits(ArrayWrapper, _Vue);

  var _super = _createSuper(ArrayWrapper);

  function ArrayWrapper() {
    var _this;

    _classCallCheck(this, ArrayWrapper);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _initializerDefineProperty(_this, "cellSpan", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "addBtnText", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "addBtnProps", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "gutter", _descriptor4, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "showRemoveBtn", _descriptor5, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "showAddBtn", _descriptor6, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "maxLength", _descriptor7, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "subForm", _descriptor8, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "store", _descriptor9, _assertThisInitialized(_this));

    return _this;
  }

  _createClass(ArrayWrapper, [{
    key: "renderAddButton",
    value: function renderAddButton() {
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

      if (this.addBtnProps?.block) {
        buttonStyle.width = '100%';
      }

      var props = Object.assign({}, this.addBtnProps);
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
    }
  }, {
    key: "onAddClick",
    value: function onAddClick() {
      this.$emit('add');
    }
  }, {
    key: "render",
    value: function render() {
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
    }
  }, {
    key: "renderFields",
    value: function renderFields() {
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
    }
  }, {
    key: "renderDeleteBtn",
    value: function renderDeleteBtn(index) {
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
    }
  }, {
    key: "renderDesktopDeleteBtn",
    value: function renderDesktopDeleteBtn(index) {
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
    }
  }]);

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