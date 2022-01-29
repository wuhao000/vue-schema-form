import {FieldDefinition} from './internal/utils';

function resolveWrap(field: FieldDefinition) {
  if (field.getComponent(true).wrap === false) {
    return false;
  }
  return typeof field.getComponent(true).wrap !== 'object' || (field.getComponent().wrap as any).mobile !== false;
}
