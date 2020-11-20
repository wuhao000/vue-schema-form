import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
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

import { createVNode } from "vue";
import Component from 'vue-class-component';
import { Inject, Prop, Watch } from 'vue-property-decorator';
import { SCHEMA_FORM_STORE_INJECT_KEY } from './form';
import { ASchemaForm, getButtonComponent, getColComponent, getRowComponent, isNull, MOBILE } from './utils/utils';
var BaseArrayComponent = (_dec = Component({
  name: 'BaseArrayComponent'
}), _dec2 = Prop(Array), _dec3 = Prop({
  type: Number,
  default: 12
}), _dec4 = Prop(String), _dec5 = Prop(Object), _dec6 = Prop({
  type: Number,
  default: 0
}), _dec7 = Prop(String), _dec8 = Prop({
  type: Boolean,
  default: false
}), _dec9 = Inject(SCHEMA_FORM_STORE_INJECT_KEY), _dec10 = Watch('value'), _dec11 = Watch('current'), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inherits(BaseArrayComponent, _Vue);

  function BaseArrayComponent() {
    var _getPrototypeOf2;

    var _temp, _this;

    _classCallCheck(this, BaseArrayComponent);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(BaseArrayComponent)).call.apply(_getPrototypeOf2, [this].concat(args))), _initializerDefineProperty(_this, "value", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "cellSpan", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "addBtnText", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "addBtnProps", _descriptor4, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "maxLength", _descriptor5, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "component", _descriptor6, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "disabled", _descriptor7, _assertThisInitialized(_this)), _this.current = isNull(_this.value) ? [] : _this.value, _initializerDefineProperty(_this, "store", _descriptor8, _assertThisInitialized(_this)), _temp));
  }

  _createClass(BaseArrayComponent, [{
    key: "valueChanged",
    value: function valueChanged(value) {
      this.current = value || [];
    }
  }, {
    key: "currentChanged",
    value: function currentChanged(current) {
      this.$emit('input', current);
      this.$emit('change', current);
    }
  }, {
    key: "validate",
    value: function validate() {
      return true;
    }
  }, {
    key: "renderAddButton",
    value: function renderAddButton() {
      var _this$addBtnProps,
          _this2 = this;

      var h = this.$createElement;

      if (!this.store.editable) {
        return null;
      }

      var ColComponent = getColComponent();
      var ButtonComponent = getButtonComponent();

      if (this.maxLength > 0 && this.current.length >= this.maxLength) {
        return null;
      }

      if (this.store.platform === MOBILE) {
        ButtonComponent = 'm-button';
      }

      var buttonStyle = {};

      if ((_this$addBtnProps = this.addBtnProps) === null || _this$addBtnProps === void 0 ? void 0 : _this$addBtnProps.block) {
        buttonStyle.width = '100%';
      }

      var button = createVNode(ButtonComponent, {
        "onClick": this.onAddClick,
        "disabled": this.disabled,
        "style": buttonStyle,
        "icon": "plus",
        "attrs": _extends({}, this.addBtnProps)
      }, {
        default: function _default() {
          return [_this2.addBtnText || '添加'];
        }
      });

      if (this.component === ASchemaForm) {
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
      this.current.push(null);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var h = arguments[0];
      var InputComponent = this.component;
      var RowComponent = getRowComponent();
      var ColComponent = getColComponent();
      var content = [this.current.map(function (v, index) {
        var input = createVNode(InputComponent, {
          "attrs": _extends({
            arrayIndex: index
          }, _this3.$attrs),
          "onRemove":
          /*#__PURE__*/
          function () {
            var _ref = _asyncToGenerator(
            /*#__PURE__*/
            _regeneratorRuntime.mark(function _callee(index) {
              return _regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return _this3.$mconfirm('确定删除此项吗?', '提示');

                    case 2:
                      _this3.current.splice(index, 1);

                    case 3:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee);
            }));

            return function (_x) {
              return _ref.apply(this, arguments);
            };
          }(),
          "model": {
            value: _this3.current[index],
            callback: function callback($$v) {
              _this3.$set(_this3.current, index, $$v);
            }
          }
        }, null);

        if (_this3.component === ASchemaForm) {
          return input;
        }

        return createVNode(ColComponent, {
          "span": _this3.cellSpan
        }, {
          default: function _default() {
            return [input];
          }
        });
      }), this.renderAddButton()];

      if (this.component === ASchemaForm) {
        return createVNode("div", null, [content]);
      }

      if (this.store.platform === MOBILE) {
        return content;
      } else {
        return createVNode(RowComponent, {
          "gutter": this.$attrs.gutter || 20,
          "type": "flex"
        }, {
          default: function _default() {
            return [content];
          }
        });
      }
    }
  }]);

  return BaseArrayComponent;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "value", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "cellSpan", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "addBtnText", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "addBtnProps", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "maxLength", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "component", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "disabled", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "store", [_dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "valueChanged", [_dec10], Object.getOwnPropertyDescriptor(_class2.prototype, "valueChanged"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "currentChanged", [_dec11], Object.getOwnPropertyDescriptor(_class2.prototype, "currentChanged"), _class2.prototype)), _class2)) || _class);
export { BaseArrayComponent as default };