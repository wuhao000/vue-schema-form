import { ScriptLoader } from './script-loader';
import { getTinymce } from './tiny-mce';
import { isTextarea, mergePlugins, uuid, isNullOrUndefined, initEditor } from './utils';
import { editorProps } from './editor-prop-types';
import { h, defineComponent, onMounted, ref, Ref, toRefs, watch, onBeforeUnmount, onActivated, onDeactivated } from 'vue';

const renderInline = (ce: any, id: string, elementRef: Ref<Element | null>, tagName?: string) =>
    ce(tagName ? tagName : 'div', {
      id,
      ref: elementRef
    });

const renderIframe = (ce: any, id: string, elementRef: Ref<Element | null>) =>
    ce('textarea', {
      id,
      visibility: 'hidden',
      ref: elementRef
    });

export default defineComponent({
  name: 'TinyMceEditor',
  props: editorProps,
  setup: (props, ctx) => {
    const { disabled, modelValue } = toRefs(props);
    const element: Ref<Element | null> = ref(null);
    let vueEditor: any = null;
    const elementId: string = props.id || uuid('tiny-vue');
    const inlineEditor: boolean = (props.init && props.init.inline) || props.inline;
    const modelBind = !!ctx.attrs['onUpdate:modelValue'];
    let mounting = true;
    const initialValue: string = props.initialValue ? props.initialValue : '';
    let cache = '';

    const getContent = (isMounting: boolean): () => string => modelBind ?
        () => (modelValue?.value ? modelValue.value : '') :
        () => isMounting ? initialValue : cache;

    const initWrapper = (): void => {
      const content = getContent(mounting);
      const finalInit = {
        ...props.init,
        readonly: props.disabled,
        selector: `#${elementId}`,
        plugins: mergePlugins(props.init && props.init.plugins, props.plugins),
        toolbar: props.toolbar || (props.init && props.init.toolbar),
        inline: inlineEditor,
        setup: (editor: any) => {
          vueEditor = editor;
          editor.on('init', (e: Event) => initEditor(e, props, ctx, editor, modelValue, content));
          if (props.init && typeof props.init.setup === 'function') {
            props.init.setup(editor);
          }
        }
      };
      if (isTextarea(element.value)) {
        element.value.style.visibility = '';
      }
      getTinymce().init(finalInit);
      mounting = false;
    };
    watch(disabled, (disable) => {
      if (vueEditor !== null) {
        vueEditor.setMode(disable ? 'readonly' : 'design');
      }
    });
    onMounted(() => {
      if (getTinymce() !== null) {
        initWrapper();
      } else if (element.value && element.value.ownerDocument) {
        const channel = props.cloudChannel ? props.cloudChannel : '5';
        const apiKey = props.apiKey ? props.apiKey : 'no-api-key';
        const scriptSrc = isNullOrUndefined(props.tinymceScriptSrc) ?
            `https://cdn.tiny.cloud/1/${apiKey}/tinymce/${channel}/tinymce.min.js` :
            props.tinymceScriptSrc;
        ScriptLoader.load(
            element.value.ownerDocument,
            scriptSrc,
            initWrapper
        );
      }
    });
    onBeforeUnmount(() => {
      if (getTinymce() !== null) {
        getTinymce().remove(vueEditor);
      }
    });
    if (!inlineEditor) {
      onActivated(() => {
        if (!mounting) {
          initWrapper();
        }
      });
      onDeactivated(() => {
        if (!modelBind) {
          cache = vueEditor.getContent();
        }
        getTinymce()?.remove(vueEditor);
      });
    }
    return () => inlineEditor ?
        renderInline(h, elementId, element, props.tagName) :
        renderIframe(h, elementId, element);
  }
});
