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
    integer: 122,
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

const fields = {
  string: {
    title: '单行文本',
    type: 'string',
    required: true,
    placeholder: '请输入文本'
  },
  text: {
    title: '多行文本',
    required: true,
    type: 'text'
  },
  url: {
    title: '链接',
    required: true,
    type: 'url'
  },
  integer: {
    title: '整数',
    type: 'integer',
    required: true,
    min: 100,
    max: 200
  },
  double: {
    title: '小数',
    required: true,
    type: 'double'
  },
  date: {
    title: '日期',
    required: true,
    type: 'date'
  },
  dateRange: {
    title: '日期范围',
    required: true,
    type: 'daterange',
    processor: {
      getValue: (value, field) => {
        return [value && value['start'], value && value['end']];
      },
      setValue: (parentValue, field, value) => {
        if (value) {
          parentValue['start'] = value[0];
          parentValue['end'] = value[1];
        } else {
          parentValue['start'] = null;
          parentValue['end'] = null;
        }
      }
    }
  },
  datetime: {
    title: '日期时间',
    required: true,
    type: 'datetime'
  },
  year: {
    title: '年份',
    required: true,
    type: 'year'
  },
  month: {
    title: '月份',
    required: true,
    type: 'month'
  },
  select: {
    title: '单选',
    required: true,
    type: 'select',
    props: {options, clearable: true}
  },
  expandSelect: {
    title: '展开单选',
    required: true,
    type: 'expand-select',
    props: {options}
  },
  multiSelect: {
    title: '多选',
    required: true,
    type: 'select',
    array: true,
    props: {options}
  },
  expandMultiSelect: {
    title: '展开多选',
    required: true,
    type: 'expand-select',
    array: true,
    props: {options}
  },
  subForm: {
    title: '子表单',
    type: TYPES.object,
    fields: {
      input: {
        title: '输入框',
        type: 'string',
        required: true
      }
    },
    props: {
      addBtnText: '添加子表单', addBtnProps: {block: true}
    }
  },
  subFormArray: {
    title: '子表单数组',
    type: TYPES.object,
    array: true,
    fields: {
      input: {
        title: '输入框(数组)',
        type: 'string',
        required: true
      }
    },
    props: {
      addBtnText: '添加子表单', addBtnProps: {block: true}
    }
  }
};

export const getFormDefinition = (): FormDescriptor => {
  return {
    fields
  };
};
