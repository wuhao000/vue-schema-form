<template>
  <ae-layout>
    <ae-layout-content>
      <v-schema-form v-model="value"
                     platform="mobile"
                     style="width: 800px"
                     :effects="effects"
                     :schema="schema"/>
    </ae-layout-content>
  </ae-layout>
</template>
<script lang="ts">
  import {EffectsContext} from '@/types/form';
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component({
    name: 'MobileEffects'
  })
  export default class MobileEffects extends Vue {

    public schema = {
      fields: {
        familyInfo: {
          title: '家庭信息',
          array: true,
          type: 'object',
          arrayProps: {
            addBtnText: '添加家庭信息'
          },
          fields: [
            {
              property: 'hasChild',
              title: '有无子女',
              type: 'boolean'
            },
            {
              property: 'name',
              title: '子女姓名',
              type: 'string',
              visible: false
            },
            {
              property: 'sex',
              title: '子女性别',
              'type': 'select',
              'props': {
                'type': 'sex'
              },
              'visible': false
            },
            {
              'property': 'birthday',
              'title': '子女出生日期',
              'type': 'date',
              'visible': false
            }
          ]
        }
      }
    };
    public value = {};

    public created() {
      setTimeout(() => {
        this.value = {
          name: '张三',
          familyInfo: [{
            hasChild: true
          }, {
            hasChild: false
          }]
        };
      }, 1000);
    }

    public effects($: EffectsContext) {
      const cb = (value) => {
        if (value) {
          $('familyInfo.*').show();
          $('familyInfo.?.hasChild').hide();
        } else {
          $('familyInfo.*').hide();
        }
        $('familyInfo.0.hasChild').show();
      };
      $('familyInfo.0.hasChild')
        .onFieldCreate(cb)
        .onFieldChange(cb);
    }
  }
</script>
