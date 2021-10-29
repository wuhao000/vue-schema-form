<template>
  <a-layout class="bg-white" style="padding-bottom: 20px;">
    <a-layout-content>
      <a-layout-content class="demo-wrapper">
        <code class="markdown-body">
          <h1 id="内置的表单项类型">内置的表单项类型</h1>
<table>
<thead>
<tr>
<th>类型</th>
<th>类型描述</th>
<th>Ant Design Vue组件</th>
<th>Antd Mobile Vue组件</th>
</tr>
</thead>
<tbody><tr>
<td>string</td>
<td>单行文本</td>
<td>a-input</td>
<td>m-input</td>
</tr>
<tr>
<td>text</td>
<td>长文本</td>
<td>a-textarea</td>
<td>m-textarea</td>
</tr>
<tr>
<td>url</td>
<td>链接（目前和string一样）</td>
<td>a-input</td>
<td>m-input</td>
</tr>
<tr>
<td>date</td>
<td>日期</td>
<td>a-date-picker</td>
<td>m-date-picker-item</td>
</tr>
<tr>
<td>select</td>
<td>弹出单选或多选</td>
<td>a-select</td>
<td>m-radio-popup-list(单选)或m-checkbox-popup-list(多选)</td>
</tr>
<tr>
<td>number</td>
<td>数值</td>
<td>a-input-number</td>
<td>m-input</td>
</tr>
<tr>
<td>boolean</td>
<td>布尔值</td>
<td>a-switch</td>
<td>m-switch-item</td>
</tr>
<tr>
<td>expand-select</td>
<td>展开单选或多选</td>
<td>a-radio-group(单选)或a-checkbox-group(多选)</td>
<td>m-radio-list(单选)或m-checkbox-list(多选)</td>
</tr>
<tr>
<td>year</td>
<td>年份选择</td>
<td>无</td>
<td>m-date-picker-item</td>
</tr>
<tr>
<td>datetime</td>
<td>日期</td>
<td>a-date-picker</td>
<td>m-date-picker-item</td>
</tr>
<tr>
<td>month</td>
<td>日期</td>
<td>a-date-picker</td>
<td>m-date-picker-item</td>
</tr>
<tr>
<td>time</td>
<td>事件</td>
<td>a-date-picker</td>
<td></td>
</tr>
<tr>
<td>transfer</td>
<td>穿梭框</td>
<td>a-transfer</td>
<td>无</td>
</tr>
<tr>
<td>cascader</td>
<td>级联选择</td>
<td>a-cascader</td>
<td>m-picker</td>
</tr>
<tr>
<td>rate</td>
<td>评分</td>
<td>a-rate</td>
<td>无</td>
</tr>
<tr>
<td>object</td>
<td>表单对象</td>
<td>内置</td>
<td>内置</td>
</tr>
</tbody></table>
<h2 id="内置布局组件">内置布局组件</h2>
<h3 id="grid">grid</h3>
<p>栅格布局</p>
<h3 id="block">block</h3>
<p>数组布局</p>

        </code>
      </a-layout-content>
      <code-wrapper :code="code0" :md="md0">
        <demo0/>
      </code-wrapper>
<code-wrapper :code="code1" :md="md1">
        <demo1/>
      </code-wrapper>
    </a-layout-content>
  </a-layout>
</template>
<script lang="ts">
  import {defineComponent} from 'vue';
  import CodeWrapper from '../../components/code-wrapper.vue';
  import demo0 from '../../doc/demo/types/demo1.vue';
  import demo1 from '../../doc/demo/types/demo2.vue';
  import code0 from './demo/types/demo1.vue.txt';
  import code1 from './demo/types/demo2.vue.txt';

  export default defineComponent({
    name: 'DocEffects',
    components: {CodeWrapper, demo0, demo1},
    setup() {
      return {code0, code1};
    }
  });
</script>
