import {VNode} from 'vue';
import {Action, EffectsContext, IDType, PathType, SchemaFormField} from '../../types';
import SchemaForm from './form';
import {defineEffectsContext} from './utils/effects';

export const createSchemaForm = (schema: SchemaFormField, effects?: ($: EffectsContext) => void): VNode => {
  return <SchemaForm schema={schema}
                     effects={effects}/> as any;
};

/**
 * 创建一个表单上下文，主要是提供typescript类型
 * @param {T} schema 描述表单结构的对象
 * @return {EffectsContext<PathType<T> | IDType<T>>} 返回副作用函数上下文操作对象
 */
export const defineSchemaForm = <T extends SchemaFormField>(schema: T): EffectsContext<PathType<T> | IDType<T>> => {
  const context = defineEffectsContext();
  context.__schema = schema;
  return context;
};

export const defineActions = <T extends Action[] = Action[]>(actions: T): T => {
  return actions;
}
