import { defineSchemaForm } from "../types";

const schema = {
  fields: {
    a: {
      id: 'a'
    },
    b: {
      fields: {
        c: {
          fields: {
            f: {
              fields: {
                gg: {}
              }
            }
          }
        }
      },
      $e: {
        fields: {
          fdas: {}
        }
      }
    },
  },
  $d: {},
  $$e: {
    fields: {
      cc: {}
    }
  }
} as const

const schema2 = {
  $$e: {
    fields: {
      cc: {}
    }
  }
};

const ctx = defineSchemaForm(schema);
