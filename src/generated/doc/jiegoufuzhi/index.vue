<template>
  <div class="markdown-body">
    <h1 id="字段解构">字段解构</h1>
<p>字段解构是一个非常强大的特性，它可以对组件生产的值做解构转换，使得快速贴合服务端数据结构要求，无需再做二次转换 字段解构主要是对 property 用 ES Deconstruction 语法做解构，需要注意的是，不支持...语法</p>
<pre><demo-wrapper>
<comp0></comp0>
<template #code><code-container>
  
&lt;template&gt;
  &lt;a-layout class="demo-wrapper"&gt;
    &lt;a-layout-content&gt;
      &lt;v-schema-form
          v-model:value="value"
          :components="components"
          :props="props"
          :schema="definition"
          class="demo-form"/&gt;
      &lt;show-value 
          title="查看结果"
          :value="value"/&gt;
      &lt;div&gt;
        &lt;h3 class="demo-h3"&gt;根据自定义组件的复杂解构&lt;/h3&gt;
        &lt;v-schema-form
            v-model:value="value2"
            :components="components"
            :schema="definition2"&gt;&lt;/v-schema-form&gt;
      &lt;/div&gt;
    &lt;/a-layout-content&gt;
  &lt;/a-layout&gt;
&lt;/template&gt;
&lt;script lang="tsx"&gt;
  import {EffectsContext, SchemaFormComponentOptions} from '../../../types';
  import {computed, ref} from 'vue';
  import {registerAntd} from '../../schema-form';
  import ShowValue from '../../views/show-value.vue';
  const complex = (props) =&gt; {
    return &lt;div&gt;
      &lt;pre&gt;
        {JSON.stringify(props.value)}
      &lt;/pre&gt;
    &lt;/div&gt;;
  };
  export default {
    name: 'Demo',
    components: {ShowValue},
    setup() {
      registerAntd();
      const value2 = ref&lt;any&gt;();
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
      const complexValue = ref&lt;any&gt;(null);
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
        value: {},
        definition2: {
          fields: {
            button: {
              type: 'button',
              title: '点击上传复杂数据',
              wrapperProps: {
                noTitle: true
              },
              events: {
                onClick: ($: EffectsContext) =&gt; {
                  $('#complex').onFieldCreateOrChange((v) =&gt; {
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
        definition: computed(() =&gt; {
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
&lt;/script&gt;

</code-container></template>
</demo-wrapper></pre>
</div>
</template>
<script lang="ts" setup>
  import  comp0 from './comp0.vue';
</script>