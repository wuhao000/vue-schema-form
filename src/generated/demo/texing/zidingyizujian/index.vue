<template>
  <div class="markdown-body">
    <demo-wrapper>
<comp0></comp0>
<template #code><code-container>
  
&lt;template&gt;
  &lt;v-schema-form
      v-model:value="value"
      :effects="effects"
      :schema="schema"/&gt;
&lt;/template&gt;
&lt;script lang="tsx"&gt;
  import {defineComponent, ref, watch} from 'vue';
  import {EffectsContext, SchemaFormField} from '../../../../types';
  import {registerAntd} from '../../../schema-form';
  

  export default defineComponent({
    name: 'Demo',
    setup() {
      registerAntd();
      const value = ref({
        string1: 'bbb',
        string2: 'eee',
        string3: 'aaa'
      });
      return {
        effects: ($: EffectsContext) =&gt; {
          $('string1').hide();
          $('selectCfg').hide();
        },
        schema: {
          fields: [
            {
              property: 'string1',
              title: 'string',
              type: 'string'
            },
            {
              property: 'string2',
              title: 'string2',
              type: 'text'
            },
            {
              property: 'string3',
              title: 'string3',
              type: {
                mode: ['single', 'input'],
                platform: 'desktop',
                component: {
                  name: 'CustomField',
                  props: {
                    value: String
                  },
                  setup(props, {emit}) {
                    const localValue = ref(props.value);
                    watch(() =&gt; localValue.value, v =&gt; {
                      emit('update:value', v);
                    });
                    return {
                      localValue
                    };
                  },
                  render() {
                    return &lt;a-input v-model={[this['localValue'], 'value']}/&gt;;
                  }
                },
                getProps: () =&gt; {
                  return {};
                }
              }
            }
          ]
        } as SchemaFormField,
        value
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