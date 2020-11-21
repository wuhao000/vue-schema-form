import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";

var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
  _inheritsLoose(FormBlock, _Vue);

  function FormBlock() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Vue.call.apply(_Vue, [this].concat(args)) || this;

    _initializerDefineProperty(_assertThisInitialized(_this), "addText", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_assertThisInitialized(_this), "removeText", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_assertThisInitialized(_this), "maxItems", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_assertThisInitialized(_this), "store", _descriptor4, _assertThisInitialized(_this));

    return _this;
  }

  var _proto = FormBlock.prototype;

  _proto.render = function render() {
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
  };

  _proto.createOperators = function createOperators(index, IconComponent) {
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
  };

  _proto.renderAddBtn = function renderAddBtn() {
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
  };

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