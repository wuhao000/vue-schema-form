import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";

var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { getFormItemComponent } from "../internal/utils";
import { LibComponents, MOBILE } from "../utils/utils";
import BaseLayout from "./base-layout";
var GridLayout = (_dec = Component({
  inheritAttrs: false,
  name: 'GridLayout'
}), _dec2 = Prop({
  type: Array,
  required: true
}), _dec3 = Prop(), _dec4 = Prop(Number), _dec5 = Prop({
  type: Boolean,
  default: true
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_BaseLayout) {
  _inheritsLoose(GridLayout, _BaseLayout);

  function GridLayout() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _BaseLayout.call.apply(_BaseLayout, [this].concat(args)) || this;

    _initializerDefineProperty(_assertThisInitialized(_this), "layout", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_assertThisInitialized(_this), "title", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_assertThisInitialized(_this), "gutter", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_assertThisInitialized(_this), "wrapSingle", _descriptor4, _assertThisInitialized(_this));

    return _this;
  }

  var _proto = GridLayout.prototype;

  _proto.render = function render() {
    var h = arguments[0];
    var layout = this.layout,
        fields = this.fields,
        wrapSingle = this.wrapSingle,
        gutter = this.gutter,
        platform = this.store.platform;

    if (platform === MOBILE) {
      return h("div", [this.$slots.default]);
    }

    var groups = this.toGroups(fields, layout);
    var normalizedLayout = this.getNormalizedLayout();
    var layoutFields = normalizedLayout.map(function (span, index) {
      if (groups[index]) {
        if (typeof span === 'number') {
          var col = h(LibComponents.col, {
            "attrs": {
              "span": span
            }
          }, [groups[index]]);

          if (wrapSingle) {
            return h(LibComponents.row, {
              "attrs": {
                "gutter": gutter
              }
            }, [col]);
          }

          return col;
        } else if (Array.isArray(span)) {
          return h(LibComponents.row, {
            "attrs": {
              "gutter": gutter
            }
          }, [span.map(function (subspan, subindex) {
            return h(LibComponents.col, {
              "attrs": {
                "span": subspan
              }
            }, [groups[index][subindex]]);
          })]);
        }
      }
    });
    var FormItemComponent = getFormItemComponent(this.store.platform);

    if (this.title) {
      return h(FormItemComponent, _mergeJSXProps([{
        "attrs": {
          "title": this.title
        }
      }, {
        "props": this.$attrs
      }, {
        "attrs": {
          "label": this.title
        }
      }]), [this.isMixed ? h(LibComponents.row, {
        "attrs": {
          "gutter": this.gutter
        }
      }, [layoutFields]) : layoutFields]);
    }

    return this.isMixed ? h(LibComponents.row, {
      "attrs": {
        "gutter": this.gutter
      }
    }, [layoutFields]) : h("div", [layoutFields]);
  };

  _proto.toGroups = function toGroups(fields, layout) {
    if (!this.containsArray) {
      return [fields];
    }

    var groups = [];
    var tmpFields = [].concat(fields);
    layout.forEach(function (span) {
      if (Array.isArray(span)) {
        var tmp = tmpFields.splice(0, span.length);
        groups.push(tmp.length ? tmp : null);
      } else {
        var _tmp = tmpFields.splice(0, 1);

        groups.push(_tmp.length ? _tmp[0] : null);
      }
    });

    if (tmpFields.length) {
      tmpFields.forEach(function (field) {
        return groups.push(field);
      });
    }

    return groups;
  };

  _proto.getNormalizedLayout = function getNormalizedLayout() {
    if (!this.containsArray) {
      return [this.layout];
    } else {
      return this.layout;
    }
  };

  _createClass(GridLayout, [{
    key: "containsArray",
    get: function get() {
      return this.layout.some(function (it) {
        return Array.isArray(it);
      });
    }
  }, {
    key: "isMixed",
    get: function get() {
      return this.layout.some(function (it) {
        return typeof it === 'number';
      }) && this.layout.some(function (it) {
        return typeof it !== 'number';
      });
    }
  }]);

  return GridLayout;
}(BaseLayout), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "layout", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "title", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "gutter", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "wrapSingle", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { GridLayout as default };