import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";

var _dec, _class;

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

import Component, { mixins } from 'vue-class-component';
import BaseButton from "../common/base-button";
var MobileButton = (_dec = Component({
  name: 'MobileButton'
}), _dec(_class = /*#__PURE__*/function (_mixins) {
  _inheritsLoose(MobileButton, _mixins);

  function MobileButton() {
    return _mixins.apply(this, arguments) || this;
  }

  var _proto = MobileButton.prototype;

  _proto.render = function render() {
    var h = arguments[0];
    return h("m-button", _mergeJSXProps([{}, {
      "props": this.$attrs
    }, {
      "on": {
        "click": this.onClick
      }
    }]), [this.title]);
  };

  return MobileButton;
}(mixins(BaseButton))) || _class);
export { MobileButton as default };