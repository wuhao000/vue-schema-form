import { defineSchemaForm } from "../types";

const ctx = defineSchemaForm({
  fields: {
    a: {
      id: 'a',
      type: 'string'
    }
  }
});
ctx('a')
