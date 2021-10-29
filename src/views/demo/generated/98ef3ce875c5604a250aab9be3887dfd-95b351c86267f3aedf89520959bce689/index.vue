<template>
  <div class="markdown-body">
    <pre><demo-wrapper>
<comp0></comp0>
<template #code><code-container>
&lt;template&gt;
  &lt;a-layout class="demo-wrapper"&gt;
    &lt;a-layout-content&gt;
      {{ date1 }}
      &lt;van-datetime-picker v-model="date1"
                           type="date"/&gt;
      &lt;!--      &lt;v-schema-form v-model:value="options"--&gt;
      &lt;!--                     :schema="optionFormDefinition" inline--&gt;
      &lt;!--                     platform="mobile"&gt;&lt;/v-schema-form&gt;--&gt;
      &lt;v-schema-form v-model:value="value"
                     :disabled="options.disabled"
                     :editable="!options.displayMode"
                     :loading="options.loading"
                     :props="props"
                     :readonly="options.readonly"
                     :schema="definition"
                     :sticky="options.sticky"
                     class="demo-form"
                     platform="mobile"
                     @cancel="onCancel"
                     @ok="onOk"
                     @reset="onReset"&gt;&lt;/v-schema-form&gt;
    &lt;/a-layout-content&gt;
  &lt;/a-layout&gt;
&lt;/template&gt;
&lt;script lang="tsx"&gt;

// import {registerVant} from 'v-schema-form-vant';
import {baseDemoProps, useBaseDemo} from '../base';
import {ref} from 'vue';

// registerVant();

export default {
  props: {
    ...baseDemoProps
  },
  setup(props, ctx) {
    const {definition, value} = useBaseDemo(props, ctx);
    const options = ref({
      disabled: false,
      loading: false,
      displayMode: false,
      sticky: false
    });
    const date1 = ref(new Date());
    return {
      date1,
      value,
      definition,
      options,
      optionFormDefinition: {
        title: '选项',
        props: {
          inline: true,
          title: '选项'
        },
        fields: [{
          title: '禁用', type: 'boolean', property: 'disabled'
        }, {
          title: '加载中', type: 'boolean', property: 'loading'
        }, {
          title: '详情模式', type: 'boolean', property: 'displayMode'
        }, {
          title: '固定模式', type: 'boolean', property: 'sticky'
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