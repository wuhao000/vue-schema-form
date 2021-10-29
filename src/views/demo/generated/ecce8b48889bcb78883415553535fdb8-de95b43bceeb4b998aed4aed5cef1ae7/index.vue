<template>
  <div class="markdown-body">
    <pre><demo-wrapper>
<comp0></comp0>
<template #code><code-container>
&lt;template&gt;
  &lt;a-layout class="demo-wrapper"&gt;
    &lt;a-layout-content&gt;
      &lt;m-list section&gt;
        &lt;m-input/&gt;
        &lt;m-input/&gt;
        &lt;m-input/&gt;
        &lt;m-input/&gt;
      &lt;/m-list&gt;
      &lt;v-schema-form v-model:value="options"
                     :schema="optionFormDefinition" inline
                     platform="mobile"&gt;&lt;/v-schema-form&gt;
      &lt;v-schema-form v-model:value="value"
                     :disabled="options.disabled"
                     :editable="!options.displayMode"
                     :loading="options.loading"
                     :readonly="options.readonly"
                     :schema="definition"
                     :sticky="options.sticky"
                     class="demo-form"
                     platform="mobile"/&gt;
    &lt;/a-layout-content&gt;
  &lt;/a-layout&gt;
&lt;/template&gt;
&lt;script lang="tsx"&gt;
  import {ref} from 'vue';
  import {registerAntdMobile} from '../../../schema-form/antdm/register';
  import {baseDemoProps, useBaseDemo} from '../base';

  registerAntdMobile();

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