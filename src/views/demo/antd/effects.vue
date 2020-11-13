<template>
  <a-layout class="demo-wrapper">
    <a-layout-content>
      <v-schema-form v-model="value3"
                     :effects="effects3"
                     :schema="definition3"/>
      <v-schema-form v-model="value"
                     class="demo-form"
                     :actions="actions"
                     :effects="effects"
                     :props="props"
                     :schema="definition"></v-schema-form>
      <v-schema-form v-model="value2"
                     style="width:800px"
                     title="Block1"
                     :actions="actions"
                     :effects="effects2"
                     :schema="schema2"/>
    </a-layout-content>
  </a-layout>
</template>
<script lang="tsx">
  import SchemaForm from '@/index';
  import {SchemaFormEvents} from '@/schema-form/internal/utils';
  import FormBlock from '@/schema-form/layout/form-block';
  import {getProps} from '@/views/demo/utils';
  import {EffectsContext, SchemaFormField} from 'v-schema-form-types';
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

    public definition: SchemaFormField = effects1;
    public props = getProps();

    public schema2 = effects2;
    public value3 = {};
    public definition3: SchemaFormField = {
      fields: {
        text: {
          type: 'string',
          title: 'abc'
        }
      }
    };

    public effects3($: EffectsContext) {
      $('text').subscribe(SchemaFormEvents.fieldKeydown, (e) => {
        console.log(e);
      });
    }

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
            // @ts-ignore
            this.$message.error(errors);
          });
        }
      }];
    }

    public created() {
      SchemaForm.registerAntd();
    }

    public effects($: EffectsContext) {
      $('f1.aa').onFieldCreateOrChange((value) => {
        if (value) {
          $('f1.bb').hide();
        } else {
          $('f1.bb').show();
        }
      });
      $('f1.cc').onFieldCreateOrChange((value) => {
        if (value) {
          $('$card2').hide();
        } else {
          $('$card2').show();
        }
      });

    }

    public effects2($: EffectsContext) {
      const cb1 = (value, path) => {
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
      };
      $('?.basic.bb').onFieldCreateOrChange(cb1);
      const cb2 = (value, path) => {
        if (value === '是') {
          $(path).takePath(1).appendPath('basic.gg').hide();
        } else if (value === '否') {
          $(path).takePath(1).appendPath('basic.gg').show();
        }
      };
      $('?.dd.?.ee').onFieldCreateOrChange(cb2);
      $('?.dd.?.ff').onFieldCreateOrChange((value, path) => {
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
