import {SchemaFormField} from '../../types';
import {FieldTypes} from '../schema-form';

export const options = [{
  label: '选项1',
  value: 1
}, {
  label: '选项2',
  value: 2
}, {
  label: '选项3',
  value: 3
}, {
  label: '选项4',
  value: 4
}];

export const getProps = () => {
  return {
    labelSuffix: ':',
    gutter: 40,
    labelWidth: '120px'
  };
};
export const getValue = () => {
  return {
    string: '111',
    text: 'abc',
    integer: 122,
    double: 0.2,
    url: 'http://www',
    datetime: new Date(),
    date: new Date(),
    start: new Date(),
    end: new Date(),
    year: new Date().getFullYear(),
    month: new Date(),
    time: '12:24',
    timerange: ['12:24', '13:24'],
    select: 4,
    multiSelect: [1, 3],
    expandSelect: 1,
    expandMultiSelect: [1, 2],
    rate: 3,
    transfer: ['1'],
    subForm: {
      input: 'abs'
    },
    subFormArray: [{
      input: 'sssssssss'
    }]
  };
};

const fields: { [key: string]: SchemaFormField } = {
  expandSelect: {
    title: <span>展开单选</span>,
    required: true,
    type: 'expand-select',
    xProps: {options}
  },
  select: {
    title: '单选',
    required: true,
    type: 'select',
    xProps: {options, clearable: true}
  },
  multiSelect: {
    title: '多选',
    required: true,
    type: 'select',
    array: true,
    xProps: {options}
  },
  expandMultiSelect: {
    title: '展开多选',
    required: true,
    type: 'expand-select',
    array: true,
    xProps: {options}
  },
  text: {
    title: '多行文本',
    required: true,
    type: 'text'
  },
  password: {
    title: '密码',
    required: true,
    type: 'password'
  },
  zh: {
    title: '仅限中文',
    required: true,
    type: 'text',
    format: 'zh',
    default: 'not chinese'
  },
  string: {
    title: '单行文本',
    type: 'string',
    required: true,
    placeholder: '请输入文本'
  },
  url: {
    title: '链接',
    rules: 'url',
    type: 'url'
  },
  integer: {
    title: '整数',
    type: 'integer',
    required: true,
    min: 100,
    max: 200,
    xProps: {
      min: 100
    }
  },
  double: {
    title: '小数',
    required: true,
    type: 'double',
    xProps: {
      step: 0.1
    }
  },
  switch: {
    title: '开关',
    type: FieldTypes.Boolean
  },
  date: {
    title: '日期',
    required: true,
    type: 'date'
  },
  '[start, end]': {
    title: '日期范围',
    required: true,
    type: 'daterange'
  },
  year: {
    title: '年份',
    required: true,
    type: 'year'
  },
  time: {
    title: '时间',
    required: true,
    type: 'time'
  },
  timerange: {
    title: '时间范围',
    required: true,
    type: FieldTypes.TimeRange
  },
  datetime: {
    title: '日期时间',
    required: true,
    type: 'datetime'
  },
  month: {
    title: '月份',
    required: true,
    type: 'month'
  },
  file: {
    title: '卡片上传文件',
    type: FieldTypes.File,
    xProps: {
      mode: 'card'
    }
  },
  file2: {
    title: '拖拽上传文件',
    type: FieldTypes.File,
    xProps: {
      mode: 'dragger'
    }
  },
  file3: {
    title: '普通上传文件',
    type: FieldTypes.File
  },
  image: {
    title: '图片',
    type: FieldTypes.Picture
  },
  transfer: {
    title: '穿梭框',
    type: FieldTypes.Transfer,
    enum: [{
      label: '选项1',
      value: '1'
    }, {
      label: '选项2',
      value: '2'
    }]
  },
  range: {
    title: '范围',
    type: FieldTypes.Range
  },
  rate: {
    title: '评分',
    type: FieldTypes.Rate
  },
  subForm: {
    title: '子表单',
    type: FieldTypes.Object,
    fields: {
      input: {
        title: '输入框',
        type: 'string',
        required: true
      }
    },
    xProps: {
      addBtnText: '添加子表单', addBtnProps: {block: true}
    }
  },
  subFormArray: {
    title: '子表单数组',
    type: FieldTypes.Object,
    array: true,
    fields: {
      input: {
        title: '输入框(数组)',
        type: 'string',
        required: true
      }
    },
    xProps: {
      addBtnText: '添加子表单',
      addBtnProps: {block: true}
    }
  }
};

export const getFormDefinition = (): SchemaFormField => {
  return {
    props: {
      section: true,
      spaceBetweenSection: 16,
      labelWidth: 120
    },
    fields
  };
};
