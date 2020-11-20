import _typeof from "@babel/runtime/helpers/esm/typeof";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";

var _dec, _class;

import { createVNode } from "vue";
import Component from 'vue-class-component';
import BaseLayout from './base-layout';
import './text-box.less';
var TextBox = (_dec = Component({
  inheritAttrs: false,
  name: 'TextBox'
}), _dec(_class =
/*#__PURE__*/
function (_BaseLayout) {
  _inherits(TextBox, _BaseLayout);

  function TextBox() {
    _classCallCheck(this, TextBox);

    return _possibleConstructorReturn(this, _getPrototypeOf(TextBox).apply(this, arguments));
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
            array.push(createVNode("span", null, [item]));
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

      return createVNode("div", {
        "class": "vf-layout-text-box"
      }, [array]);
    }
  }]);

  return TextBox;
}(BaseLayout)) || _class);
export { TextBox as default };