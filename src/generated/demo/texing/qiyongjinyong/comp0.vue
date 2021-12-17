
<template>
  <div>
    <v-schema-form
        ref="form"
        v-model:value="value"
        :schema="schema"
        :effects="effects"/>
    <a-button @click="validate">校验</a-button>
    <a-button @click="disableOrEnable">启用禁用</a-button>
    <a-button @click="editableOrReadonly">编辑/禁止编辑</a-button>
  </div>
</template>
<script lang="ts">
  import {defineComponent, ref} from 'vue';
  import {EffectsContext} from '../../../../../types';
  import {registerAntd} from '../../../../schema-form';

  export default defineComponent({
    name: 'Demo',
    setup() {
      const schema = {
        props: {
          labelWidth: '100px'
        },
        fields: {
          name: {
            type: 'string',
            title: '名称',
            required: true
          },
          name2: {
            type: 'select',
            title: '选择',
          }
        }
      };
      const value = ref({
        name: 'a'
      });
      const context = ref<EffectsContext>(null);
      const enable = ref(true);
      const editable = ref(true);
      const effects = ($: EffectsContext) => {
        context.value = $;
        $('name').onFieldCreateOrChange((v) => {
          if (v.length > 2) {
            $('name2').required(true);
          } else {
            $('name2').required(false);
          }
        });
      };

      registerAntd();

      const editableOrReadonly = () => {
        editable.value = !editable.value;
        context.value('*').editable(editable.value);
      };
      const disableOrEnable = () => {
        enable.value = !enable.value;
        context.value('*').enable(enable.value);
      };
      const form = ref()
      const validate = async () => {
        return context.value.validate();
      }
      return {
        schema,
        value,
        form,
        validate,
        disableOrEnable,
        editableOrReadonly,
        effects
      };
    },
    data() {
      return {};
    },
    created() {
      registerAntd();
    },
    methods: {}
  });
</script>
