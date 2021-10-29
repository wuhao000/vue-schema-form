<template>
  <div class="markdown-body">
    <pre><demo-wrapper>
<comp0></comp0>
<template #code><code-container>
  &lt;template&gt;
  &lt;div&gt;
    &lt;v-schema-form
        :effects="effects"
        :schema="schema"/&gt;
  &lt;/div&gt;
&lt;/template&gt;
&lt;script lang="ts"&gt;
  import {defineComponent} from 'vue';
  import {EffectsContext, EffectsHandlers} from '../../../../types';
  import {registerAntd} from '../../../schema-form';

  registerAntd();
  export default defineComponent({
    name: 'SelectDemo',
    setup() {
      return {
        schema: {
          fields: {
            text: {
              title: 'select',
              type: 'select',
              props: {
                showSearch: true
              },
              events: {
                onSearch(this: EffectsHandlers, $: EffectsContext, input) {
                  this.trigger('search', input);
                }
              }
            },
            text2: {
              title: 'select2',
              type: 'select',
              props: {
                showSearch: true
              }
            }
          }
        },
        effects: ($: EffectsContext) =&gt; {
          $('text').subscribe('search', (v) =&gt; {
            console.log('search', v);
          });
          $('text').onFieldCreate(() =&gt; {
            setTimeout(() =&gt; {
              $('text').setEnum([
                {label: 'a', value: '1'},
                {label: 'b', value: '2'}
              ]);
            }, 200);
          });
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