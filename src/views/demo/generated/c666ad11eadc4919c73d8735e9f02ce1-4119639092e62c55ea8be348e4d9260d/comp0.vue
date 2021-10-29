<template>
  <div>
    <v-schema-form
        v-model:value="value"
        :schema="schema"
        :effects="effects"/>
    <a-button @click="disableOrEnable">启用禁用</a-button>
    <a-button @click="editableOrReadonly">编辑/禁止编辑</a-button>
  </div>
</template>
<script lang="ts">
  import {defineComponent, reactive, ref, Ref} from 'vue';
  import {EffectsContext, SchemaFormField} from '../../../../../types';
  import {registerAntd} from '../../../../schema-form';

  export default defineComponent({
    setup() {
      const schema = reactive({
        props: {
          labelWidth: '120px'
        },
        fields: {
          name: {
            type: 'string',
            title: '名称',
            required: true,
            events: {
              change: (v) => {
                console.log(v);
              }
            }
          } as SchemaFormField,
          text: {
            type: 'autocomplete',
            title: '自动完成',
            props: {
              onSearch: v => {
                console.log(v);
              }
            }
          }
        }
      });
      const value = reactive({
        name: 'a'
      });
      const context: Ref<EffectsContext> = ref(null);
      const enable = ref(true);
      const editable = ref(true);
      const effects = ($: EffectsContext) => {
        context.value = $;
        $('name').onFieldCreateOrChange((v) => {
          console.log(v);
        });
      };

      registerAntd();

      const editableOrReadonly = () => {
        editable.value = !editable.value;
        context.value('name').editable(editable.value);
      };
      const disableOrEnable = () => {
        enable.value = !enable.value;
        if (enable.value) {
          context.value('name').enable();
        } else {
          context.value('name').disable();
        }
      };
      return {
        disableOrEnable,
        editableOrReadonly,
        effects,
        schema,
        value
      };
    },
    created() {
      registerAntd();
    }
  });
</script>