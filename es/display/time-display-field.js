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

import { resolveDirective, createVNode, withDirectives, createTextVNode } from "vue";
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
var DisplayField = (_dec = Component({
  name: 'TimeDisplayField'
}), _dec2 = Prop(), _dec3 = Prop(Object), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inherits(DisplayField, _Vue);

  function DisplayField() {
    var _getPrototypeOf2;

    var _temp, _this;

    _classCallCheck(this, DisplayField);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DisplayField)).call.apply(_getPrototypeOf2, [this].concat(args))), _initializerDefineProperty(_this, "value", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "definition", _descriptor2, _assertThisInitialized(_this)), _temp));
  }

  _createClass(DisplayField, [{
    key: "render",
    value: function render() {
      var h = arguments[0];
      var value = this.value;
      var format = 'YYYY-MM-DD HH:mm:ss';

      if (this.definition.type === 'date') {
        format = 'YYYY-MM-DD';
      } else if (this.definition.type === 'month') {
        format = 'YYYY-MM';
      } else if (this.definition.type === 'year') {
        format = 'YYYY';
      } else if (this.definition.type === 'daterange') {
        format = 'YYYY-MM-DD';
      } else if (this.definition.type === 'time') {
        format = 'HH:mm:ss';
      }

      if (this.definition.type === 'daterange' && value) {
        return createVNode("span", null, [withDirectives(createVNode("span", {
          "format": format
        }, null), [[resolveDirective("time"), value[0]]]), createVNode("span", null, [createTextVNode(" - ")]), withDirectives(createVNode("span", {
          "format": format
        }, null), [[resolveDirective("time"), value[1]]])]);
      }

      return withDirectives(createVNode("span", {
        "format": format
      }, null), [[resolveDirective("time"), value]]);
    }
  }]);

  return DisplayField;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "value", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "definition", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export default DisplayField;