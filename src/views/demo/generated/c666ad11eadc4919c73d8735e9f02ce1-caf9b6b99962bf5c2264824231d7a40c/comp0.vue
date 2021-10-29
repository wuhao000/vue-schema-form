<template>
  <a-layout>
    <a-layout-content>
      {{ formData }}
      <v-schema-form
          v-model:value="formData"
          platform="desktop"
          :schema="formDefinition"
          class="basic-info-form bg-white">
      </v-schema-form>
    </a-layout-content>
  </a-layout>
</template>
<script lang="ts">
  import {computed, defineComponent, ref} from 'vue';
  import {registerAntd} from '../../../../schema-form';

  registerAntd();

  export default defineComponent({
    name: 'BasicSetting',
    setup() {
      const formData = ref({
        'canModify': true,
        'definition': {'children': [], 'props': {}},
        'description': '',
        'icon': '',
        'manageScope': {'departments': [], 'users': []},
        'name': '',
        'platform': 'Desktop',
        'type': 'Approval',
        'visibleScope': {'departments': [], 'users': []},
        'system': null,
        'id': null,
        'formGroup': null,
        'dataAllowModify': null
      });
      const formDefinition = computed(() => {
        return {
          fields: [{
            placeholder: '请输入名称',
            property: 'name',
            required: true,
            title: '表单名称',
            type: 'string'
          }]
        };
      });
      return {
        formData,
        formDefinition
      };
    }
  });
</script>
<style lang="less">
  .basic-info-form {
    background-color: white;
    padding: 30px;
    max-width: 1000px;
    margin: 0 auto;

    .select-group-btn {
      width: 100%;
    }
  }
</style>