import {SchemaFormStore} from '../../../types';
import {inject} from 'vue';
import {SchemaFormStoreKey} from '../utils/key';
import {LibComponents} from '../utils/utils';

export default (props, ctx) => {
  const {fields} = props;
  const store: SchemaFormStore = inject(SchemaFormStoreKey);
  const CardComponent = LibComponents.card[store.platform];
  return <CardComponent title={props.title}>
    {fields}
    {ctx.slots.default?.()}
  </CardComponent>;
}
