```vue
<template>
  <a-layout class="demo-wrapper">
    <a-layout-content>
      <m-list section>
        <m-input/>
        <m-input/>
        <m-input/>
        <m-input/>
      </m-list>
      <v-schema-form v-model:value="options"
                     :schema="optionFormDefinition" inline
                     platform="mobile"></v-schema-form>
      <v-schema-form v-model:value="value"
                     :disabled="options.disabled"
                     :editable="!options.displayMode"
                     :loading="options.loading"
                     :readonly="options.readonly"
                     :schema="definition"
                     :sticky="options.sticky"
                     class="demo-form"
                     platform="mobile"/>
    </a-layout-content>
  </a-layout>
</template>
<script lang="tsx">
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
</script>

```
