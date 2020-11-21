export function setListeners(vnode) {
  var listeners = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (vnode.componentOptions) {
    if (!vnode.componentOptions.listeners) {
      vnode.componentOptions.listeners = {};
    }

    Object.keys(listeners).forEach(function (key) {
      vnode.componentOptions.listeners[key] = listeners[key];
    });
  }
}
export function setProps(vnode) {
  var nodeProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

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