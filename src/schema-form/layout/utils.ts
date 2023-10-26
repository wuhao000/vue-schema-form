import {PropType} from 'vue';

export const FORM_BLOCK_PROPS = {
  addText: String,
  maxItems: Number,
  title: {
    type: [String, Object]
  },
  class: [String, Object, Array] as PropType<string | string[] | Record<string, unknown>>,
  style: [Object, String],
  removeText: String,
  showAdd: {
    type: Boolean,
    default: true,
  },
  showRemove: {
    type: Boolean,
    default: true,
  },
  display: Boolean
}
