import {VNode} from 'vue';

export function setListeners(vnode: VNode, listeners: any = {}) {
  if (vnode.componentOptions) {
    if (!vnode.componentOptions.listeners) {
      vnode.componentOptions.listeners = {};
    }
    Object.keys(listeners).forEach(key => {
      vnode.componentOptions.listeners[key] = listeners[key];
    });
  }
}

export function setProps(vnode: VNode, nodeProps: any = {}) {
  if (vnode.componentOptions) {
    if (!vnode.componentOptions.propsData) {
      vnode.componentOptions.propsData = {};
    }
    Object.keys(nodeProps).forEach(key => {
      vnode.componentOptions.propsData[key] = nodeProps[key];
    });
  }
}

export function getNodeText(node: VNode): string | undefined {
  if (node) {
    if (node.text) {
      return node.text;
    } else if (node.componentOptions && node.componentOptions.children) {
      return node.componentOptions.children.map(it => getNodeText(it)).join('');
    }
  }
  return undefined;
}
