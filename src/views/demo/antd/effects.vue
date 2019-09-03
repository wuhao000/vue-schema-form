<template>
  <ae-layout class="demo-wrapper">
    <ae-layout-content>
      <!--      <a-schema-form v-model="value"-->
      <!--                     class="demo-form"-->
      <!--                     :actions="actions"-->
      <!--                     :schema="definition"-->
      <!--                     :effects="effects"-->
      <!--                     :props="props"></a-schema-form>-->
      <a-schema-form v-model="value2"
                     style="width:800px"
                     title="Block1"
                     :actions="actions"
                     :effects="effects2"
                     :schema="schema2"/>
    </ae-layout-content>
  </ae-layout>
</template>
<script lang="tsx">
  import SchemaForm from '@/index';
  import FormBlock from '@/schema-form/layout/form-block';
  import {FormDescriptor} from '@/types/bean';
  import {EffectsContext} from '@/types/form';
  import {getProps} from '@/views/demo/utils';
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import effects1 from '../schema/effects1.json';
  import effects2 from '../schema/effects2.json';

  Vue.component('FormBlock', FormBlock);
  SchemaForm.registerAntd();
  @Component({
    name: 'DesktopEdit'
  })
  export default class DesktopEdit extends Vue {

    public definition: FormDescriptor = effects1;
    public props = getProps();

    public schema2 = effects2;

    public value = {
      f1: {
        aa: true,
        cc: true
      }
    };

    public value2 = [{
      basic: {
        bb: 'a',
        gg: 'fffff'
      },
      dd: [{
        ee: '是',
        ff: '是'
      }]
    }, {
      basic: {
        bb: 'c',
        cc: '1',
        gg: '1111'
      },
      dd: [{
        ee: '否',
        ff: '是'
      }]
    }];

    get actions() {
      return [{
        text: '提交',
        props: {type: 'primary'},
        action: ($) => {
          console.log($);
        }
      }, {
        text: '重置',
        action: () => {

        }
      }, {
        text: '切换MM',
        action: ($) => {
          $('kk.mm').toggle();
        }
      }, {
        text: '校验',
        action: ($: EffectsContext) => {
          $.validate((errors) => {
            console.log(errors);
          });
        }
      }];
    }

    public created() {
      SchemaForm.registerAntd();
    }

    public effects($: EffectsContext) {
      $('f1.aa').onFieldChange((value) => {
        if (value) {
          $('f1.bb').hide();
        } else {
          $('f1.bb').show();
        }
      });
      $('f1.cc').onFieldChange((value) => {
        if (value) {
          $('$card2').hide();
        } else {
          $('$card2').show();
        }
      });

    }

    public effects2($: EffectsContext) {
      $('?.basic.bb').onFieldChange((value, path) => {
        const updatePath = path.substr(0, path.indexOf('.')) + '.basic.cc';
        if (value === 'a') {
          $(updatePath).setFieldProps({loading: true});
          setTimeout(() => {
            $(updatePath).setEnum(['1']);
            $(updatePath).setFieldProps({loading: false});
          }, 1000);
        } else if (value === 'b') {
          $(updatePath).setFieldProps({loading: true});
          setTimeout(() => {
            $(updatePath).setEnum(['1', '2']);
            $(updatePath).setFieldProps({loading: false});
          }, 1000);
        }
      });
      $('?.dd.?.ee').onFieldChange((value, path) => {
        if (value === '是') {
          $(path).takePath(1).appendPath('basic.gg').hide();
        } else if (value === '否') {
          $(path).takePath(1).appendPath('basic.gg').show();
        }
      });
      $('?.dd.?.ff').onFieldChange((value, path) => {
        if (value === '是') {
          $(path).takePath(3).appendPath('ee').hide();
        } else if (value === '否') {
          $(path).takePath(3).appendPath('ee').show();
        }
      });
      $('?.basic.cc').setEnum([{
        label: '1111', value: '1111'
      }, {
        label: '2222', value: '2222'
      }]);
    }
  }
</script>
