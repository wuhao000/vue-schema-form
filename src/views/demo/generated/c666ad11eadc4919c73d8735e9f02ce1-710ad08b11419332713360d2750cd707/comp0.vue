
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
  import {defineComponent, ref, Ref} from 'vue';
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
            title: '中文名称',
            required: true
          },
          name2: {
            type: 'string',
            title: '中文名称2',
          },
          persistent: {
            type: 'boolean',
            title: '是否持久化'
          },
          modules: {
            title: '启用模块',
            type: 'select',
            array: true,
            enum: [
              {label: '团队', value: 'team'},
              {label: '文件', value: 'file'}
            ]
          },
          notes: {
            type: 'text',
            title: '备注'
          }
        }
      };
      const value = ref({
        name: 'a'
      });
      const context: Ref<EffectsContext> = ref(null);
      const enable = ref(true);
      const editable = ref(true);
      const effects = ($: EffectsContext) => {
        context.value = $;
        $('name').onFieldCreateOrChange((v) => {
          if (v.length > 1) {
            $('name2').required(true);
          } else {
            $('name2').required(false);
          }
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
      const form = ref()
      const validate = async () => {
        const a = await form.value.validate();
        console.log(a);
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