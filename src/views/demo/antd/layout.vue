<template>
  <ae-layout class="demo-wrapper">
    <ae-layout-content>
      <a-schema-form inline
                     v-model="options"
                     :definition="optionFormDefinition"></a-schema-form>
      <div>
        <a-schema-form v-model="value2"
                       class="demo-form"
                       :disabled="options.disabled"
                       :definition="definition2"
                       :mode="options.displayMode ? 'display' : 'edit'"
                       :props="props"></a-schema-form>
      </div>
      <div>
        <a-schema-form v-model="value"
                       class="demo-form"
                       :disabled="options.disabled"
                       :mode="options.displayMode ? 'display' : 'edit'"
                       :definition="definition"
                       :props="props"></a-schema-form>
      </div>
    </ae-layout-content>
  </ae-layout>
</template>
<script lang="tsx">
  import SchemaForm from '@/index';
  import {TYPES} from '@/schema-form/utils';
  import Base from '@/views/demo/base';
  import {options} from '@/views/demo/utils';
  import Component from 'vue-class-component';

  SchemaForm.registerAntd();
  @Component({
    name: 'DesktopEdit'
  })
  export default class DesktopEdit extends Base {

    public value2 = {
      aa: '1',
      bb: '2',
      cc: '3'
    };

    get definition() {
      return {
        fields: {
          grid: {
            type: 'grid',
            layout: [[8, 8, 8], [12, 12, 12, 12]],
            fields: {
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
              }
            }
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
        }
      };
    }

    get definition2() {
      return {
        fields: {
          textBox: {
            type: 'text-box',
            title: '订票信息',
            layout: '订%s元/票 退%s元/票 改%s元/票',
            fields: {
              aa: {
                type: 'string'
              },
              bb: {
                type: 'string'
              },
              cc: {
                type: 'string'
              }
            }
          }
        }
      };
    }

    public created() {
      SchemaForm.registerAntd();
    }

  }
</script>
