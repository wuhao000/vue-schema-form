import {DefaultSchemaFormField, GridField, StepsField} from '../../../types';
import {createSchemaForm} from '../../schema-form';

export default {
  render() {
    return createSchemaForm({
      fields: {
        a: {
          type: 'grid',
          layout: '1',
          xProps: {}
        }
      }
    });
  }
};
