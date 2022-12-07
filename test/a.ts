import {DefaultSchemaFormField, defineSchemaForm, FlatFieldType, SchemaFormField} from '../types';

interface A {
  name: string;
  age: number;
  details: {
    name: string;
  }
}

type C<V> = FlatFieldType<V> & {
  name: string;
};

const a: SchemaFormField = {
  $details: {
    fields: [
      {
        property: 'name'
      }
    ]
  }
}

type CC<S> = S extends `$${infer D}` ? D : S;

const d: CC<'$name'> = 'name';

type Keys<V> = keyof V

export type IDType<T> = T extends { fields: infer S } ? {
  [K in Extract<keyof S, string>]: (S[K] extends DefaultSchemaFormField ? `#${S[K]['id']}` : never) | `#${IDType<S[K]>}`
}[Extract<keyof S, string>] : never;

const ctx = defineSchemaForm<A>(a);

type V = {
  $age: number;
  $name: string;
  aaa: string;
}
const c: CC<'$age' | '$name' | 'aaa'> = '$age';
ctx('')
