import {VNode} from 'vue';
import {Action, EffectsContext, IDType, PathType, SchemaFormField} from '../../types';
import SchemaForm from './form';
import {defineEffectsContext} from './utils/effects';

export const createSchemaForm = (schema: SchemaFormField, effects?: ($: EffectsContext) => void): VNode => {
  return <SchemaForm schema={schema}
                     effects={effects}/>;
};

export const defineSchemaForm = <T extends SchemaFormField>(schema: T): EffectsContext<PathType<T> | IDType<T>> => {
  const context = defineEffectsContext();
  context.schema = schema;
  return context;
};

export const defineActions = <T extends Action[] = Action[]>(actions: T): T => {
  return actions;
}
