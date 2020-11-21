var _dec, _class;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

import PureInputComponent from "./pure-input-component";
import Component from 'vue-class-component';
import { mixins } from 'vue-class-component/lib/util';
import { FormComponent } from "./form-component";
var BaseFormComponent = (_dec = Component({
  name: 'BaseFormComponent'
}), _dec(_class = /*#__PURE__*/function (_mixins) {
  _inheritsLoose(BaseFormComponent, _mixins);

  function BaseFormComponent() {
    return _mixins.apply(this, arguments) || this;
  }

  _createClass(BaseFormComponent, [{
    key: "props",
    get: function get() {
      return _extends({}, this.$attrs, this.$props, this.getProps(), this.getSlotProps(), {
        disabled: this.isDisabled,
        readOnly: this.isReadonly,
        visible: this.stateValue,
        size: this.componentSize
      });
    }
  }]);

  return BaseFormComponent;
}(mixins(PureInputComponent, FormComponent))) || _class);
export { BaseFormComponent as default };