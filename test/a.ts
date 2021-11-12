import {SchemaFormField} from '../types';

type NonArrayField = Omit<any, 'array'>

type PropType<T> = T extends SchemaFormField ? {
  [key in keyof T['fields']]:  T['fields'][key] extends NonArrayField
    ? (PropType<T['fields'][key]> & SchemaFormField)
    : Array<PropType<T['fields'][key]> & SchemaFormField>
} : { test: string };
``
function defineSchemaForm<T extends SchemaFormField>(obj: T): PropType<T> {
  return new Proxy(obj, {
    get(target: T, p: string | symbol, receiver: any): any {
      return null;
    }
  }) as  PropType<T>;
}

const b = defineSchemaForm({
  fields: {
    a: {
      type: 'a',
      xProps: {},
      fields: {
        c: {
          type: 'c'
        },
        d: {
          type: 'd',
          array: true,
        }
      }
    }
  }
});

console.log(b.a);
