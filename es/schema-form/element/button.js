import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";

var _dec, _class;

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

import Component from 'vue-class-component';
import BaseButton from "../common/base-button";
var ElementButton = (_dec = Component({
  name: 'ElementButton'
}), _dec(_class = /*#__PURE__*/function (_BaseButton) {
  _inheritsLoose(ElementButton, _BaseButton);

  function ElementButton() {
    return _BaseButton.apply(this, arguments) || this;
  }

  var _proto = ElementButton.prototype;

  _proto.render = function render() {
    var h = arguments[0];
    return h("el-button", _mergeJSXProps([{}, {
      "props": this.$attrs
    }, {
      "on": {
        "click": this.onClick
      }
    }]), [this.title]);
  };

  return ElementButton;
}(BaseButton)) || _class);
export { ElementButton as default };