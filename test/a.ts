import { defineSchemaForm } from "../types";

const ctx = defineSchemaForm({
  fields: {
    a: {
      id: 'a',
      type: 'string'
    }
  },
  $b: {
    type: 'string'
  },
  '$c.e': {
    type: 'object',
    $f: {
      type: 'string'
    },
    fields: {
      g: {
        type: 'string'
      }
    }
  }
});
ctx('c.e.g')
