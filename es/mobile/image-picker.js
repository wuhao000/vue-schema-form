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

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3;

import { resolveComponent, createVNode } from "vue";
import '../styles/image-picker.less';
import '../styles/mobile-image-picker.less';
import { SCHEMA_FORM_STORE_INJECT_KEY } from '../form';
import Component from 'vue-class-component';
import { Inject, Prop, Watch } from 'vue-property-decorator';
import { isSame } from '../utils/array';
var MobileImagePicker = (_dec = Component({
  name: 'MobileImagePicker'
}), _dec2 = Prop([String, Array]), _dec3 = Prop({
  type: Boolean,
  default: false
}), _dec4 = Inject(SCHEMA_FORM_STORE_INJECT_KEY), _dec5 = Watch('value', {
  immediate: true
}), _dec6 = Watch('currentValue'), _dec(_class = (_class2 =
/*#__PURE__*/
function (_Vue) {
  _inherits(MobileImagePicker, _Vue);

  function MobileImagePicker() {
    var _getPrototypeOf2;

    var _temp, _this;

    _classCallCheck(this, MobileImagePicker);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(MobileImagePicker)).call.apply(_getPrototypeOf2, [this].concat(args))), _initializerDefineProperty(_this, "value", _descriptor, _assertThisInitialized(_this)), _this.currentValue = [], _initializerDefineProperty(_this, "multiple", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "store", _descriptor3, _assertThisInitialized(_this)), _temp));
  }

  _createClass(MobileImagePicker, [{
    key: "valueChanged",
    value: function valueChanged(value) {
      if (this.value) {
        if (this.multiple) {
          this.currentValue = this.value.map(function (it) {
            return {
              url: it
            };
          });
        } else {
          this.currentValue = [{
            url: this.value
          }];
        }
      } else {
        this.currentValue = [];
      }
    }
  }, {
    key: "currentValueChanged",
    value: function currentValueChanged(currentValue) {
      if (currentValue && currentValue.length) {
        var value = currentValue.map(function (it) {
          return it.url;
        });

        if (this.multiple) {
          if (this.value) {
            if (!isSame(this.value, value)) {
              this.$emit('input', value);
            }
          } else {
            this.$emit('input', []);
          }
        } else {
          if (this.value !== currentValue[0].url) {
            this.$emit('input', currentValue[0].url);
          }
        }
      } else {
        if (this.value) {
          this.$emit('input', null);
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var h = arguments[0];
      var currentValue = this.currentValue;

      var props = _extends({}, this.$attrs);

      props.length = this.length;
      props.selectable = currentValue.length < this.length;
      props.value = currentValue;
      return createVNode(resolveComponent("m-list-item"), {
        "title": this.$attrs.title,
        "multipleLine": true
      }, {
        default: function _default() {
          return [// @ts-ignore
          createVNode(resolveComponent("m-image-picker"), {
            "slot": "extra",
            "props": props,
            "onInput": function onInput(v) {
              _this2.currentValue = v;
            }
          }, null)];
        }
      });
    }
  }, {
    key: "length",
    get: function get() {
      return this.multiple ? 10 : 1;
    }
  }]);

  return MobileImagePicker;
}(Vue), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "value", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "multiple", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "store", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "valueChanged", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "valueChanged"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "currentValueChanged", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "currentValueChanged"), _class2.prototype)), _class2)) || _class);
export { MobileImagePicker as default };