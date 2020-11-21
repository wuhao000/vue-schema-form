import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";

var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp;

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

import { SCHEMA_FORM_STORE_INJECT_KEY } from "../form";
import Vue from 'vue';
import Component from 'vue-class-component';
import { Inject, Prop } from 'vue-property-decorator';
import { LibComponents } from "../utils/utils";
import "./form-block.less";
var FormBlock = (_dec = Component({
  name: 'FormBlock'
}), _dec2 = Prop({
  type: [String, Object],
  default: '添加'
}), _dec3 = Prop({
  type: [String, Object],
  default: '删除'
}), _dec4 = Prop(Number), _dec5 = Inject(SCHEMA_FORM_STORE_INJECT_KEY), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Vue) {
  _inherits(FormBlock, _Vue);

  var _super = _createSuper(FormBlock);

  function FormBlock() {
    var _this;

    _classCallCheck(this, FormBlock);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _initializerDefineProperty(_this, "addText", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "removeText", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "maxItems", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "store", _descriptor4, _assertThisInitialized(_this));

    return _this;
  }

  _createClass(FormBlock, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var h = arguments[0];
      var IconComponent = LibComponents.icon;
      return h("div", {
        "class": "array-form-block"
      }, [this.$slots.default ? this.$slots.default.map(function (it, index) {
        return h("div", {
          "class": "array-item",
          "key": 'item-' + index
        }, [h("div", {
          "class": "array-index"
        }, [h("span", [index + 1])]), h("div", {
          "class": "array-item-wrapper"
        }, [it]), _this2.createOperators(index, IconComponent), index === _this2.$slots.default.length - 1 ? _this2.renderAddBtn() : null]);
      }) : h("d-empty", _mergeJSXProps([{
        "attrs": {
          "description": ""
        }
      }, {
        "nativeOn": {
          click: function click() {
            _this2.$emit('add');
          }
        }
      }]), [h("div", {
        "class": "array-empty"
      }, [h(LibComponents.icon, {
        "attrs": {
          "type": "plus"
        }
      }), h("span", ["\u6DFB\u52A0"])])])]);
    }
  }, {
    key: "createOperators",
    value: function createOperators(index, IconComponent) {
      var _this3 = this;

      var h = this.$createElement;

      if (!this.store.editable) {
        return;
      }

      return h("div", {
        "class": "array-item-operator"
      }, [h("div", {
        "class": "circle-btn",
        "on": {
          "click": function click() {
            _this3.$emit('remove', index);
          }
        }
      }, [h(LibComponents.icon, {
        "attrs": {
          "type": "delete"
        }
      }), h("span", {
        "class": "op-name"
      }, [this.removeText])]), this.$slots.default.length > 1 ? [index !== this.$slots.default.length - 1 ? h("div", {
        "class": "circle-btn",
        "on": {
          "click": function click() {
            _this3.$emit('moveDown', index);
          }
        }
      }, [h(IconComponent, {
        "attrs": {
          "type": LibComponents.icons.down
        }
      }), h("span", {
        "class": "op-name"
      })]) : null, index !== 0 ? h("div", {
        "class": "circle-btn",
        "on": {
          "click": function click() {
            _this3.$emit('moveUp', index);
          }
        }
      }, [h(IconComponent, {
        "attrs": {
          "type": LibComponents.icons.up
        }
      }), h("span", {
        "class": "op-name"
      })]) : null] : null]);
    }
  }, {
    key: "renderAddBtn",
    value: function renderAddBtn() {
      var _this4 = this;

      var h = this.$createElement;

      if (!this.store.editable) {
        return;
      }

      if (this.maxItems && this.maxItems <= this.$slots.default.length) {
        return;
      }

      return h("div", {
        "class": "array-item-addition"
      }, [h("div", {
        "class": "ant-btn-text",
        "on": {
          "click": function click() {
            _this4.$emit('add');
          }
        }
      }, [h(LibComponents.icon, {
        "attrs": {
          "type": "plus"
        }
      }), this.addText])]);
    }
  }]);

  return FormBlock;
}(Vue), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "addText", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "removeText", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "maxItems", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "store", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { FormBlock as default };