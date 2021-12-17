<template>
  <div class="markdown-body">
    <h1 id="表单组件-dform">表单组件 DForm</h1>
<h2 id="属性说明">属性说明</h2>
<table>
<thead>
<tr>
<th>属性</th>
<th>说明</th>
<th>类型</th>
<th>默认值</th>
</tr>
</thead>
<tbody><tr>
<td>labelWidth</td>
<td>标签宽度</td>
<td>number,string</td>
<td>无</td>
</tr>
<tr>
<td>disabled</td>
<td>禁用表单（禁止表单内所有输入组件）</td>
<td>boolean</td>
<td>无</td>
</tr>
</tbody></table>
<pre><demo-wrapper>
<comp0></comp0>
<template #code><code-container>
  &lt;template&gt;
  &lt;div&gt;
    &lt;d-form label-width="120px"&gt;
      &lt;d-form-item label="aaa"&gt;
        &lt;a-input/&gt;
      &lt;/d-form-item&gt;
      &lt;d-form-item
          label="bbb"
          :label-col="{span: 8}"
          :wrapper-col="{span: 16}"&gt;
        &lt;a-input/&gt;
      &lt;/d-form-item&gt;
      &lt;d-form-item
          label="ccc"
          label-width="180px"&gt;
        &lt;a-input/&gt;
      &lt;/d-form-item&gt;
    &lt;/d-form&gt;
    &lt;d-form&gt;
      &lt;d-form-item label="aaa"&gt;
        &lt;a-input/&gt;
      &lt;/d-form-item&gt;
    &lt;/d-form&gt;
    &lt;a-form&gt;
      &lt;a-form-item label="bbb"&gt;
        &lt;a-input/&gt;
      &lt;/a-form-item&gt;
    &lt;/a-form&gt;
  &lt;/div&gt;
&lt;/template&gt;
&lt;script lang="ts"&gt;
  import {defineComponent, ref} from 'vue';
  import {registerAntd, FieldTypes} from '../../schema-form';

  registerAntd();
  export default defineComponent({
    name: 'Demo',
    setup() {
      const value = ref();
      const rangeValue = ref([]);
      const rangeValue2 = ref(null);
      const rangeValue3 = ref({
        timerange: ['12:02-12:44', '13:44-15:44']
      });
      return {
        value,
        rangeValue,
        rangeValue2,
        rangeValue3,
        schema: {
          fields: {
            image: {
              type: FieldTypes.Picture,
              props: {
                action: '/api/business_entity/file/upload',
                data: {
                  access_token: '90fa61ca-1e96-42ed-ba91-5ae2c2e1ed20'
                }
              }
            },
            file: {
              type: FieldTypes.File,
              props: {
                action: '/api/business_entity/file/upload',
                data: {
                  access_token: '90fa61ca-1e96-42ed-ba91-5ae2c2e1ed20'
                }
              }
            },
            timerange: {
              title: 'time',
              type: 'timerange',
              array: true,
              props: {
                format: 'HH:mm',
                valueType: 'string'
              }
            }
          }
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