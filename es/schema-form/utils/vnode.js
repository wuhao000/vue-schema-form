export function setListeners(vnode, listeners) {
  if (listeners === void 0) {
    listeners = {};
  }

  if (vnode.componentOptions) {
    if (!vnode.componentOptions.listeners) {
      vnode.componentOptions.listeners = {};
    }

    Object.keys(listeners).forEach(function (key) {
      vnode.componentOptions.listeners[key] = listeners[key];
    });
  }
}
export function setProps(vnode, nodeProps) {
  if (nodeProps === void 0) {
    nodeProps = {};
  }

  if (vnode.componentOptions) {
    if (!vnode.componentOptions.propsData) {
      vnode.componentOptions.propsData = {};
    }

    Object.keys(nodeProps).forEach(function (key) {
      vnode.componentOptions.propsData[key] = nodeProps[key];
    });
  }
}
export function getNodeText(node) {
  if (node) {
    if (node.text) {
      return node.text;
    } else if (node.componentOptions && node.componentOptions.children) {
      return node.componentOptions.children.map(function (it) {
        return getNodeText(it);
      }).join('');
    }
  }

  return undefined;
}