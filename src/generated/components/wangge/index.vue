<template>
  <div class="markdown-body">
    <demo-wrapper>
<comp0></comp0>
<template #code><code-container>
  
&lt;template&gt;
  &lt;v-schema-form
      v-model:value="value"
      :schema="schema"/&gt;
&lt;/template&gt;
&lt;script lang="ts"&gt;
  import {computed, defineComponent, ref} from 'vue';
  import {registerAntd} from '../../schema-form';

  registerAntd();
  export default defineComponent({
    name: 'Demo',
    setup() {
      const value = ref({});
      const setValue = () =&gt; {
        value.value = {
          a: 'aaa',
          b: 'bbb',
          name: 'cccccccc'
        };
      };
      const options = computed(() =&gt; {
        const array = [];
        for (let i = 0; i &lt; 20; i++) {
          array.push(
              {label: '第' + i, value: i}
          );
        }
        return array;
      });
      return {
        options,
        setValue,
        value,
        schema: {
          fields: [
            {
              type: 'grid',
              layout: [[4, 4], [6, {span: 6, offset: 2}, 6], [12]],
              props: {gutter: 20},
              fields: [
                {
                  property: 'a',
                  title: 'a',
                  type: 'string'
                },
                {
                  property: 'b',
                  title: 'b',
                  type: 'string'
                },
                {
                  property: 'c',
                  title: 'c',
                  type: 'string'
                },
                {
                  property: 'd',
                  title: 'd',
                  type: 'string'
                },
                {
                  property: 'e',
                  title: 'e',
                  type: 'string'
                },
                {
                  property: 'f',
                  title: 'f',
                  type: 'string'
                }
              ]
            }
          ]
        }
      };
    }
  });
&lt;/script&gt;

</code-container></template>
</demo-wrapper>
</div>
</template>
<script lang="ts" setup>
  import  comp0 from './comp0.vue';
</script>