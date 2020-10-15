import {MobileLibComponents, TYPES} from './utils/utils';
import {IField} from 'v-schema-form-types';
import {CreateElement, VNode} from 'vue';

/**
 * 兼容性处理，如果需要引入新的组件库，需要修改代码进行迟滞
 *
 * @author 吴昊
 * @since 0.1.19
 */

export function createSimpleMobileFieldComponent(title: string | VNode, inputComponent: any,
                                                 field: IField, h: CreateElement) {
  if (field.type === TYPES.object) {
    return inputComponent;
  }
  const props: any = {title};
  const FormItem = MobileLibComponents.formItem;
  let wrap = true;
  if (field.component.wrap === false || (typeof field.component.wrap === 'object'
      && field.component.wrap.mobile === false)) {
    wrap = false;
  }
  return wrap ? <FormItem props={props}>
    <template slot="extra">
      {inputComponent}
    </template>
  </FormItem> : inputComponent;
}
