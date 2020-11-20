import _extends from "@babel/runtime/helpers/esm/extends";
import _initializerDefineProperty from "@babel/runtime/helpers/esm/initializerDefineProperty";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/esm/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/esm/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;

import Component, { mixins } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { getOptionProperty } from '../utils/option';
import BaseFormComponent from './base-input-component';
var OptionsBasedComponent = (_dec = Component({
  name: 'OptionsBasedComponent'
}), _dec2 = Prop({
  type: [String, Function],
  default: 'label'
}), _dec3 = Prop({
  type: Array
}), _dec4 = Prop({
  type: [String, Function],
  default: 'value'
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_mixins) {
  _inherits(OptionsBasedComponent, _mixins);

  function OptionsBasedComponent() {
    var _getPrototypeOf2;

    var _temp, _this;

    _classCallCheck(this, OptionsBasedComponent);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(OptionsBasedComponent)).call.apply(_getPrototypeOf2, [this].concat(args))), _initializerDefineProperty(_this, "labelProperty", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "options", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "valueProperty", _descriptor3, _assertThisInitialized(_this)), _temp));
  }

  _createClass(OptionsBasedComponent, [{
    key: "beforeUpdate",
    value: function beforeUpdate() {
      this.setProps();
    }
  }, {
    key: "created",
    value: function created() {
      this.setProps();
    }
  }, {
    key: "getOptions",
    value: function getOptions() {
      return this.getResolvedOptions(this.options);
    }
  }, {
    key: "getResolvedOptions",
    value: function getResolvedOptions(options) {
      var _this2 = this;

      if (options) {
        return options.map(function (option) {
          var op = _extends({}, option);

          op.label = getOptionProperty(option, _this2.labelProperty);
          op.value = getOptionProperty(option, _this2.valueProperty);
          return op;
        });
      } else {
        return null;
      }
    }
  }, {
    key: "setProps",
    value: function setProps() {
      var _this3 = this;

      if (this.$slots.default) {
        this.$slots.default.forEach(function (node) {
          if (node.componentOptions && node.componentOptions.propsData['disabled'] === undefined) {
            node.componentOptions.propsData['disabled'] = _this3['isDisabled'];
          }

          if (node.componentOptions && node.componentOptions.propsData['readonly'] === undefined) {
            node.componentOptions.propsData['readonly'] = _this3['isReadonly'];
          }
        });
      }
    }
  }]);

  return OptionsBasedComponent;
}(mixins(BaseFormComponent)), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "labelProperty", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "options", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "valueProperty", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { OptionsBasedComponent as default };