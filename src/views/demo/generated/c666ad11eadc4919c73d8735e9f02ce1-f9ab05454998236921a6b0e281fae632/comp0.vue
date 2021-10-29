<template>
  <a-layout>
    <a-layout-content>
      <v-schema-form
          v-model:value="value"
          platform="desktop"
          :schema="schema"
          class="basic-info-form bg-white"
          @ok="onSubmit"
      >
      </v-schema-form>
    </a-layout-content>
  </a-layout>
</template>
<script lang="ts">
  import {defineComponent, ref} from 'vue';
  import { SchemaFormField } from '../../../../../types';
  import {registerAntd} from '../../../../schema-form';

  registerAntd();

  export default defineComponent({
    name: 'BasicSetting',
    setup() {
      const value = ref({});

      return {
        value,
        schema: {
          fields: [{
            property: 'string',
            required: true,
            title: '必填校验',
            type: 'string'
          }, {
            property: 'string2',
            required: true,
            title: '长度校验',
            type: 'string',
            min: 10,
            default: 'abcde'
          }, {
            property: 'string2',
            required: true,
            title: '长度校验',
            type: 'string',
            max: 5,
            default: 'abcdeefg'
          }, {
            property: 'number',
            required: true,
            title: '最小值校验',
            type: 'number',
            min: 10,
            default: 3
          }, {
            property: 'number',
            required: true,
            title: '最大值校验',
            type: 'number',
            max: 5,
            default: 10
          }, {
            property: 'email',
            required: true,
            title: '邮箱校验',
            type: 'string',
            default: '1234',
            rules: ['email']
          }, {
            property: 'idcard',
            required: true,
            title: '身份证号校验',
            type: 'string',
            default: '1234',
            rules: ['idcard']
          }, {
            property: 'ipv4',
            required: true,
            title: 'ipv4校验',
            type: 'string',
            default: '1234',
            rules: ['ipv4']
          }, {
            property: 'ipv6',
            required: true,
            title: 'ipv4校验',
            type: 'string',
            default: '1234',
            rules: ['ipv6']
          }, {
            property: 'phone',
            required: true,
            title: '电话号码校验',
            type: 'string',
            default: '1234',
            rules: ['phone']
          }, {
            property: 'url',
            required: true,
            title: '链接地址校验',
            type: 'string',
            default: '1234',
            rules: ['url']
          }]
        } as SchemaFormField,
        onSubmit: () => {

        }
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