<template>
  <div class="markdown-body">
    <pre><demo-wrapper>
<comp0></comp0>
<template #code><code-container>
  
&lt;template&gt;
  &lt;a-layout class="bg-white wrapper"&gt;
    &lt;a-layout-content&gt;
      &lt;v-schema-form
          v-model:value="value"
          :editable="editable"
          :schema="schema"&gt;&lt;/v-schema-form&gt;
      &lt;v-schema-form
          v-model:value="searchForm"
          :schema="searchFormDefinition"
          class="m-b"&gt;
        &lt;template #search&gt;
          &lt;a-form-item&gt;
            &lt;a-button&gt;查询&lt;/a-button&gt;
          &lt;/a-form-item&gt;
        &lt;/template&gt;

      &lt;/v-schema-form&gt;
      &lt;v-schema-form
          v-model:value="value2"
          :effects="effects2"
          :schema="schema2"/&gt;
      &lt;a-button @click="changeMode"&gt;
        {{ editable ? '详情' : '编辑' }}
      &lt;/a-button&gt;
      &lt;show-value :value="value"/&gt;
    &lt;/a-layout-content&gt;
  &lt;/a-layout&gt;
&lt;/template&gt;
&lt;script lang="ts"&gt;
  import {registerAntd} from '../../../schema-form/antd';
  import {SchemaFormField} from '../../../../types';
  import {defineComponent, ref} from 'vue';
  import ShowValue from '../show-value';

  export default defineComponent({
    name: "Demo",
    components: {
      ShowValue
    },
    setup() {
      registerAntd();
      const editable = ref(true);
      const schema = {
        props: {
          inline: true
        },
        fields: {
          aaa: {
            type: 'string',
            title: '字段1',
            notice: 'aaaaaaaa'
          },
          bbb: {
            type: 'number',
            title: '字段2'
          },
          ccc: {
            type: 'date',
            title: '字段3'
          },
          'ddd.ee': {
            type: 'date',
            title: '字段4'
          }
        }
      };
      const schema2 = {
        props: {inline: true},
        fields: {
          month: {
            type: 'month',
            title: '时间选择',
            processor: {
              getValue: (v) =&gt; {
                if (v &amp;&amp; v.year &amp;&amp; v.month) {
                  return new Date(v.year, v.month - 1);
                }
              },
              setValue: (parentValue, field, fieldValue: Date) =&gt; {
                if (fieldValue) {
                  parentValue.year = fieldValue.getFullYear();
                  parentValue.month = fieldValue.getMonth() + 1;
                }
              }
            }
          },
          export: {
            type: 'button',
            title: '导出数据',
            wrapperProps: {
              noTitle: true
            },
            props: {
              icon: 'export',
              action: () =&gt; {
                console.log('on click')
              }
            }
          }
        }
      };
      const searchFormDefinition: SchemaFormField = {
        type: 'object',
        props: {
          inline: true
        },
        fields: [{
          title: '关键字',
          type: 'string',
          property: 'keyword'
        }, {
          slot: 'search'
        }]
      };
      const value = ref({});
      const value2 = ref({
        year: 2019,
        month: 9
      });
      return {
        editable,
        schema,
        schema2,
        searchForm: {},
        searchFormDefinition,
        value,
        value2,
        changeMode() {
          editable.value = !editable.value;
        },
        effects2($) {
          $('month').onFieldChange((v) =&gt; {
            console.log('month changed: ' + v);
          });
        }
      };
    }
  });
&lt;/script&gt;

</code-container></template>
</demo-wrapper></pre>
</div>
</template>
<script lang="ts" setup>
  import  comp0 from './comp0.vue';
</script>