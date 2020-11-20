import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";

var _dec, _class;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import PureInputComponent from './pure-input-component';
import Component from 'vue-class-component';
import { mixins } from 'vue-class-component/lib/util';
import { FormComponent } from './form-component';
var BaseFormComponent = (_dec = Component({
  name: 'BaseFormComponent'
}), _dec(_class =
/*#__PURE__*/
function (_mixins) {
  _inherits(BaseFormComponent, _mixins);

  function BaseFormComponent() {
    _classCallCheck(this, BaseFormComponent);

    return _possibleConstructorReturn(this, _getPrototypeOf(BaseFormComponent).apply(this, arguments));
  }

  _createClass(BaseFormComponent, [{
    key: "props",
    get: function get() {
      return _objectSpread({}, this.$attrs, {}, this.$props, {}, this.getProps(), {}, this.getSlotProps(), {
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