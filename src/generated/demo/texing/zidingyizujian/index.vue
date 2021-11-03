<template>
  <div class="markdown-body">
    <h1 id="自定义组件">自定义组件</h1>
<pre><demo-wrapper>
<comp0></comp0>
<template #code><code-container>
  &lt;template&gt;
  &lt;v-schema-form
      v-model:value="value"
      :schema="schema"/&gt;
&lt;/template&gt;
&lt;script lang="tsx"&gt;
  import {defineComponent, ref, watch} from 'vue';
  import {EffectsContext, SchemaFormField} from '../../../../types';
  import {registerAntd} from '../../../schema-form';
  
  
  const Input = defineComponent({
    render() {
      console.log(this.$attrs);
      return &lt;div&gt;我是自定义组件&lt;/div&gt;;
    }
  })

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
        schema: {
          fields: [
            {
              property: 'string1',
              title: 'string',
              type: Input,
              props: {
                mode: 'textarea'
              }
            },
            {
              property: 'string2',
              title: 'string2',
              type: (props) =&gt; {
                return &lt;div&gt;我也是自定义组件: {props.mode}&lt;/div&gt;;
              },
              props: {
                mode: 'aaaa'
              }
            },
            {
              property: 'string3',
              title: 'string3',
              type: {
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
</demo-wrapper></pre>
</div>
</template>
<script lang="ts" setup>
  import  comp0 from './comp0.vue';
</script>