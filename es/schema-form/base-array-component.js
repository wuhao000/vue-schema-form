import _mergeJSXProps2 from "@vue/babel-helper-vue-jsx-merge-props";
import _regeneratorRuntime from "/Users/wuhao/IdeaProjects/github/vue-schema-form/node_modules/@babel/runtime/regenerator";
import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _temp;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

import Vue from 'vue';
import Component from 'vue-class-component';
import { Inject, Prop, Watch } from 'vue-property-decorator';
import { SCHEMA_FORM_STORE_INJECT_KEY } from "./form";
import { ASchemaForm, getButtonComponent, getColComponent, getRowComponent, isNull, MOBILE } from "./utils/utils";
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
}), _dec9 = Inject(SCHEMA_FORM_STORE_INJECT_KEY), _dec10 = Watch('value'), _dec11 = Watch('current'), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Vue) {
  _inherits(BaseArrayComponent, _Vue);

  var _super = _createSuper(BaseArrayComponent);

  function BaseArrayComponent() {
    var _this;

    _classCallCheck(this, BaseArrayComponent);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _initializerDefineProperty(_this, "value", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "cellSpan", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "addBtnText", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "addBtnProps", _descriptor4, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "maxLength", _descriptor5, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "component", _descriptor6, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "disabled", _descriptor7, _assertThisInitialized(_this));

    _this.current = isNull(_this.value) ? [] : _this.value;

    _initializerDefineProperty(_this, "store", _descriptor8, _assertThisInitialized(_this));

    return _this;
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
      var _this$addBtnProps;

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

      var button = h(ButtonComponent, _mergeJSXProps([{
        "on": {
          "click": this.onAddClick
        },
        "attrs": {
          "disabled": this.disabled,
          "icon": "plus"
        },
        "style": buttonStyle
      }, {
        "attrs": _extends({}, this.addBtnProps)
      }]), [this.addBtnText || '添加']);

      if (this.component === ASchemaForm) {
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
      this.current.push(null);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var h = arguments[0];
      var InputComponent = this.component;
      var RowComponent = getRowComponent();
      var ColComponent = getColComponent();
      var content = [this.current.map(function (v, index) {
        var input = h(InputComponent, _mergeJSXProps2([{}, {
          "attrs": _extends({
            arrayIndex: index
          }, _this2.$attrs)
        }, {
          "on": {
            "remove": /*#__PURE__*/function () {
              var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(index) {
                return _regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return _this2.$mconfirm('确定删除此项吗?', '提示');

                      case 2:
                        _this2.current.splice(index, 1);

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
            }()
          },
          "model": {
            value: _this2.current[index],
            callback: function callback($$v) {
              _this2.$set(_this2.current, index, $$v);
            }
          }
        }]));

        if (_this2.component === ASchemaForm) {
          return input;
        }

        return h(ColComponent, {
          "attrs": {
            "span": _this2.cellSpan
          }
        }, [input]);
      }), this.renderAddButton()];

      if (this.component === ASchemaForm) {
        return h("div", [content]);
      }

      if (this.store.platform === MOBILE) {
        return content;
      } else {
        return h(RowComponent, {
          "attrs": {
            "gutter": this.$attrs.gutter || 20,
            "type": "flex"
          }
        }, [content]);
      }
    }
  }]);

  return BaseArrayComponent;
}(Vue), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "value", [_dec2], {
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