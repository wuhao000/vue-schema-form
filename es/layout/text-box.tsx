import {VNode} from 'vue';
import Component from 'vue-class-component';
import BaseLayout from './base-layout';
import './text-box.less';

@Component({
  inheritAttrs: false,
  name: 'TextBox'
})
export default class TextBox extends BaseLayout {


  public visitVnode(vnode: VNode, fields: VNode[], parent?: VNode) {
    if (vnode.text) {
      const split = vnode.text.split('%s');
      const array = [];
      split.forEach((item) => {
        if (item.length) {
          array.push(<span>{item}</span>);
        }
        array.push(...fields.splice(0, 1));
      });
      if (parent) {
        parent.children.splice(
          parent.children.indexOf(vnode), 1, ...array
        );
      } else {
        vnode.tag = 'span';
        vnode.children = array;
      }
    } else {
      vnode.children.forEach(item => {
        this.visitVnode(item, fields, vnode);
      });
    }
  }

  public render() {
    let array = [];
    const fields = [].concat(this.fields);
    if (this.layout) {
      if (typeof this.layout === 'object') {
        this.visitVnode(this.layout, fields);
        if (!fields.length) {
          return this.layout;
        } else {
          array.push(this.layout);
          array.push(...fields);
        }
      } else {
        const split = this.layout.split('%s');
        split.forEach((item) => {
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
    return <div class="vf-layout-text-box">{array}</div>;
  }

}
