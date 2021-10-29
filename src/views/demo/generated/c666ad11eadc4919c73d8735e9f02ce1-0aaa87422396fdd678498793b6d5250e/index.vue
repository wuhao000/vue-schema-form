<template>
  <div class="markdown-body">
    <pre><demo-wrapper>
<comp0></comp0>
<template #code><code-container>
&lt;template&gt;
  &lt;div&gt;
    &lt;Info/&gt;
    &lt;v-schema-form
ref="form"
                   v-model:value="value"
                   :schema="schema"
                   :effects="effects"/&gt;
    &lt;a-button @click="validate"&gt;校验&lt;/a-button&gt;
    &lt;a-button @click="disableOrEnable"&gt;启用禁用&lt;/a-button&gt;
    &lt;a-button @click="editableOrReadonly"&gt;编辑/禁止编辑&lt;/a-button&gt;
  &lt;/div&gt;
&lt;/template&gt;
&lt;script lang="ts"&gt;import {defineComponent, reactive, ref, Ref, watch} from 'vue';
import {EffectsContext} from '../../../../types';
import {registerAntd} from '../../../schema-form';
import Info from './info.vue';

export default defineComponent({
  components: {
    Info
  },
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
    const context: Ref&lt;EffectsContext&gt; = ref(null);
    const enable = ref(true);
    const editable = ref(true);
    const effects = ($: EffectsContext) =&gt; {
      context.value = $;
      $('name').onFieldCreateOrChange((v) =&gt; {
        if (v.length &gt; 1) {
          $('name2').required(true);
        } else {
          $('name2').required(false);
        }
      });
    };

    registerAntd();

    const editableOrReadonly = () =&gt; {
      editable.value = !editable.value;
      context.value('name').editable(editable.value);
    };
    const disableOrEnable = () =&gt; {
      enable.value = !enable.value;
      if (enable.value) {
        context.value('name').enable();
      } else {
        context.value('name').disable();
      }
    };
    const form = ref()
    const validate = async () =&gt; {
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
&lt;/script&gt;
</code-container></template>
</demo-wrapper></pre>

  </div>
</template>
<script lang="ts" setup>
  import  comp0 from './comp0.vue';
</script>