var _dec, _class;

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

import Component, { mixins } from 'vue-class-component';
import BaseUrl from "../common/url";
var DUrlInput = (_dec = Component({
  name: 'DUrlInput'
}), _dec(_class = /*#__PURE__*/function (_mixins) {
  _inheritsLoose(DUrlInput, _mixins);

  function DUrlInput() {
    return _mixins.apply(this, arguments) || this;
  }

  var _proto = DUrlInput.prototype;

  _proto.render = function render() {
    var _this = this;

    var h = arguments[0];
    return h("div", {
      "class": "ant-url-input"
    }, [h("a-input-group", {
      "attrs": {
        "compact": true
      }
    }, [h("a-select", {
      "attrs": {
        "placeholder": "请选择",
        "disabled": this.disabled,
        "options": this.options
      },
      "model": {
        value: _this.protocol,
        callback: function callback($$v) {
          _this.protocol = $$v;
        }
      }
    }), h("a-input", {
      "class": "input-with-select",
      "attrs": {
        "placeholder": "请输入内容",
        "disabled": this.disabled
      },
      "style": "display:inline-block;width: 50%",
      "model": {
        value: _this.domain,
        callback: function callback($$v) {
          _this.domain = $$v;
        }
      }
    })])]);
  };

  return DUrlInput;
}(mixins(BaseUrl))) || _class);
export { DUrlInput as default };