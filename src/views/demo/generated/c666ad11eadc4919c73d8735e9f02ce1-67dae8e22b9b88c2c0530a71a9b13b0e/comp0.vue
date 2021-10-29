
<template>
  <a-layout class="demo-wrapper">
    <a-layout-content>
      <v-schema-form
          v-model:value="value"
          :components="components"
          :props="props"
          :schema="definition"
          class="demo-form"/>
      <div>
        <h3 class="demo-h3">根据自定义组件的复杂解构</h3>
        <v-schema-form
            v-model:value="value2"
            :components="components"
            :schema="definition2"></v-schema-form>
      </div>
    </a-layout-content>
  </a-layout>
</template>
<script lang="tsx">
  import {EffectsContext, SchemaFormComponentOptions} from '../../../../../types';
  import {computed, ref} from 'vue';
  import {registerAntd} from '../../../../schema-form';

  const complex = (props) => {
    return <div>
      <pre>
        {JSON.stringify(props.value)}
      </pre>
    </div>;
  };

  export default {
    name: 'Demo',
    setup() {
      registerAntd();
      const value2 = ref<any>();
      const options = [
        {
          value: 'zhejiang',
          label: '浙江',
          isLeaf: false,
          loading: false,
          children: [{
            label: '杭州', value: 'hz'
          }, {
            label: '温州', value: 'wz'
          }]
        }, {
          value: 'jiangsu',
          label: '江苏',
          isLeaf: false,
          loading: false,
          children: [{
            label: '南京', value: 'nj',
            children: [{
              label: '鼓楼区', value: 'gl'
            }, {
              label: '玄武区', value: 'xw'
            }]
          }, {
            label: '苏州', value: 'sz'
          }]
        }];
      const dialogVisible = ref(false);
      const complexValue = ref<any>(null);
      return {
        value2,
        complexValue,
        components: [{
          component: complex,
          platforms: 'desktop',
          forArray: false,
          forDisplay: false,
          types: 'complex'
        } as SchemaFormComponentOptions],
        options,
        dialogVisible,
        value: {
          start: new Date(2020, 0, 1),
          end: new Date()
        },
        definition2: {
          fields: {
            button: {
              type: 'button',
              title: '点击上传复杂数据',
              wrapperProps: {
                noTitle: true
              },
              props: {
                action: ($: EffectsContext) => {
                  $('#complex').onFieldCreateOrChange((v) => {
                    complexValue.value = v;
                  }).value({
                    'aa': {
                      'bb': {
                        'cc': 123,
                        'dd': [
                          333,
                          444
                        ],
                        'ee': 'abcde'
                      }
                    }
                  });
                }
              }
            },
            '{aa:{bb:{cc:destructor1,dd:[destructor2,destructor3],ee}}}': {
              id: 'complex',
              type: 'complex',
              title: '复杂解构',
              required: true
            }
          }
        },
        definition: computed(() => {
          return {
            fields: {
              '[start, end]': {
                type: 'daterange',
                title: '时间范围'
              },
              '[province,city,town]': {
                type: 'cascader',
                title: '省市区',
                placeholder: '请选择',
                enum: options
              }
            }
          };
        })
      };
    }
  };
</script>
