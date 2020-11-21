var _dec, _class;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

import Component, { mixins } from 'vue-class-component';
import BaseUrl from "../common/url";
var DUrlInput = (_dec = Component({
  name: 'DUrlInput'
}), _dec(_class = /*#__PURE__*/function (_mixins) {
  _inherits(DUrlInput, _mixins);

  var _super = _createSuper(DUrlInput);

  function DUrlInput() {
    _classCallCheck(this, DUrlInput);

    return _super.apply(this, arguments);
  }

  _createClass(DUrlInput, [{
    key: "render",
    value: function render() {
      var _this = this;

      var h = arguments[0];
      return h("div", {
        "class": "ant-url-input"
      }, [h("a-input-group", {
        "attrs": {
          "compact": true
        }
      }, [h("a-select", {
        "attrs": {
          "placeholder": "请选择",
          "disabled": this.disabled,
          "options": this.options
        },
        "model": {
          value: _this.protocol,
          callback: function callback($$v) {
            _this.protocol = $$v;
          }
        }
      }), h("a-input", {
        "class": "input-with-select",
        "attrs": {
          "placeholder": "请输入内容",
          "disabled": this.disabled
        },
        "style": "display:inline-block;width: 50%",
        "model": {
          value: _this.domain,
          callback: function callback($$v) {
            _this.domain = $$v;
          }
        }
      })])]);
    }
  }]);

  return DUrlInput;
}(mixins(BaseUrl))) || _class);
export { DUrlInput as default };