<template>
  <a-layout class="bg-whte">
    <a-layout-content class="demo-wrapper">
      <v-schema-form v-model="value"
                     :effects="effects"
                     :schema="schema"></v-schema-form>
      <v-schema-form v-model="value2"
                     :schema="schema2"></v-schema-form>
      <show-value :value="value"></show-value>
      <el-button @click="setValue">赋值</el-button>
    </a-layout-content>
  </a-layout>
</template>
<script lang="ts">
  import {SchemaForm} from '../../../main';
  import ShowValue from '../show-value';
  import sum from 'lodash.sum';
  import {EffectsContext, SchemaFormField} from '../../../../types';
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
          default: ['abc', 'def'],
          arrayProps: {
            addBtnText: '添加文本',
            addBtnProps: {
              text: true
            },
            showRemoveBtn: false,
            maxLength: 2
          },
          array: true
        },
        text2: {
          type: 'string',
          title: 'text2'
        },
        select: {
          title: '字段2',
          type: 'select',
          enum: [{label: '是', value: 1}, {label: '否', value: 0}],
          default: 0
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
          description: '子表单金额的总和',
          default: 0,
          type: 'number'
        }
      }
    };
    public schema2 = {
      props: {
        labelWidth: '70px'
      },
      fields: {
        mobileNo: {
          title: '来电号码',
          type: 'string'
        },
        phoneMark: {
          type: 'select',
          title: '来电类型',
          props: {valueProperty: 'code', labelProperty: 'name'}
        },
        name: {
          title: '姓名',
          type: 'string'
        },
        gender: {
          type: 'select',
          title: '性别',
          enum: [{
            label: '男',
            value: '1'
          }, {
            label: '女',
            value: '0'
          }]
        },
        identifyType: {
          type: 'select',
          title: '证件类型',
          props: {valueProperty: 'code', labelProperty: 'name'}
        },
        identifyNumber: {
          title: '证件号码',
          type: 'string'
        },
        licenseNumber: {
          title: '执业证号',
          type: 'string'
        },
        lawFirm: {
          type: 'string',
          title: '所属律所'
        },
        enterpriseId: {
          type: 'string',
          title: '单位',
          visible: false
        },
        job: {
          type: 'string',
          title: '职业',
          visible: false
        },
        address: {
          type: 'string',
          title: '地址',
          visible: false
        }
      }
    };
    public value: any = {
      text: ['ef']
    };

    public value2: any = {
      id: 'abc',
      callerType: 1,
      mobileNo: '',
      phoneMark: 'normal',
      callTimes: 1,
      name: '',
      gender: '1',
      identifyType: 'residentIdentityCard',
      identifyNumber: '',
      licenseNumber: '',
      lawFirm: '',
      enterpriseId: '',
      job: '',
      address: '',
      extendAttributes: {}
    };

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

    public setValue() {
      this.value = {
        text: ['a', 'b', 'c'],
        text2: 'abc'
      };
      this.value2 = {
        address: '',
        callTime: '0',
        callTimes: '1',
        callerType: 1,
        enterpriseId: '',
        firstCallTimes: '0',
        gender: '1',
        id: 'a78e393f46f74dc29211a3a6c7b1d730',
        identifyNumber: '',
        identifyType: 'residentIdentityCard',
        job: '',
        lawFirm: '',
        licenseNumber: '',
        mobileNo: '',
        name: 'afdsa',
        phoneMark: ''
      };
    }
  }
</script>
<style scoped lang="less">
</style>
