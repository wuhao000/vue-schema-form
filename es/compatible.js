import _typeof from "@babel/runtime/helpers/esm/typeof";
import { createVNode } from "vue";
import { MobileLibComponents, TYPES } from './utils/utils';

/**
 * 兼容性处理，如果需要引入新的组件库，需要修改代码进行迟滞
 *
 * @author 吴昊
 * @since 0.1.19
 */
export function createSimpleMobileFieldComponent(title, inputComponent, field, h) {
  if (field.type === TYPES.object) {
    return inputComponent;
  }

  var props = {
    title: title
  };
  var FormItem = MobileLibComponents.formItem;
  var wrap = true;

  if (field.component.wrap === false || _typeof(field.component.wrap) === 'object' && field.component.wrap.mobile === false) {
    wrap = false;
  }

  return wrap ? createVNode(FormItem, {
    "props": props
  }, {
    default: function _default() {
      return [createVNode("template", {
        "slot": "extra"
      }, [inputComponent])];
    }
  }) : inputComponent;
}