import _initializerDefineProperty from "@babel/runtime/helpers/esm/initializerDefineProperty";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/esm/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/esm/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

import { createVNode, createTextVNode, resolveComponent } from "vue";
import { SCHEMA_FORM_STORE_INJECT_KEY } from '../form';
import Component from 'vue-class-component';
import { Inject, Prop } from 'vue-property-decorator';
import { LibComponents } from '../utils/utils';
import './form-block.less';
var FormBlock = (_dec = Component({
  name: 'FormBlock'
}), _dec2 = Prop({
  type: [String, Object],
  default: '添加'
}), _dec3 = Prop({
  type: [String, Object],
  default: '删除'
}), _dec4 = Prop(Number), _dec5 = Inject(SCHEMA_FORM_STORE_INJECT_KEY), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inherits(FormBlock, _Vue);

  function FormBlock() {
    var _getPrototypeOf2;

    var _temp, _this;

    _classCallCheck(this, FormBlock);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(FormBlock)).call.apply(_getPrototypeOf2, [this].concat(args))), _initializerDefineProperty(_this, "addText", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "removeText", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "maxItems", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "store", _descriptor4, _assertThisInitialized(_this)), _temp));
  }

  _createClass(FormBlock, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var h = arguments[0];
      var IconComponent = LibComponents.icon;
      return createVNode("div", {
        "class": "array-form-block"
      }, [this.$slots.default ? this.$slots.default.map(function (it, index) {
        return createVNode("div", {
          "class": "array-item",
          "key": 'item-' + index
        }, [createVNode("div", {
          "class": "array-index"
        }, [createVNode("span", null, [index + 1])]), createVNode("div", {
          "class": "array-item-wrapper"
        }, [it]), _this2.createOperators(index, IconComponent), index === _this2.$slots.default.length - 1 ? _this2.renderAddBtn() : null]);
      }) : createVNode(resolveComponent("d-empty"), {
        "description": "",
        "nativeOn": {
          click: function click() {
            _this2.$emit('add');
          }
        }
      }, {
        default: function _default() {
          return [createVNode("div", {
            "class": "array-empty"
          }, [createVNode(LibComponents.icon, {
            "type": "plus"
          }, null), createVNode("span", null, [createTextVNode("\u6DFB\u52A0")])])];
        }
      })]);
    }
  }, {
    key: "createOperators",
    value: function createOperators(index, IconComponent) {
      var _this3 = this;

      var h = this.$createElement;

      if (!this.store.editable) {
        return;
      }

      return createVNode("div", {
        "class": "array-item-operator"
      }, [createVNode("div", {
        "class": "circle-btn",
        "onClick": function onClick() {
          _this3.$emit('remove', index);
        }
      }, [createVNode(LibComponents.icon, {
        "type": "delete"
      }, null), createVNode("span", {
        "class": "op-name"
      }, [this.removeText])]), this.$slots.default.length > 1 ? [index !== this.$slots.default.length - 1 ? createVNode("div", {
        "class": "circle-btn",
        "onClick": function onClick() {
          _this3.$emit('moveDown', index);
        }
      }, [createVNode(IconComponent, {
        "type": LibComponents.icons.down
      }, null), createVNode("span", {
        "class": "op-name"
      }, null)]) : null, index !== 0 ? createVNode("div", {
        "class": "circle-btn",
        "onClick": function onClick() {
          _this3.$emit('moveUp', index);
        }
      }, [createVNode(IconComponent, {
        "type": LibComponents.icons.up
      }, null), createVNode("span", {
        "class": "op-name"
      }, null)]) : null] : null]);
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

      return createVNode("div", {
        "class": "array-item-addition"
      }, [createVNode("div", {
        "class": "ant-btn-text",
        "onclick": function onclick() {
          _this4.$emit('add');
        }
      }, [createVNode(LibComponents.icon, {
        "type": "plus"
      }, null), this.addText])]);
    }
  }]);

  return FormBlock;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "addText", [_dec2], {
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