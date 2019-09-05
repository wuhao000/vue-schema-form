<template>
  <ae-layout>
    <ae-layout-content>
      <v-schema-form v-model="value2"
                     :effects="effects2"
                     :schema="schema2"
                     @ok="submit"></v-schema-form>
      <v-schema-form v-model="value"
                     platform="mobile"
                     style="width: 800px"
                     :effects="effects"
                     :schema="schema"/>
    </ae-layout-content>
  </ae-layout>
</template>
<script lang="ts">
  import SchemaForm from '@/schema-form';
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
    public schema2 = {
      props: {
        labelWidth: '90px'
      },
      fields: {
        s1: {
          type: 'string',
          title: 's1',
          notice: 'this is s1',
          wrapperProps: {extra: 'abc'}
        },
        s2: {
          type: 'string',
          required: true,
          title: 's2'
        },
        s4: {
          type: 'select',
          array: false,
          title: 's4',
          enum: [{label: '1', value: 1}, {label: '2', value: 2}]
        },
        s3: {
          type: 'button',
          title: '赋值',
          wrapperProps: {noTitle: true},
          props: {
            action: this.onClick
          }
        }
      }
    };
    public str = null;
    public value = {};
    public value2: any = {s1: '444444', s4: null};

    public created() {
      SchemaForm.registerAntdMobile();
      // SchemaForm.registerAntd();
      SchemaForm.registerElement();
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

    public effects2($) {
      $('s1', 's2')
          .onFieldBlur((p) => {
            console.log('blur:' + p);
          })
          .onFieldFocus((p) => {
            console.log('focus:' + p);
          })
          .onFieldChange((v) => {
          });
    }

    public onClick() {
      this.value2 = {s1: '11', s2: '22', s4: 1};
    }

    public submit() {
    }
  }
</script>
