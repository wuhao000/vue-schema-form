<template>
  <div class="markdown-body">
    <pre><demo-wrapper>
<comp0></comp0>
<template #code><code-container>
  
&lt;template&gt;
  &lt;div&gt;
    &lt;d-time-picker v-model:value="value"&gt;&lt;/d-time-picker&gt;
    {{ value }}
  &lt;/div&gt;
  &lt;div&gt;
    &lt;d-time-range-picker v-model:value="rangeValue"&gt;&lt;/d-time-range-picker&gt;
    {{ rangeValue }}
  &lt;/div&gt;
  &lt;div&gt;
    {{ rangeValue3 }}
    &lt;v-schema-form
        v-model:value="rangeValue3"
        :schema="schema"/&gt;
  &lt;/div&gt;
  &lt;div&gt;
    &lt;d-time-range-picker
        v-model:value="rangeValue2"
        value-type="string"
        format="HH:mm"&gt;&lt;/d-time-range-picker&gt;
    {{ rangeValue2 }}
  &lt;/div&gt;
&lt;/template&gt;
&lt;script lang="ts"&gt;
  import {DTimePicker, DTimeRangePicker, registerAntd} from '../../../schema-form';
  import {defineComponent, ref} from 'vue';

  registerAntd();
  export default defineComponent({
    name: 'Demo',
    components: {DTimePicker, DTimeRangePicker},
    setup() {
      const value = ref('');
      const rangeValue = ref([]);
      const rangeValue2 = ref(null);
      const rangeValue3 = ref({
        timerange: ["12:02-12:44", "13:44-15:44"]
      });
      return {
        value,
        rangeValue,
        rangeValue2,
        rangeValue3,
        schema: {
          fields: {
            timerange: {
              title: 'time',
              type: 'timerange',
              array: true,
              props: {
                format: 'HH:mm',
                valueType: 'string'
              }
            }
          }
        }
      };
    }
  });
&lt;/script&gt;

</code-container></template>
</demo-wrapper></pre>
</div>
</template>
<script lang="ts" setup>
  import  comp0 from './comp0.vue';
</script>