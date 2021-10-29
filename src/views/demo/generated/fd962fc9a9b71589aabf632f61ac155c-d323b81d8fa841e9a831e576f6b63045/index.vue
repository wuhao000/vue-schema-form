<template>
  <div class="markdown-body">
     <h1 id="表单联动">表单联动</h1>

    <pre>
      <demo-wrapper>
        <comp0></comp0>
        <template #code><code-container>&lt;template&gt; &lt;a-layout class="demo-wrapper"&gt; &lt;a-layout-content&gt;
          &lt;v-schema-form v-model:value="value3" :effects="effects3" :schema="definition3"/&gt;
          &lt;v-schema-form v-model:value="value" :actions="actions" :effects="effects"
          :schema="definition" class="demo-form"&gt;&lt;/v-schema-form&gt; &lt;/a-layout-content&gt;
          &lt;/a-layout&gt; &lt;/template&gt; &lt;script lang="ts"&gt; import {registerAntd}
          from '../../../schema-form/antd'; import {SchemaFormEvents} from '../../../schema-form/internal/utils';
          import {EffectsContext} from '../../../../types'; import {message} from
          'ant-design-vue'; import {defineComponent, ref} from 'vue'; import effects1
          from '../schema/effects1'; import effects2 from '../schema/effects2'; registerAntd();
          export default defineComponent({ name: 'Demo', setup() { const value3 =
          ref({}); const value2 = ref([{ basic: { bb: 'a', gg: 'fffff' }, dd: [{
          ee: '是', ff: '是' }] }, { basic: { bb: 'c', cc: '1', gg: '1111' }, dd: [{
          ee: '否', ff: '是' }] }]); const value = ref({ f1: { aa: true, cc: true }
          }); const actions = [{ text: '提交', props: {type: 'primary'}, action: ($)
          =&gt; { console.log($); } }, { text: '重置', action: () =&gt; { console.log('reset');
          } }, { text: '切换MM', action: ($) =&gt; { $('kk.mm').toggle(); } }, { text:
          '校验', action: ($: EffectsContext) =&gt; { $.validate((errors) =&gt; { message.error(errors);
          }); } }]; return { value3, effects3: ($: EffectsContext) =&gt; { $('text').subscribe(SchemaFormEvents.fieldKeydown,
          (e) =&gt; { console.log(e); }).onFieldCreateOrChange((v) =&gt; { console.log(v);
          }); }, definition3: { fields: { text: { type: 'string', title: 'abc' }
          } }, value2, value, actions, definition: effects1, effects: ($: EffectsContext)
          =&gt; { $('f1.aa').onFieldCreateOrChange((value) =&gt; { if (value) { $('f1.bb').hide();
          } else { $('f1.bb').show(); } }); $('f1.cc').onFieldCreateOrChange((value)
          =&gt; { if (value) { $('$card2').hide(); } else { $('$card2').show(); }
          }); }, effects2: ($) =&gt; { const cb1 = (value, path) =&gt; { const updatePath
          = path.substr(0, path.indexOf('.')) + '.basic.cc'; if (value === 'a') {
          $(updatePath).setFieldProps({loading: true}); setTimeout(() =&gt; { $(updatePath).setEnum(['1']);
          $(updatePath).setFieldProps({loading: false}); }, 1000); } else if (value
          === 'b') { $(updatePath).setFieldProps({loading: true}); setTimeout(()
          =&gt; { $(updatePath).setEnum(['1', '2']); $(updatePath).setFieldProps({loading:
          false}); }, 1000); } }; $('?.basic.bb').onFieldCreateOrChange(cb1); const
          cb2 = (value, path) =&gt; { if (value === '是') { $(path).takePath(1).appendPath('basic.gg').hide();
          } else if (value === '否') { $(path).takePath(1).appendPath('basic.gg').show();
          } }; $('?.dd.?.ee').onFieldCreateOrChange(cb2); $('?.dd.?.ff').onFieldCreateOrChange((value,
          path) =&gt; { if (value === '是') { $(path).takePath(3).appendPath('ee').hide();
          } else if (value === '否') { $(path).takePath(3).appendPath('ee').show();
          } }); $('?.basic.cc').setEnum([{ label: '1111', value: '1111' }, { label:
          '2222', value: '2222' }]); }, schema2: effects2 }; } }); &lt;/script&gt;</code-container></template>
      </demo-wrapper>
    </pre>
  </div>
</template>
<script lang="ts" setup>
  import  comp0 from './comp0.vue';
</script>