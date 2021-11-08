import {VNode} from 'vue';
import {EffectsContext, SchemaFormField} from '../../types';
import SchemaForm from './form';

export const createSchemaForm = (schema: SchemaFormField, effects?: ($: EffectsContext) => void): VNode => {
  return <SchemaForm schema={schema}
                     effects={effects}/>;
};
