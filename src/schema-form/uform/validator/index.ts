import {IValidateResponse} from '../../../../types';
import {FieldDefinition} from '../../internal/utils';
import {flat} from '../../utils/array';
import {isNotNull} from '../../utils/utils';
import {each, format} from './utils';

export {format};

export const runValidation = async (
    fieldMap: { [key: string]: FieldDefinition }
): Promise<IValidateResponse[]> => {
  const queue = [];
  each(fieldMap, (field: FieldDefinition) => {
    if (field.visible === false ||
        field.display === false ||
        field.editable === false) {
      return;
    }
    queue.push(field.validate());
  });
  return Promise.all(queue).then((response: Array<IValidateResponse[]>) =>
      flat(response).filter(it => isNotNull(it)));
};

export default runValidation;
