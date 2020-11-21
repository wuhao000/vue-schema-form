var _dec, _class;

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

import Component from 'vue-class-component';
import BaseLayout from "./base-layout";
import "./text-box.less";
var TextBox = (_dec = Component({
  inheritAttrs: false,
  name: 'TextBox'
}), _dec(_class = /*#__PURE__*/function (_BaseLayout) {
  _inheritsLoose(TextBox, _BaseLayout);

  function TextBox() {
    return _BaseLayout.apply(this, arguments) || this;
  }

  var _proto = TextBox.prototype;

  _proto.visitVnode = function visitVnode(vnode, fields, parent) {
    var _this = this;

    var h = this.$createElement;

    if (vnode.text) {
      var split = vnode.text.split('%s');
      var array = [];
      split.forEach(function (item) {
        if (item.length) {
          array.push(h("span", [item]));
        }

        array.push.apply(array, fields.splice(0, 1));
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
  };

  _proto.render = function render() {
    var h = arguments[0];
    var array = [];
    var fields = [].concat(this.fields);

    if (this.layout) {
      if (typeof this.layout === 'object') {
        this.visitVnode(this.layout, fields);

        if (!fields.length) {
          return this.layout;
        } else {
          var _array;

          array.push(this.layout);

          (_array = array).push.apply(_array, fields);
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
  };

  return TextBox;
}(BaseLayout)) || _class);
export { TextBox as default };