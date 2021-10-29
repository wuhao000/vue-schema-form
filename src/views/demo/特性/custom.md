```vue

<template>
  <v-schema-form
      v-model:value="value"
      :effects="effects"
      :schema="schema"/>
</template>
<script lang="tsx">
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
        effects: ($: EffectsContext) => {
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
                forArray: false,
                forInput: true,
                platform: 'desktop',
                component: {
                  name: 'CustomField',
                  props: {
                    value: String
                  },
                  setup(props, {emit}) {
                    const localValue = ref(props.value);
                    watch(() => localValue.value, v => {
                      emit('update:value', v);
                    });
                    return {
                      localValue
                    };
                  },
                  render() {
                    return <a-input v-model={[this['localValue'], 'value']}/>;
                  }
                },
                getProps: () => {
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
</script>
```
