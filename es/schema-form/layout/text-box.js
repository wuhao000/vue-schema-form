var _dec, _class;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

import Component from 'vue-class-component';
import BaseLayout from "./base-layout";
import "./text-box.less";
var TextBox = (_dec = Component({
  inheritAttrs: false,
  name: 'TextBox'
}), _dec(_class = /*#__PURE__*/function (_BaseLayout) {
  _inherits(TextBox, _BaseLayout);

  var _super = _createSuper(TextBox);

  function TextBox() {
    _classCallCheck(this, TextBox);

    return _super.apply(this, arguments);
  }

  _createClass(TextBox, [{
    key: "visitVnode",
    value: function visitVnode(vnode, fields, parent) {
      var _this = this;

      var h = this.$createElement;

      if (vnode.text) {
        var split = vnode.text.split('%s');
        var array = [];
        split.forEach(function (item) {
          if (item.length) {
            array.push(h("span", [item]));
          }

          array.push.apply(array, _toConsumableArray(fields.splice(0, 1)));
        });

        if (parent) {
          var _parent$children;

          (_parent$children = parent.children).splice.apply(_parent$children, [parent.children.indexOf(vnode), 1].concat(array));
        } else {
          vnode.tag = 'span';
          vnode.children = array;
        }
      } else {
        if (vnode.children) {
          vnode.children.forEach(function (item) {
            _this.visitVnode(item, fields, vnode);
          });
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var h = arguments[0];
      var array = [];
      var fields = [].concat(this.fields);

      if (this.layout) {
        if (_typeof(this.layout) === 'object') {
          this.visitVnode(this.layout, fields);

          if (!fields.length) {
            return this.layout;
          } else {
            var _array;

            array.push(this.layout);

            (_array = array).push.apply(_array, _toConsumableArray(fields));
          }
        } else {
          var split = this.layout.split('%s');
          split.forEach(function (item) {
            if (item.length) {
              array.push(item);
            }

            array.push(fields.splice(0, 1));
          });
        }
      }

      if (fields.length) {
        array = array.concat(fields);
      }

      return h("div", {
        "class": "vf-layout-text-box"
      }, [array]);
    }
  }]);

  return TextBox;
}(BaseLayout)) || _class);
export { TextBox as default };