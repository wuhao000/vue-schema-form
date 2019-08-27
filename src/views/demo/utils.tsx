import {TYPES} from '@/schema-form/utils';
import {FormDescriptor} from '@/types/bean';

const options = [{
  label: '选项1',
  value: 1
}, {
  label: '选项2',
  value: 2
}, {
  label: '选项3',
  value: 3
}];

export const getProps = () => {
  return {
    'labelSuffix': ':', 'gutter': 40, labelWidth: '120px'
  };
};
export const getValue = () => {
  return {
    string: '111',
    text: 'abc',
    integer: '22',
    double: '0.2',
    url: 'http://www.aegis-info.com',
    datetime: new Date(),
    date: new Date(),
    time: window.moment(),
    select: 1,
    multiSelect: [1, 3],
    expandSelect: 2,
    expandMultiSelect: [2, 3],
    month: null,
    year: null,
    values: {
      input: 'sssssssss'
    }
  };
};

export const getSubFormValue = () => {
  return {
    values: {
      input: 'abc',
      switch: false
    }
  };
};

export const getSubFormDefinition = (): FormDescriptor => {
  return {
    fields: [
      {
        title: '子表单',
        property: 'values',
        type: 'sub-form',
        fields: [{
          title: '文本',
          type: 'string',
          property: 'input'
        }, {
          title: '文本2',
          type: 'string',
          property: 'input2'
        }, {
          title: '开关',
          type: 'boolean',
          property: 'switch',
          displayValue: (value) => {
            return value !== undefined && value !== null && value.toString();
          }
        }]
      }
    ]
  };
};
export const getFormDefinition = (): FormDescriptor => {
  return {
    fields: [
      {
        title: '单行文本',
        property: 'string',
        type: 'string',
        required: true,
        placeholder: '请输入文本'
      }, {
        title: '多行文本',
        property: 'text',
        required: true,
        type: 'text'
      }, {
        title: '链接',
        property: 'url',
        required: true,
        type: 'url'
      }, {
        title: '整数',
        property: 'integer',
        type: 'integer',
        required: true,
        min: 100,
        max: 200
      }, {
        title: '小数',
        property: 'double',
        required: true,
        type: 'double'
      }, {
        title: '日期',
        property: 'date',
        required: true,
        type: 'date'
      }, {
        title: '日期时间',
        property: 'datetime',
        required: true,
        type: 'datetime'
      }, {
        title: '年份',
        property: 'year',
        required: true,
        type: 'year'
      }, {
        title: '月份',
        property: 'month',
        required: true,
        type: 'month'
      }, {
        title: '单选',
        property: 'select',
        required: true,
        type: 'select',
        props: {options, clearable: true}
      }, {
        title: '展开单选',
        property: 'expandSelect',
        required: true,
        type: 'expand-select',
        props: {options}
      }, {
        title: '多选',
        required: true,
        property: 'multiSelect',
        type: 'select',
        array: true,
        props: {options}
      }, {
        title: '展开多选',
        property: 'expandMultiSelect',
        required: true,
        type: 'expand-select',
        array: true,
        props: {options}
      }, {
        title: '子表单',
        property: 'values',
        type: TYPES.subForm,
        fields: [{
          title: '输入框',
          type: 'string',
          property: 'input',
          required: true
        }],
        props: {
          addBtnText: '添加子表单', addBtnProps: {block: true}
        }
      }, {
        title: '子表单数组',
        property: 'valuesArray',
        type: TYPES.subForm,
        array: true,
        fields: [{
          title: '输入框',
          type: 'string',
          property: 'input',
          required: true
        }],
        props: {
          addBtnText: '添加子表单', addBtnProps: {block: true}
        }
      }]
  };
};
