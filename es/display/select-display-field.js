import _typeof from "@babel/runtime/helpers/esm/typeof";
import _initializerDefineProperty from "@babel/runtime/helpers/esm/initializerDefineProperty";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/esm/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/esm/initializerWarningHelper";

var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;

import { createVNode } from "vue";
import { getOptions } from '../utils/utils';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
var SelectDisplayField = (_dec = Component({
  name: 'SelectDisplayField'
}), _dec2 = Prop(), _dec3 = Prop(Object), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inherits(SelectDisplayField, _Vue);

  function SelectDisplayField() {
    var _getPrototypeOf2;

    var _temp, _this;

    _classCallCheck(this, SelectDisplayField);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(SelectDisplayField)).call.apply(_getPrototypeOf2, [this].concat(args))), _initializerDefineProperty(_this, "value", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "field", _descriptor2, _assertThisInitialized(_this)), _temp));
  }

  _createClass(SelectDisplayField, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var h = arguments[0];
      var field = this.field,
          value = this.value;
      var options = getOptions(field);

      if (value) {
        var selected = [];

        if (field.array) {
          selected = options.filter(function (it) {
            return value.includes(it[_this2.valueProperty]) || value.includes(it);
          });
        } else {
          selected = options.filter(function (it) {
            return value === it[_this2.valueProperty] || value === it;
          });
        }

        return createVNode("span", null, [selected.map(function (it) {
          return _typeof(it) === 'object' ? it[_this2.LabelProperty] : it;
        }).join('、')]);
      } else {
        return createVNode("span", null, null);
      }
    }
  }, {
    key: "valueProperty",
    get: function get() {
      return this.field.props.valueProperty || 'value';
    }
  }, {
    key: "LabelProperty",
    get: function get() {
      return this.field.props.labelProperty || 'label';
    }
  }]);

  return SelectDisplayField;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "value", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "field", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export default SelectDisplayField;