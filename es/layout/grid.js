import _initializerDefineProperty from "@babel/runtime/helpers/esm/initializerDefineProperty";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _applyDecoratedDescriptor from "@babel/runtime/helpers/esm/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime/helpers/esm/initializerWarningHelper";

var _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

import { createVNode } from "vue";
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { getFormItemComponent } from '../internal/utils';
import { LibComponents, MOBILE } from '../utils/utils';
import BaseLayout from './base-layout';
var GridLayout = (_dec = Component({
  inheritAttrs: false,
  name: 'GridLayout'
}), _dec2 = Prop({
  type: Array,
  required: true
}), _dec3 = Prop(), _dec4 = Prop(Number), _dec5 = Prop({
  type: Boolean,
  default: true
}), _dec(_class = (_class2 =
/*#__PURE__*/
function (_BaseLayout) {
  _inherits(GridLayout, _BaseLayout);

  function GridLayout() {
    var _getPrototypeOf2;

    var _temp, _this;

    _classCallCheck(this, GridLayout);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(GridLayout)).call.apply(_getPrototypeOf2, [this].concat(args))), _initializerDefineProperty(_this, "layout", _descriptor, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "title", _descriptor2, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "gutter", _descriptor3, _assertThisInitialized(_this)), _initializerDefineProperty(_this, "wrapSingle", _descriptor4, _assertThisInitialized(_this)), _temp));
  }

  _createClass(GridLayout, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var h = arguments[0];
      var layout = this.layout,
          fields = this.fields,
          wrapSingle = this.wrapSingle,
          gutter = this.gutter,
          platform = this.store.platform;

      if (platform === MOBILE) {
        return createVNode("div", null, [this.$slots.default]);
      }

      var groups = this.toGroups(fields, layout);
      var normalizedLayout = this.getNormalizedLayout();
      var layoutFields = normalizedLayout.map(function (span, index) {
        if (groups[index]) {
          if (typeof span === 'number') {
            var col = createVNode(LibComponents.col, {
              "span": span
            }, {
              default: function _default() {
                return [groups[index]];
              }
            });

            if (wrapSingle) {
              return createVNode(LibComponents.row, {
                "gutter": gutter
              }, {
                default: function _default() {
                  return [col];
                }
              });
            }

            return col;
          } else if (Array.isArray(span)) {
            return createVNode(LibComponents.row, {
              "gutter": gutter
            }, {
              default: function _default() {
                return [span.map(function (subspan, subindex) {
                  return createVNode(LibComponents.col, {
                    "span": subspan
                  }, {
                    default: function _default() {
                      return [groups[index][subindex]];
                    }
                  });
                })];
              }
            });
          }
        }
      });
      var FormItemComponent = getFormItemComponent(this.store.platform);

      if (this.title) {
        return createVNode(FormItemComponent, {
          "title": this.title,
          "props": this.$attrs,
          "label": this.title
        }, {
          default: function _default() {
            return [_this2.isMixed ? createVNode(LibComponents.row, {
              "gutter": _this2.gutter
            }, {
              default: function _default() {
                return [layoutFields];
              }
            }) : layoutFields];
          }
        });
      }

      return this.isMixed ? createVNode(LibComponents.row, {
        "gutter": this.gutter
      }, {
        default: function _default() {
          return [layoutFields];
        }
      }) : createVNode("div", null, [layoutFields]);
    }
  }, {
    key: "toGroups",
    value: function toGroups(fields, layout) {
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
    }
  }, {
    key: "getNormalizedLayout",
    value: function getNormalizedLayout() {
      if (!this.containsArray) {
        return [this.layout];
      } else {
        return this.layout;
      }
    }
  }, {
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
}(BaseLayout), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "layout", [_dec2], {
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