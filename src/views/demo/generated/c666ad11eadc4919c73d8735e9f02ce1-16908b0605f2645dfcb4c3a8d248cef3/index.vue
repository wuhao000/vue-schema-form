<template>
  <div class="markdown-body">
    <pre><demo-wrapper>
<comp0></comp0>
<template #code><code-container>
&lt;template&gt;
  &lt;div&gt;
    &lt;v-schema-form
v-model:value="value"
                   :schema="schema"
                   :effects="effects"/&gt;
    &lt;a-button @click="focus"&gt;焦点&lt;/a-button&gt;
    &lt;a-button @click="addContent"&gt;添加内容&lt;/a-button&gt;
  &lt;/div&gt;
&lt;/template&gt;
&lt;script lang="ts"&gt;import {defineComponent, reactive, ref} from 'vue';
import {EffectsContext} from '../../../../types';
import {FieldTypes, registerAntd} from '../../../schema-form';

export default defineComponent({
  setup() {
    const schema = reactive({
      fields: [
        {
          property: 'path',
          required: true,
          title: 'API名称',
          type: FieldTypes.String
        },
        {
          property: 'name',
          required: true,
          title: '中文名称',
          type: FieldTypes.String
        },
        {
          enum: [
            {label: '百分比', value: 'Percentage'},
            {label: '金额', value: 'Money'},
            {label: '进度', value: 'Progress'}
          ],
          property: 'options.numberValueType',
          title: '数值类型',
          type: FieldTypes.Select,
          visible: false
        },
        {
          property: 'unit',
          title: '单位',
          type: FieldTypes.String
        },
        {
          property: 'collection',
          title: '集合',
          type: FieldTypes.Boolean
        },
        {
          property: 'dicCode',
          props: {
            filterOption: (inputValue, option) =&gt; {
              if (inputValue) {
                return option.label.includes(inputValue);
              }
              return true;
            },
            showSearch: true
          },
          required: true,
          visible: false,
          title: '绑定字典数据',
          type: FieldTypes.Select
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
          type: FieldTypes.Select
        },
        {
          enum: [
            {label: '布尔', value: 'Boolean'},
            {label: '日期', value: 'Date'},
            {label: '小数', value: 'Double'},
            {label: '整数', value: 'Int'},
            {label: '字符串', value: 'String'}
          ],
          property: 'options.scriptResultType',
          title: '脚本计算的结果类型',
          type: FieldTypes.Select
        },
        {
          property: 'placeholder',
          title: '提示信息',
          type: FieldTypes.String
        },
        {
          fields: [
            {id: 'relatedEntityId', property: 'relatedEntityId', title: '关联实体', type: 'select'},
            {id: 'displayField', property: 'relatedEntityDisplayField', title: '用于显示的属性', type: 'select'}
          ],
          id: 'relatedCard',
          property: 'card2',
          type: 'card'
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
                      type: FieldTypes.Boolean
                    },
                    {
                      id: 'unique',
                      property: 'unique',
                      title: '是否唯一',
                      type: FieldTypes.Boolean
                    },
                    {
                      id: 'min',
                      property: 'min',
                      title: '最小值',
                      type: FieldTypes.Number
                    },
                    {
                      id: 'max',
                      property: 'max',
                      title: '最大值',
                      type: FieldTypes.Number
                    },
                    {
                      id: 'minLength',
                      property: 'minLength',
                      title: '最小长度',
                      type: FieldTypes.Number
                    },
                    {
                      id: 'maxLength',
                      property: 'maxLength',
                      title: '最大长度',
                      type: FieldTypes.Number
                    }
                  ],
                  layout: [12, 12, 12, 12, 12, 12],
                  property: 'grid',
                  type: FieldTypes.Grid
                },
                {
                  id: 'regexp',
                  property: 'regexp',
                  title: '正则',
                  type: FieldTypes.String
                },
                {
                  id: 'validateScript',
                  property: 'validateScript',
                  title: '校验脚本',
                  type: FieldTypes.Text
                }
              ],
              property: 'validateRules',
              type: FieldTypes.Object
            }
          ],
          property: 'card3',
          props: {
            title: '校验规则'
          },
          type: 'card'
        }
      ],
      props: {
        labelWidth: '100px'
      }
    });
    const value = reactive({});
    const context = ref(null);
    const focus = () =&gt; {
      const field = context.value('name').fields()[0];
      field.inputRef.focus();
    };
    const effects = ($: EffectsContext) =&gt; {
      context.value = $;
      $('name').onFieldBlur((a, b) =&gt; {
        console.log('blur', a, b);
      });
      $('name').onFieldFocus((a, b) =&gt; {
        if (b) {
        }
      });
    };
    const addContent = () =&gt; {
      focus();
      const field = context.value('name').fields()[0];
      const input = field.inputRef as HTMLInputElement;
      const caretIndex = input.selectionEnd;
      const content = 'abc';
      context.value('name').value(
          input.value.substr(0, caretIndex) + content + input.value.substr(caretIndex)
      );
      setTimeout(() =&gt; {
        input.setSelectionRange(caretIndex + content.length, caretIndex + content.length);
      }, 0);
    };
    registerAntd();

    return {
      schema,
      addContent,
      value,
      effects,
      focus
    };
  },
  data() {
    return {};
  },
  created() {
    registerAntd();
  },
  methods: {}
});
&lt;/script&gt;
</code-container></template>
</demo-wrapper></pre>

  </div>
</template>
<script lang="ts" setup>
  import  comp0 from './comp0.vue';
</script>