import {LibName, MobileLibComponents} from '@/schema-form/utils/utils';
import {CreateElement, VNode} from 'vue';

/**
 * 兼容性处理，如果需要引入新的组件库，需要修改代码进行迟滞
 *
 * @author 吴昊
 * @since 0.1.19
 */

export function createSimpleFieldComponent(title: string | VNode, inputComponent: any, h: CreateElement) {
  const libName = LibName.mobile;
  const props: any = {};
  const FormItem = MobileLibComponents.formItem;
  props.title = title;
  return <FormItem props={props}>
    <template slot="extra">
      {inputComponent}
    </template>
  </FormItem>;
}
