<template>
  <div>{{ value }}</div>
  <tiny-mce-editor
      v-model="value"
      @keydown="onKeydown"
      :id="id"
      :init="init"/>
  <Teleport
      v-if="showPortal"
      :to="target">
    <div class="user-selection-dropdown user-selection-dropdown-active"
         :style="mentionListStyle">
      <a-list>
        <a-list-item
            v-for="(item, index) in mentionList"
            class="mention-user-item"
            :class="{selected: selectedIndex === index}"
            :key="item.value"
            @click="onUserSelect(item)">{{item.name}}
        </a-list-item>
      </a-list>
    </div>
  </Teleport>
</template>
<script lang="ts" setup>
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
      onAction(button: { isDisabled: () => boolean, setDisabled: (p: boolean) => void }) {
        tinyMCE.execCommand('mceInsertContent', false, `<div 
          data-type="data-list" 
          data-entity-id="Project"
          contenteditable="false" >
        <div>
          <a>项目列表</a>
        </div>  
        <table 
          style="width:100%;">
        <thead>
          <tr>
            <th>名称</th>
            <th>创建时间</th>
            <th>创建人</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
        </tbody>
        </table></div>`);
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
      matcher: () => {
        return true;
      },
      renderDropdown: function() {
        //add twitter bootstrap dropdown-menu class
        return '<ul class="rte-autocomplete dropdown-menu"></ul>';
      }
    }
  }

  onMounted(() => {
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
  const selectNextUser = () => {
    if (selectedIndex < 0 || selectedIndex.value === mentionList.value.length - 1) {
      selectedIndex.value = 0;
    } else {
      selectedIndex.value++;
    }
  };
  const selectPrevUser = () => {
    if (selectedIndex.value <= 0) {
      selectedIndex.value = mentionList.value.length - 1;
    } else {
      selectedIndex.value--;
    }
  }
  const isMentionAction = ref(false);
  const onKeydown = (event: KeyboardEvent, b) => {
    // editor.value = b;
    // if (event.key === '@') {
    //   const rect = b.selection.getBoundingClientRect();
    //   target.value = document.getElementsByClassName('tox-edit-area')[0];
    //   isMentionAction.value = true;
    //   selectedIndex.value = 0;
    //   nextTick(() => {
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
    //       if (selectedIndex.value >= 0) {
    //         onUserSelect(mentionList.value[selectedIndex.value])
    //       }
    //       isMentionAction.value = false;
    //     } else {
    //       isMentionAction.value = false;
    //     }
    //   }
    // }
  };
  const onUserSelect = (item) => {
    const rng: Range = editor.value.selection.getRng();
    rng.setStart(rng.endContainer, rng.startOffset - 1);
    rng.deleteContents();
    editor.value.selection.setRng(rng);
    const id = uuid.v4();
    const a = editor.value.selection.setContent(`<a class="user-mentioned" contenteditable="false">@${item.name}</a>`);
    showPortal.value = false;
    target.value = null;
  }
</script>
<style lang="less">
  .mention-user-item {
    &.selected {
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
</style>
