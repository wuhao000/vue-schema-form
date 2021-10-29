<template>
  <a-layout class="demo-wrapper">
    <a-layout-content>
      <v-schema-form v-model:value="value3"
                     :effects="effects3"
                     :schema="definition3"
                     platform="mobile"/>
      <v-schema-form v-model:value="value"
                     :actions="actions"
                     :effects="effects"
                     :schema="definition"
                     class="demo-form"
                     platform="mobile"></v-schema-form>
      <!--      <v-schema-form v-model:value="value2"-->
      <!--                     :actions="actions"-->
      <!--                     :effects="effects2"-->
      <!--                     :schema="schema2"-->
      <!--                     style="width:800px"-->
      <!--                     title="Block1"/>-->
    </a-layout-content>
  </a-layout>
</template>
<script lang="ts">
import {SchemaFormEvents} from '../../../../schema-form/internal/utils';
// import {registerVant} from 'v-schema-form-vant';
import {EffectsContext} from 'types';
import {message} from 'ant-design-vue';
import {defineComponent, ref} from 'vue';
import effects1 from '../../schema/effects1';
import effects2 from '../../schema/effects2';

// registerVant();

export default defineComponent({
  setup() {
    const value3 = ref({});
    const value2 = ref([{
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
    }]);
    const value = ref({
      f1: {
        aa: true,
        cc: true
      }
    });
    const actions = [{
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
          message.error(errors);
        });
      }
    }];
    return {
      value3,
      effects3: ($: EffectsContext) => {
        $('text').subscribe(SchemaFormEvents.fieldKeydown, (e) => {
          console.log(e);
        }).onFieldCreateOrChange((v) => {
          console.log(v);
        });
      },
      definition3: {
        fields: {
          text: {
            type: 'string',
            title: 'abc'
          }
        }
      },
      value2,
      value,
      actions,
      definition: effects1,
      effects: ($: EffectsContext) => {
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
      },
      effects2: ($) => {
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
      },
      schema2: effects2
    };
  }
});
</script>