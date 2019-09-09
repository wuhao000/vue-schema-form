<template>
  <ae-layout class="bg-whte">
    <ae-layout-content class="demo-wrapper">
      <v-schema-form v-model="value"
                     :effects="effects"
                     :schema="schema"></v-schema-form>
      <show-value :value="value"></show-value>
    </ae-layout-content>
  </ae-layout>
</template>

<script lang="ts">
  import SchemaForm from '@/schema-form';
  import {SchemaFormField} from '@/types/bean';
  import {EffectsContext} from '@/types/form';
  import ShowValue from '@/views/demo/show-value';
  import sum from 'lodash.sum';
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component({
    name: 'default',
    components: {ShowValue}
  })
  export default class DefaultValue extends Vue {

    public schema: SchemaFormField = {
      props: {
        labelWidth: '150px'
      },
      fields: {
        text: {
          title: '字段1',
          type: 'string',
          placeholder: '请输入',
          default: 'abc'
        },
        select: {
          title: '字段2',
          type: 'select',
          enum: [{label: '1', value: 1}, {label: '2', value: 2}],
          default: 2
        },
        date: {
          title: '日期',
          type: 'date'
        },
        calc: {
          editable: false,
          title: '工龄（自动计算）',
          type: 'string',
          default: '111'
        },
        sub: {
          type: 'object',
          title: '子表单',
          array: true,
          arrayComponent: 'block',
          fields: {
            num: {
              type: 'number',
              title: '金额'
            }
          }
        },
        sum: {
          editable: false,
          title: '总金额',
          value: 0,
          type: 'number'
        }
      }
    };

    public value = {};

    public created() {
      SchemaForm.registerElement();
    }

    public effects($: EffectsContext) {
      $('date').onFieldCreateOrChange((v: Date) => {
        if (v) {
          const months = (new Date().getFullYear() - v.getFullYear()) * 12 + new Date().getMonth() - v.getMonth();
          const year = Math.floor(months / 12);
          const month = months % 12;
          $('calc').value(year + '年' + month + '个月');
        } else {
          $('calc').value('-');
        }
      });
      $('sub.?.num').onFieldCreateOrChange((v) => {
        $('sum').value(sum($('sub.?.num').value()));
      });
    }
  }
</script>

<style scoped lang="less">

</style>
