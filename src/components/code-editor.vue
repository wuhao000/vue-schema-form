<template>
  <div>
    <textarea
        ref="elRef"
        :style="textAreaStyle"
        :value="value"/>
  </div>
</template>
<script lang="ts">
  import CodeMirror, {EditorConfiguration} from 'codemirror';
  import 'codemirror/addon/hint/show-hint';
  import 'codemirror/mode/javascript/javascript';
  import {defineComponent, nextTick, onMounted, PropType, ref, shallowRef} from 'vue';
  import beautify from '../utils/beautify';
  import 'codemirror/lib/codemirror.css';
  import 'codemirror/theme/blackboard.css';

  const types = {
    html: 'text/html',
    javascript: 'text/javascript',
    json: 'application/ld+json',
    kotlin: 'text/x-kotlin',
    nginx: 'text/x-nginx-conf',
    powershell: 'application/x-powershell',
    python: 'text/x-python',
    shell: 'application/x-sh',
    yaml: 'text/x-yaml'
  };

  export default defineComponent({
    name: 'CodeEditor',
    props: {
      beautify: {type: Boolean, default: false},
      config: {
        type: Object as PropType<EditorConfiguration>
      },
      editable: {type: Boolean, default: true},
      getHints: {
        type: Function
      },
      /**
       * 编辑区高度
       */
      height: String,
      /**
       * 是否显示代码提示
       */
      hint: {type: Boolean, default: false},
      /**
       * 代码类型（同codemirror的mode）
       * 'json' | 'shell' | 'powershell' | 'python' | 'javascript' | 'kotlin' | 'html' | 'nginx' | string
       */
      mode: String,
      /**
       * 主题
       */
      theme: {type: String, default: 'blackboard'},
      /**
       * 编辑的内容，支持v-model
       */
      value: String,
      /**
       * 编辑区域宽度，默认自动
       */
      width: String
    },
    emits: ['update:value'],
    setup(props, {slots}) {

      const getRealMode = () => types[props.mode] || props.mode || 'application/ld+json';
      /*
       * 如果这里使用了ref，将导致代码提示框无法正常关闭
       * 在show-hint.js的第90行，this.cm.state.completionActive == this;
       * 在使用ref的情况下，this.cm.state.completionActive将是一个代理对象，导致这个判断永远为false，
       */
      const viewer = shallowRef<CodeMirror.EditorFromTextArea>(null);
      const elRef = ref(null);

      const getValue = () => {
        if (props.value) {
          if (props.beautify) {
            return beautify(props.value, {format: props.mode || 'json'});
          }
          return props.value.trim();
        }
        if (slots.default) {
          const content = slots.default()[0].children;
          if (typeof content === 'string') {
            return content.trim();
          }
        }
        return '';
      }
      const create = () => {
        let config = {
          size: [props.width || 'auto', props.height || 'auto']
        };
        if (props.config) {
          config = Object.assign({}, config, props.config);
        }
        const text = getValue();
        const defaultConfig: EditorConfiguration = {
          extraKeys: {Alt: 'autocomplete'},
          indentWithTabs: false,
          lineNumbers: true,
          lineWrapping: false,
          mode: {
            globalVars: true,
            name: getRealMode()
          } as any,
          readOnly: !props.editable,
          tabSize: 2,
          theme: props.theme,
          value: text
        };
        viewer.value = CodeMirror.fromTextArea(elRef.value as HTMLTextAreaElement, Object.assign(defaultConfig, config));
        if (config.size) {
          viewer.value.setSize(config.size[0], config.size[1]);
        }
        viewer.value.setValue(text);
        viewer.value.refresh();
      };
      onMounted(() => {
        create();
      });
      const refresh = () => {
        nextTick().then(() => {
          viewer.value.refresh();
        });
      };
      return {
        elRef,
        refresh,
        textAreaStyle: {
          display: 'none'
        }
      };
    }
  });
</script>
<style lang="less">
  .CodeMirror pre.CodeMirror-line {
    line-height: 22px;
  }

  .cm-s-idea {
    span {
      &.cm-property, &.cm-variable {
        color: #660e7a;
      }

      &.cm-keyword {
        color: #0033b3;
        font-weight: normal;
      }

      &.cm-comment {
        color: #8c8c8c;
      }

      &.cm-number {
        color: #1750eb;
      }

      &.cm-string-2 {
        color: #264EFF;
      }

      &.cm-string {
        color: #067D17;
      }
    }
  }

  .CodeMirror-scroll {
    min-height: 100px;
    max-width: 100%;
  }

  .CodeMirror pre.CodeMirror-line {
    font-size: 16px;
    line-height: 26px;
  }

  .CodeMirror-hint {
    font-size: 16px;
    font-weight: bold;
    line-height: 28px;
  }
</style>

