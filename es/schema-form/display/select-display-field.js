var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

import { getOptions } from "../utils/utils";
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
var SelectDisplayField = (_dec = Component({
  name: 'SelectDisplayField'
}), _dec2 = Prop(), _dec3 = Prop(Object), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_Vue) {
  _inheritsLoose(SelectDisplayField, _Vue);

  function SelectDisplayField() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Vue.call.apply(_Vue, [this].concat(args)) || this;

    _initializerDefineProperty(_assertThisInitialized(_this), "value", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_assertThisInitialized(_this), "field", _descriptor2, _assertThisInitialized(_this));

    return _this;
  }

  var _proto = SelectDisplayField.prototype;

  _proto.render = function render() {
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

      return h("span", [selected.map(function (it) {
        return typeof it === 'object' ? it[_this2.LabelProperty] : it;
      }).join('、')]);
    } else {
      return h("span");
    }
  };

  _createClass(SelectDisplayField, [{
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
}(Vue), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "value", [_dec2], {
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