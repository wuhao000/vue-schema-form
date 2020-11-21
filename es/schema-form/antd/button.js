import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";

var _dec, _class;

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

import Component from 'vue-class-component';
import BaseButton from "../common/base-button";
var AntdButton = (_dec = Component({
  name: 'AntdButton'
}), _dec(_class = /*#__PURE__*/function (_BaseButton) {
  _inheritsLoose(AntdButton, _BaseButton);

  function AntdButton() {
    return _BaseButton.apply(this, arguments) || this;
  }

  var _proto = AntdButton.prototype;

  _proto.render = function render() {
    var h = arguments[0];
    return h("a-button", _mergeJSXProps([{}, {
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
}(BaseButton)) || _class);
export { AntdButton as default };