<template>
  <div class="markdown-body">
    <pre>
      <demo-wrapper>
        <comp0></comp0>
        <template #code><code-container>&lt;template&gt; &lt;a-layout&gt; &lt;a-layout-content&gt; {{ formData
          }} &lt;v-schema-form v-model:value="formData" platform="desktop" :schema="formDefinition"
          class="basic-info-form bg-white"&gt; &lt;/v-schema-form&gt; &lt;/a-layout-content&gt;
          &lt;/a-layout&gt; &lt;/template&gt; &lt;script lang="ts"&gt; import {computed,
          defineComponent, ref} from 'vue'; import {registerAntd} from '../../../schema-form';
          registerAntd(); export default defineComponent({ name: 'BasicSetting',
          setup() { const formData = ref({ 'canModify': true, 'definition': {'children':
          [], 'props': {}}, 'description': '', 'icon': '', 'manageScope': {'departments':
          [], 'users': []}, 'name': '', 'platform': 'Desktop', 'type': 'Approval',
          'visibleScope': {'departments': [], 'users': []}, 'system': null, 'id':
          null, 'formGroup': null, 'dataAllowModify': null }); const formDefinition
          = computed(() =&gt; { return { fields: [{ placeholder: '请输入名称', property:
          'name', required: true, title: '表单名称', type: 'string' }] }; }); return
          { formData, formDefinition }; } }); &lt;/script&gt; &lt;style lang="less"&gt;
          .basic-info-form { background-color: white; padding: 30px; max-width: 1000px;
          margin: 0 auto; .select-group-btn { width: 100%; } } &lt;/style&gt;</code-container></template>
      </demo-wrapper>
    </pre>
  </div>
</template>
<script lang="ts" setup>
  import  comp0 from './comp0.vue';
</script>