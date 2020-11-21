var _dec, _dec2, _class, _class2, _descriptor, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

import BaseLayout from "./base-layout";
import Component, { mixins } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
var LayoutCard = (_dec = Component({
  name: 'Card'
}), _dec2 = Prop({
  type: [String, Object]
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_mixins) {
  _inheritsLoose(LayoutCard, _mixins);

  function LayoutCard() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _mixins.call.apply(_mixins, [this].concat(args)) || this;

    _initializerDefineProperty(_assertThisInitialized(_this), "title", _descriptor, _assertThisInitialized(_this));

    return _this;
  }

  var _proto = LayoutCard.prototype;

  _proto.render = function render() {
    var h = arguments[0];
    return h("a-card", {
      "attrs": {
        "title": this.title
      }
    }, [this.fields, this.$slots.default]);
  };

  return LayoutCard;
}(mixins(BaseLayout)), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "title", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { LayoutCard as default };