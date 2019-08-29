import {FormDescriptor} from '@/types/bean';

export const getSubFormValue = () => {
  return {
    values: {
      input: 'abc',
      switch: false
    },
    valueArray: [{
      input: 'abc'
    }, {
      input: 'def'
    }]
  };
};

export const getSubFormDefinition = (): FormDescriptor => {
  return {
    fields: {
      valueArray: {
        title: '子表单数组',
        type: 'object',
        array: true,
        fields: {
          input: {
            title: '数组文本',
            type: 'string',
            required: true
          }
        },
        props: {
          addBtnText: '添加子表单',
          addBtnProps: {block: true}
        }
      }
    }
  };
};
