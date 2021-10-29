<template>
  <div class="markdown-body">
    <pre><demo-wrapper>
<comp0></comp0>
<template #code><code-container>
&lt;template&gt;
  &lt;div&gt;
    &lt;v-schema-form
        :schema="schema"
        :effects="effects"
        @ok="onOk"
        @cancel="onCancel"/&gt;
  &lt;/div&gt;
&lt;/template&gt;
&lt;script lang="ts"&gt;
  import {EffectsContext} from '../../../../types';
  import {registerAntd} from '../../../schema-form';

  registerAntd();
  export default {
    name: 'StepsLayoutDemo',
    setup() {
      return {
        onCancel: () =&gt; {
        },
        onOk: () =&gt; {
        },
        effects: ($: EffectsContext) =&gt; {
          $('#steps').setFieldProps({
            currentStep: 2
          });
        },
        schema: {
          props: {
            labelWidth: 120,
            labelPosition: 'left'
          },
          fields: [{
            type: 'steps',
            id: 'steps',
            layout: [4,4, 1],
            props: {
              titles: ['基本信息', '高级设置', '校验规则']
            },
            fields: [
              {
                property: 'nameGrid',
                type: 'grid',
                layout: [12, 12],
                fields: [
                  {
                    property: 'name',
                    required: true,
                    title: '中文名称',
                    type: 'string'
                  }
                ]
              },
              {
                type: 'grid',
                property: 'dataTypeGrid',
                layout: [12, 12],
                fields: [
                  {
                    property: 'collection',
                    title: '集合',
                    type: 'boolean'
                  }
                ]
              },
              {
                fields: [
                  {
                    id: 'displayField',
                    property: 'relatedEntityDisplayField',
                    title: '用于显示的属性',
                    type: 'select'
                  }
                ],
                id: 'relatedCard',
                layout: [12, 12],
                property: 'card2',
                type: 'grid'
              },
              {
                enum: [
                  {label: '百分比', value: 'Percentage'},
                  {label: '金额', value: 'Money'},
                  {label: '进度', value: 'Progress'}
                ],
                property: 'options.numberValueType',
                title: '数值类型',
                type: 'select',
                visible: false
              },
              {
                property: 'unit',
                title: '单位',
                type: 'string'
              },
              {
                property: 'options.defaultValue',
                slot: 'defaultValue',
                title: '默认值'
              },
              {
                array: true,
                property: 'options.dependProperties',
                title: '关联的字段',
                type: 'select'
              },
              {
                property: 'placeholder',
                title: '提示信息',
                type: 'string'
              },
              {
                fields: [
                  {
                    fields: [
                      {
                        fields: [
                          {
                            id: 'required',
                            property: 'required',
                            title: '是否必须',
                            type: 'boolean'
                          },
                          {
                            id: 'unique',
                            property: 'unique',
                            title: '是否唯一',
                            type: 'boolean'
                          },
                          {
                            id: 'min',
                            property: 'min',
                            title: '最小值',
                            type: 'number'
                          },
                          {
                            id: 'max',
                            property: 'max',
                            title: '最大值',
                            type: 'number'
                          },
                          {
                            id: 'minLength',
                            property: 'minLength',
                            title: '最小长度',
                            type: 'number'
                          },
                          {
                            id: 'maxLength',
                            property: 'maxLength',
                            title: '最大长度',
                            type: 'number'
                          }
                        ],
                        layout: [12, 12, 12, 12, 12, 12],
                        property: 'grid',
                        type: 'grid'
                      },
                      {
                        id: 'regexp',
                        property: 'regexp',
                        title: '正则',
                        type: 'string'
                      },
                      {
                        id: 'validateScript',
                        property: 'validateScript',
                        title: '校验脚本',
                        type: 'text'
                      }
                    ],
                    property: 'validateRules',
                    type: 'object'
                  }
                ],
                property: 'card3',
                props: {
                  title: '校验规则'
                },
                type: 'card'
              }
            ]
          }]
        }
      };
    }
  };
&lt;/script&gt;
</code-container></template>
</demo-wrapper></pre>

  </div>
</template>
<script lang="ts" setup>
  import  comp0 from './comp0.vue';
</script>