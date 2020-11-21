import { setStructValue } from "./destruct";
export var setFieldValue = function setFieldValue(parentValue, field, v, vue) {
  if (field.component.layout) {
    vue.$emit('input', v);
    vue.$emit('change', v);
    return;
  }

  if (!field.plainPath) {
    vue.$emit('input', v);
    vue.$emit('change', v);
  } else if (field.processor) {
    field.processor.setValue(parentValue, field, v);
  } else {
    setStructValue(parentValue, field.destructPath.destruct || field.name, v, vue);
  }
};