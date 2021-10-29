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
  import {EffectsContext} from '../../../../../types';
  import {FieldTypes, registerAntd} from '../../../../schema-form';

  export default defineComponent({
    name: 'Demo',
    setup() {
      const schema = reactive({
        props: {
          size: 'small',
          labelWidth: '120px'
        },
        fields: [{
          array: true,
          property: 'cols',
          max: 24,
          min: 1,
          title: '栅格布局',
          type: FieldTypes.Integer
        }]
      });
      const value = reactive({
        cols: []
      });
      const context: Ref<EffectsContext> = ref(null);
      const enable = ref(true);
      const editable = ref(true);
      const effects = ($: EffectsContext) => {
        context.value = $;
        $('cols').onFieldCreateOrChange((v) => {
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