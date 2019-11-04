import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import _initializerDefineProperty from "@babel/runtime/helpers/initializerDefineProperty";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;

import Vue from 'vue';
import Component from 'vue-class-component';
import { Inject, Prop } from 'vue-property-decorator';
var AntdButton = (_dec = Component({
  name: 'AntdButton'
}), _dec2 = Prop(), _dec3 = Prop(), _dec4 = Inject('store'), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inheritsLoose(AntdButton, _Vue);

  function AntdButton() {
    var _temp, _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_temp = _this = _Vue.call.apply(_Vue, [this].concat(args)) || this, _initializerDefineProperty(_this, "action", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "title", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "store", _descriptor3, _assertThisInitialized(_this)), _temp) || _assertThisInitialized(_this);
  }

  var _proto = AntdButton.prototype;

  _proto.onClick = function onClick(e) {
    if (this.action) {
      this.action(this.store.context, e);
    }
  };

  _proto.render = function render() {
    var h = arguments[0];
    return h("d-button", _mergeJSXProps([{}, {
      "attrs": this.$attrs
    }, {
      "attrs": {
        "html-type": "button"
      },
      "on": {
        "click": this.onClick
      }
    }]), [this.title]);
  };

  return AntdButton;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "action", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "title", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "store", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { AntdButton as default };