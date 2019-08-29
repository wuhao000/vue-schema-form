import {FormDescriptor} from '@/types/bean';

export const getSubFormValue = () => {
  return {
    values: {
      input: 'abc',
      switch: false
    },
    valueArray: []
  };
};

export const getSubFormDefinition = (): FormDescriptor => {
  return {
    fields: [
      {
        title: '子表单数组',
        property: 'valueArray',
        type: 'object',
        array: true,
        fields: [{
          title: '数组文本',
          type: 'string',
          property: 'input',
          required: true
        }],
        props: {
          addBtnText: '添加子表单',
          addBtnProps: {block: true}
        }
      }
    ]
  };
};
