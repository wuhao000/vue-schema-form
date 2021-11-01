<template>
  <div class="markdown-body">
    <h1 id="事件处理">事件处理</h1>
<h2 id="配置说明">配置说明</h2>
<p>在vue3.0中，事件的传递和普通属性是一样的，因此在props直接使用onXx（例如onClick）的属性既可配置事件处理函数，例如：</p>
<pre><code-editor mode="typescript">
  const field: SchemaFormField = {
  type: 'string',
  property: 'name',
  props: {
    onClick: (event) =&gt; {
      console.log('clicked')
    }
  }
}
</code-editor></pre>
<p>但在v-schema-form中，如果想要在事件中获得副作用处理函数来与其他字段产生联动，就要按如下方式配置：</p>
<p>在字段配置的events属性上声明事件处理函数，例如：</p>
<pre><code-editor mode="typescript">
  const field: SchemaFormField = {
  type: 'string',
  property: 'name',
  events: {
    onClick: ($: EffectsContext, event) =&gt; {
      console.log('clicked');
      // 这里可以利用副作用处理函数$来实现联动操作
    }
  }
}
</code-editor></pre>
<br>

<blockquote>
<p>在events中声明的事件处理函数，第一个参数永远是副作用处理函数（通常命名为$）</p>
</blockquote>
<pre><demo-wrapper>
<comp0></comp0>
<template #code><code-container>
  
&lt;template&gt;
  &lt;div&gt;
    &lt;v-schema-form
        v-model:value="value"
        :schema="schema"
        :effects="effects"/&gt;
    &lt;a-button @click="focus"&gt;获得焦点&lt;/a-button&gt;
    &lt;a-button @click="addContent"&gt;在光标处添加内容&lt;/a-button&gt;
  &lt;/div&gt;
&lt;/template&gt;
&lt;script lang="ts"&gt;
  import {defineComponent, reactive, ref} from 'vue';
  import {EffectsContext} from '../../../../types';
  import {registerAntd} from '../../../schema-form';
  import {message} from 'ant-design-vue';

  export default defineComponent({
    name: 'Demo',
    setup() {
      const schema = reactive({
        fields: [
          {
            property: 'click',
            title: '点击事件监听',
            type: 'string',
            props: {
              onClick: () =&gt; {
                message.info('触发click事件');
              }
            }
          },
          {
            property: 'hover',
            title: '点击事件监听（获得副作用函数）',
            type: 'string',
            events: {
              onClick: ($) =&gt; {
                message.info('触发focus事件, 并获得副作用函数,切换上一个表单相的状态');
                $('click').enable(!$('click').isEnabled());
              }
            }
          },
          {
            property: 'keydown',
            title: '点击事件监听',
            type: 'string',
            events: {
              onKeydown: () =&gt; {
                message.info('触发keydown事件');
              }
            }
          },
        ],
        props: {
          labelWidth: '100px'
        }
      });
      const value = reactive({});
      const context = ref(null);
      const focus = () =&gt; {
        const field = context.value('click').field();
        field.inputRef.focus();
      };
      const effects = ($: EffectsContext) =&gt; {
        context.value = $;
        $('name').onFieldBlur((a, b) =&gt; {
          console.log('blur', a, b);
        });
        $('name').onFieldFocus((a, b) =&gt; {
          console.log('onFocus')
        });
      };
      const addContent = () =&gt; {
        focus();
        const field = context.value('click').field();
        const input = field.inputRef as HTMLInputElement;
        const caretIndex = input.selectionEnd;
        const content = 'abc';
        context.value('click').value(
            input.value.substr(0, caretIndex) + content + input.value.substr(caretIndex)
        );
        setTimeout(() =&gt; {
          input.setSelectionRange(caretIndex + content.length, caretIndex + content.length);
        }, 0);
      };
      registerAntd();

      return {
        schema,
        addContent,
        value,
        effects,
        focus
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