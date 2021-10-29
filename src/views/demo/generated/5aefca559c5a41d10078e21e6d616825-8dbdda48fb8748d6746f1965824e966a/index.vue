<template>
  <div class="markdown-body">
    <pre><demo-wrapper>
<comp0></comp0>
<template #code><code-container>
&lt;template&gt;
  &lt;a-layout class="demo-wrapper"&gt;
    &lt;a-layout-content&gt;
      &lt;v-schema-form v-model:value="value"
                     :props="props"
                     :schema="schema"
                     class="demo-form"
                     @ok="() =&gt; {}"
                     @reset="() =&gt; {}"&gt;&lt;/v-schema-form&gt;
      &lt;show-value :value="value"/&gt;
    &lt;/a-layout-content&gt;
  &lt;/a-layout&gt;
&lt;/template&gt;
&lt;script lang="tsx"&gt;

import {registerAntd} from '../../../schema-form/antd';
import ShowValue from '../show-value';

registerAntd();
export default {
  components: {ShowValue},
  setup() {
    return {
      props: {
        labelCol: 8,
        wrapperCol: 6
      },
      schema: {
        fields: {
          aaa: {
            type: 'string',
            title: '字段1'
          },
          bbb: {
            type: 'number',
            title: '字段2'
          },
          ccc: {
            type: 'date',
            title: '字段3'
          }
        }
      },
      value: {}
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