import {VNode} from 'vue';
import {EffectsContext, IDType, PathType, SchemaFormField} from '../../types';
import SchemaForm from './form';
import {defineEffectsContext} from './utils/effects';

export const createSchemaForm = (schema: SchemaFormField, effects?: ($: EffectsContext) => void): VNode => {
  return <SchemaForm schema={schema}
                     effects={effects}/>;
};

export const defineSchemaForm = <T extends SchemaFormField>(obj: T): {
  $: EffectsContext<PathType<T> | IDType<T>>,
  schema: T
} => {
  return {
    schema: obj,
    $: defineEffectsContext()
  };
};

