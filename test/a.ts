import { defineSchemaForm } from "../types";

const ctx = defineSchemaForm<{b: string, a: string;}>({
  fields: {
    a: {
      id: 'a',
      type: 'string'
    }
  }
});
ctx('')
