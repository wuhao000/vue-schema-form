<template>
  <div class="markdown-body">
    <h1 id="富文本编辑器">富文本编辑器</h1>
<pre><demo-wrapper>
<comp0></comp0>
<template #code><code-container>
  &lt;template&gt;
  &lt;div&gt;{{ value }}&lt;/div&gt;
  &lt;tiny-mce-editor
      v-model="value"
      :id="id"
      :init="init"
      @keydown="onKeydown"/&gt;
  &lt;Teleport
      v-if="showPortal"
      :to="target"&gt;
    &lt;div 
        class="user-selection-dropdown user-selection-dropdown-active"
        :style="mentionListStyle"&gt;
      &lt;a-list&gt;
        &lt;a-list-item
            v-for="(item, index) in mentionList"
            class="mention-user-item"
            :class="{selected: selectedIndex === index}"
            :key="item.value"
            @click="onUserSelect(item)"&gt;{{ item.name }}
        &lt;/a-list-item&gt;
      &lt;/a-list&gt;
    &lt;/div&gt;
  &lt;/Teleport&gt;
&lt;/template&gt;
&lt;script lang="ts" setup&gt;
  // noinspection ES6UnusedImports
  import TinyMceEditor from '@tinymce/tinymce-vue';
  import tinymce, {Settings} from 'tinymce';
  import 'tinymce/icons/default/index';
  import 'tinymce/plugins/colorpicker';
  import 'tinymce/plugins/contextmenu';
  import 'tinymce/plugins/image';
  import 'tinymce/plugins/lists';
  import 'tinymce/plugins/media';
  import 'tinymce/plugins/table';
  import 'tinymce/plugins/textcolor';
  import 'tinymce/plugins/wordcount';
  import 'tinymce/plugins/autolink';
  import "tinymce/plugins/paste";
  import 'tinymce-mention-sourcecodecap';
  import 'tinymce/themes/silver/theme';
  import uuid from 'uuid';
  import {nextTick, onMounted, reactive, ref} from 'vue';


  tinymce.PluginManager.add('defendImage', function addPlugin(editor) {
    editor.ui.registry.addButton('defendImage', {
      text: '数据表',
      onAction(button: { isDisabled: () =&gt; boolean, setDisabled: (p: boolean) =&gt; void }) {
        tinyMCE.execCommand('mceInsertContent', false, `&lt;div 
          data-type="data-list" 
          data-entity-id="Project"
          contenteditable="false" &gt;
        &lt;div&gt;
          &lt;a&gt;项目列表&lt;/a&gt;
        &lt;/div&gt;  
        &lt;table 
          style="width:100%;"&gt;
        &lt;thead&gt;
          &lt;tr&gt;
            &lt;th&gt;名称&lt;/th&gt;
            &lt;th&gt;创建时间&lt;/th&gt;
            &lt;th&gt;创建人&lt;/th&gt;
          &lt;/tr&gt;
        &lt;/thead&gt;
        &lt;tbody&gt;
          &lt;tr&gt;
            &lt;td&gt;&amp;nbsp;&lt;/td&gt;
            &lt;td&gt;&amp;nbsp;&lt;/td&gt;
            &lt;td&gt;&amp;nbsp;&lt;/td&gt;
          &lt;/tr&gt;
        &lt;/tbody&gt;
        &lt;/table&gt;&lt;/div&gt;`);
      }
    });
  });

  const mentionList = ref([{
    name: '张三', value: '1'
  }, {
    name: '李四', value: '2'
  }])

  const value = ref(``);
  const id = ref('abc');
  const editor = ref();

  const init: Settings = {
    base_url: '/static/tinymce',
    language_url: '/static/tinymce/zh_CN.js',
    language: 'zh_CN',
    skin_url: '/static/tinymce/skins/ui/oxide',
    height: 300,
    branding: false,
    content_css: 'writer',
    plugins: 'lists image media table textcolor wordcount contextmenu autolink paste mention defendImage',
    toolbar: 'undo redo | formatselect | bold italic | defendImage',
    mentions: {
      delimiter: ['@', '#'],
      source: [
        {name: 'aaaaaaa'},
        {name: 'bbbbbbbbbb'}
      ],
      matcher: () =&gt; {
        return true;
      },
      renderDropdown: function() {
        //add twitter bootstrap dropdown-menu class
        return '&lt;ul class="rte-autocomplete dropdown-menu"&gt;&lt;/ul&gt;';
      }
    }
  }

  onMounted(() =&gt; {
    tinymce.init({});
    editor.value = tinymce.get(id.value);

  });

  const showPortal = ref(false);
  const target = ref();
  const mentionListStyle = reactive({
    height: '150px',
    width: '100px',
    left: '0',
    right: '0',
  });

  const selectedIndex = ref(-1);
  const selectNextUser = () =&gt; {
    if (selectedIndex &lt; 0 || selectedIndex.value === mentionList.value.length - 1) {
      selectedIndex.value = 0;
    } else {
      selectedIndex.value++;
    }
  };
  const selectPrevUser = () =&gt; {
    if (selectedIndex.value &lt;= 0) {
      selectedIndex.value = mentionList.value.length - 1;
    } else {
      selectedIndex.value--;
    }
  }
  const isMentionAction = ref(false);
  const onKeydown = (event: KeyboardEvent, b) =&gt; {
    // editor.value = b;
    // if (event.key === '@') {
    //   const rect = b.selection.getBoundingClientRect();
    //   target.value = document.getElementsByClassName('tox-edit-area')[0];
    //   isMentionAction.value = true;
    //   selectedIndex.value = 0;
    //   nextTick(() =&gt; {
    //     showPortal.value = true;
    //     mentionListStyle.left = (rect.left + 30) + 'px';
    //     mentionListStyle.top = rect.top + 'px';
    //   });
    // } else {
    //   console.log(event.key);
    //   if (isMentionAction.value) {
    //     if (event.key === 'ArrowDown') {
    //       selectNextUser();
    //       event.preventDefault();
    //     } else if (event.key === 'ArrowUp') {
    //       selectPrevUser();
    //       event.preventDefault();
    //     } else if (event.key === 'Enter') {
    //       event.preventDefault();
    //       event.stopPropagation();
    //       console.log(event);
    //       if (selectedIndex.value &gt;= 0) {
    //         onUserSelect(mentionList.value[selectedIndex.value])
    //       }
    //       isMentionAction.value = false;
    //     } else {
    //       isMentionAction.value = false;
    //     }
    //   }
    // }
  };
  const onUserSelect = (item) =&gt; {
    const rng: Range = editor.value.selection.getRng();
    rng.setStart(rng.endContainer, rng.startOffset - 1);
    rng.deleteContents();
    editor.value.selection.setRng(rng);
    const id = uuid.v4();
    const a = editor.value.selection.setContent(`&lt;a class="user-mentioned" contenteditable="false"&gt;@${item.name}&lt;/a&gt;`);
    showPortal.value = false;
    target.value = null;
  }
&lt;/script&gt;
&lt;style lang="less"&gt;
  .mention-user-item {
    &amp;.selected {
      background: #c5f1f8;
    }
  }

  .user-selection-dropdown.user-selection-dropdown-active {
    margin: 0;
    color: rgba(0, 0, 0, 0.85);
    line-height: 1.5715;
    list-style: none;
    font-feature-settings: 'tnum';
    position: absolute;
    box-sizing: border-box;
    padding: 4px 0;
    overflow: hidden;
    font-size: 14px;
    font-variant: initial;
    background-color: #fff;
    border-radius: 2px;
    outline: none;
    box-shadow: 0 2px 8px lightgray;
  }
&lt;/style&gt;

</code-container></template>
</demo-wrapper></pre>
</div>
</template>
<script lang="ts" setup>
  import  comp0 from './comp0.vue';
</script>
