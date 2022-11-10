import {IValidateResponse} from '../../../../types';
import {FieldDefinition} from '../../bean/field-definition';
import {flat} from '../../utils/array';
import {isNotNull} from '../../utils/utils';
import {format} from './utils';

export {format};

export const runValidation = async (
  fields: FieldDefinition[]
): Promise<IValidateResponse[]> => {
  const queue = [];
  const invisiblePaths = fields.filter(field => field.validateIgnore())
    .map(field => field.plainPath);
  fields.forEach(field => {
    if (invisiblePaths.includes(field.plainPath)
      || invisiblePaths.some(it => field.plainPath.startsWith(it + '.'))) {
      return;
    }
    queue.push(field.validate());
  });
  return Promise.all(queue).then<IValidateResponse[]>((response: Array<IValidateResponse[]>) =>
    flat(response).filter(it => isNotNull(it)));
};

export default runValidation;
