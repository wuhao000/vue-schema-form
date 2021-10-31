<template>
  <div class="markdown-body">
    <h1 id="内置布局组件">内置布局组件</h1>
<blockquote>
<p>布局类型同样使用<code>type</code>来指定, 布局组件不会影响数据的层级
使用<code>layout</code>属性（非必须）指定布局格式</p>
</blockquote>
<h2 id="grid-栅格布局">grid 栅格布局</h2>
<demo-wrapper>
<comp0></comp0>
<template #code><code-container>
  &lt;template&gt;
  &lt;div&gt;
    &lt;v-schema-form :schema="schema"/&gt;
  &lt;/div&gt;
&lt;/template&gt;
&lt;script lang="ts"&gt;
  import {registerAntd} from '../../schema-form';

  registerAntd();
  export default {
    name: 'GridLayoutDemo',
    data() {
      return {
        schema: {
          props: {
            labelPosition: 'left'
          },
          fields: {
            $grid: {
              title: '高级选项',
              type: 'grid',
              layout: [12, {
                span: 10,
                push: 2
              }, 6, 12, 6],
              props: {
                gutter: 20
              },
              fields: {
                other: {
                  title: '其他0',
                  type: 'string'
                },
                other2: {
                  title: '其他2',
                  type: 'string'
                },
                other3: {
                  title: '其他2',
                  type: 'string'
                },
                other4: {
                  title: '其他2',
                  type: 'string'
                },
                other5: {
                  title: '其他2',
                  type: 'string'
                }
              }
            }
          }
        }
      };
    }
  };
&lt;/script&gt;

</code-container></template>
</demo-wrapper>
<h2 id="steps-分步组件">steps 分步组件</h2>
<h3 id="组件属性">组件属性</h3>
<table>
<thead>
<tr>
<th>属性名称</th>
<th>说明</th>
<th>类型</th>
</tr>
</thead>
<tbody><tr>
<td>layout</td>
<td>布局，整数数组，表示每个步骤包含的表单项数量，加起来总和和fields的数量保持一致</td>
<td>integer[]</td>
</tr>
<tr>
<td>currentStep</td>
<td>当前步骤</td>
<td>integer</td>
</tr>
<tr>
<td>titles</td>
<td>步骤名称,数组长度和步骤数一致</td>
<td>string[]</td>
</tr>
</tbody></table>
<demo-wrapper>
<comp1></comp1>
<template #code><code-container>
  &lt;template&gt;
  &lt;div&gt;
    &lt;v-schema-form
        :schema="schema"
        :effects="effects"
        @ok="onOk"
        @cancel="onCancel"/&gt;
  &lt;/div&gt;
&lt;/template&gt;
&lt;script lang="ts"&gt;
  import {registerAntd} from '../../schema-form';
  import {EffectsContext} from '../../../types';

  registerAntd();
  export default {
    name: 'StepsLayoutDemo',
    setup() {
      return {
        onCancel: () =&gt; {
          console.log('cancel');
        },
        onOk: () =&gt; {
          console.log('ok');
        },
        schema: {
          props: {
            labelWidth: 120,
            labelPosition: 'left'
          },
          fields: [{
            type: 'steps',
            id: 'steps',
            layout: [1, 1, 1],
            props: {
              titles: ['基本信息', '高级设置', '校验规则']
            },
            fields: [
              {
                property: 'name',
                title: '名称',
                type: 'string'
              },
              {
                property: 'date',
                title: '日期',
                type: 'date'
              },
              {
                property: 'integer',
                title: '数值',
                type: 'integer'
              }
            ]
          }]
        }
      };
    }
  };
&lt;/script&gt;

</code-container></template>
</demo-wrapper>
</div>
</template>
<script lang="ts" setup>
  import  comp0 from './comp0.vue';
  import  comp1 from './comp1.vue';
</script>