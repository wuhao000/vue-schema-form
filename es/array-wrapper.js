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

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9;

import { createVNode, createTextVNode } from "vue";
import { SCHEMA_FORM_STORE_INJECT_KEY } from './form';
import Component from 'vue-class-component';
import { Inject, Prop } from 'vue-property-decorator';
import { getButtonComponent, getColComponent, getRowComponent, LibComponents, MOBILE } from './utils/utils';
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
}), _dec10 = Inject(SCHEMA_FORM_STORE_INJECT_KEY), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inherits(ArrayWrapper, _Vue);

  function ArrayWrapper() {
    var _getPrototypeOf2;

    var _temp, _this;

    _classCallCheck(this, ArrayWrapper);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ArrayWrapper)).call.apply(_getPrototypeOf2, [this].concat(args))), _initializerDefineProperty(_this, "cellSpan", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "addBtnText", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "addBtnProps", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "gutter", _descriptor4, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "showRemoveBtn", _descriptor5, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "showAddBtn", _descriptor6, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "maxLength", _descriptor7, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "subForm", _descriptor8, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "store", _descriptor9, _assertThisInitialized(_this)), _temp));
  }

  _createClass(ArrayWrapper, [{
    key: "renderAddButton",
    value: function renderAddButton() {
      var _this$addBtnProps,
          _this2 = this;

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

      var button = createVNode(ButtonComponent, {
        "onClick": this.onAddClick,
        "style": buttonStyle,
        "attrs": props
      }, {
        default: function _default() {
          return [_this2.addBtnText || '添加'];
        }
      });

      if (this.subForm) {
        return createVNode("div", {
          "style": {
            margin: '10px 15px'
          }
        }, [button]);
      }

      return createVNode(ColComponent, {
        "span": this.cellSpan
      }, {
        default: function _default() {
          return [button];
        }
      });
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
        return createVNode("div", null, [content]);
      }

      if (this.$attrs.platform === 'mobile') {
        return content;
      } else {
        return createVNode(RowComponent, {
          "gutter": this.gutter,
          "type": "flex"
        }, {
          default: function _default() {
            return [content];
          }
        });
      }
    }
  }, {
    key: "renderFields",
    value: function renderFields() {
      var _this3 = this;

      var h = this.$createElement;

      if (this.store.platform === MOBILE) {
        return this.$slots.default && this.$slots.default.map(function (it, index) {
          return createVNode("div", {
            "style": {
              position: 'relative'
            }
          }, [[_this3.renderDeleteBtn(index), it]]);
        });
      }

      return this.$slots.default && this.$slots.default.map(function (it, index) {
        return createVNode(LibComponents.col, {
          "span": _this3.cellSpan
        }, {
          default: function _default() {
            return [createVNode(LibComponents.layout, null, {
              default: function _default() {
                return [createVNode(LibComponents.content, null, {
                  default: function _default() {
                    return [it];
                  }
                }), createVNode(LibComponents.sider, null, {
                  default: function _default() {
                    return [_this3.renderDesktopDeleteBtn(index)];
                  }
                })];
              }
            })];
          }
        });
      });
    }
  }, {
    key: "renderDeleteBtn",
    value: function renderDeleteBtn(index) {
      var _this4 = this;

      var h = this.$createElement;

      if (!this.store.editable || !this.showRemoveBtn) {
        return null;
      }

      return createVNode("a", {
        "style": {
          color: '#e94721',
          position: 'absolute',
          right: 0,
          top: '15px',
          cursor: 'pointer'
        },
        "onclick": function onclick() {
          _this4.$emit('remove', index);
        }
      }, [createVNode(LibComponents.icon, {
        "type": "delete"
      }, null), createTextVNode("\u5220\u9664")]);
    }
  }, {
    key: "renderDesktopDeleteBtn",
    value: function renderDesktopDeleteBtn(index) {
      var _this5 = this;

      var h = this.$createElement;

      if (!this.store.editable || !this.showRemoveBtn) {
        return null;
      }

      return createVNode("div", {
        "style": {
          textAlign: 'right'
        },
        "class": "d-image-picker"
      }, [createVNode("a", {
        "style": {
          color: '#e94721',
          cursor: 'pointer'
        },
        "onclick": function onclick() {
          _this5.$emit('remove', index);
        }
      }, [createVNode(LibComponents.icon, {
        "type": "delete"
      }, null), createTextVNode("\u5220\u9664")])]);
    }
  }]);

  return ArrayWrapper;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "cellSpan", [_dec2], {
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