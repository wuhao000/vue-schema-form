import {ComponentInternalInstance} from '@vue/runtime-core';
import {ComponentOptions, getCurrentInstance} from 'vue';

function broadcast(this: ComponentInternalInstance, componentName, eventName, params) {
  if (this.slots.default) {
    const children = this.slots.default();
    children.forEach(child => {
      const name = (child.type as ComponentOptions).name;
      if (name === componentName) {
        child.component.emit.apply(child, [eventName].concat(params));
      } else {
        broadcast.apply(child, [componentName, eventName].concat([params]) as any);
      }
    });
  }

}

export const useEmitter = () => {
  const instance = getCurrentInstance();
  return {
    dispatch(componentName: string, eventName: any, params?: any[]) {
      let parent = instance.parent || instance.root;
      let name = (parent.type as ComponentOptions).name;
      while (parent && (!name || name !== componentName)) {
        parent = parent.parent;
        if (parent) {
          name = (parent.type as ComponentOptions).name;
        }
      }
      if (parent) {
        parent.emit.apply(parent, params ? [eventName].concat(params) as any : [eventName]);
      }
    },
    broadcast(componentName, eventName, params) {
      broadcast.call(instance, componentName, eventName, params);
    }
  };
};
