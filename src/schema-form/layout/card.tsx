import { SchemaFormStore } from '../../../types';
import { inject } from 'vue';
import { SchemaFormStoreKey } from '../utils/key';
import { LibComponents } from '../utils/utils';

export default (props, {slots}) => {
  const store: SchemaFormStore = inject(SchemaFormStoreKey);
  const CardComponent = LibComponents.card[store.platform];
  return <CardComponent
    {...props}
    title={props.title}>
    {slots.default?.()}
  </CardComponent>;
}
