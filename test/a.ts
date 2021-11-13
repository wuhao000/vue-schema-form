import {defineSchemaForm} from '@/schema-form';

const a = defineSchemaForm({
  fields: {
    bb: {
      id: 'ef',
      type: 'n'
    },
    aa: {
      id: 'aaaaaaaaa',
      type: 'a',
      xProps: {},
      fields: {
        c: {
          id: 'ccccccccc',
          type: 'c'
        },
        d: {
          id: 'de',
          type: 'd',
          array: true,
          fields: {
            e: {
              type: 'e'
            }
          }
        }
      }
    }
  }
} as const);

a.$('#aaaaaaaaa')
type NonArrayField = Omit<any, 'array'>

type NonFieldsField = Omit<any, 'fields'>

interface Os {
  id: string;
}
