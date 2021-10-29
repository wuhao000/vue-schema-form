import {VNode} from 'vue';
import {FieldDefinition} from './internal/utils';
import {FieldTypes, LibComponents} from './utils/utils';

function resolveWrap(field: FieldDefinition) {
  if (field.getComponent(true).wrap === false) {
    return false;
  }
  return typeof field.getComponent(true).wrap !== 'object' || (field.getComponent().wrap as any).mobile !== false;
}

/**
 * 兼容性处理，如果需要引入新的组件库，需要修改代码进行迟滞
 *
 * @author 吴昊
 * @since 0.1.19
 */

export function createSimpleMobileFieldComponent(title: string | VNode,
                                                 inputComponent: any,
                                                 field: FieldDefinition) {
  if (field.type === FieldTypes.Object) {
    return inputComponent;
  }
  const props: any = {title};
  const FormItem: any = LibComponents.formItem['mobile'];
  const slots = {
    extra: () => inputComponent
  };
  return resolveWrap(field) ? <FormItem {...props} v-slots={slots}/> : inputComponent;
}
