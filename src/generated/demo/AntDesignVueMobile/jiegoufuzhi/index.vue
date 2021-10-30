<template>
  <div class="markdown-body">
    <pre><demo-wrapper>
<comp0></comp0>
<template #code><code-container>
  
&lt;template&gt;
  &lt;v-schema-form
      v-model:value="value"
      :props="props"
      :schema="definition"
      class="demo-form"
      platform="mobile"&gt;&lt;/v-schema-form&gt;
  &lt;van-button
      block
      @click="dialogVisible = true"&gt;查看数据
  &lt;/van-button&gt;
  &lt;van-popup v-model:show="dialogVisible"&gt;
    &lt;div style="padding: 20px;"&gt;
      &lt;pre&gt;{{ value }}&lt;/pre&gt;
    &lt;/div&gt;
  &lt;/van-popup&gt;
&lt;/template&gt;
&lt;script lang="tsx"&gt;
  import {registerAntdMobile} from '../../../schema-form';
  import {computed, ref} from 'vue';
  import {getProps} from '../../../views/utils';

  registerAntdMobile();

  export default {
    name: 'Demo',
    setup() {
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
      const date1 = ref(new Date());
      return {
        date1,
        onConfirm(v) {
          date1.value = v;
        },
        options,
        dialogVisible,
        props: getProps(),
        value: {
          start: new Date(),
          end: new Date()
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