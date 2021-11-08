<template>
  <div id="abc"></div>
  <div>
    {{ value }}
  </div>
  <tiny-mce-editor
      id="ab"
      v-model="value"
      :init="init"
      @keydown="onKeydown"
      @change="onChange"/>
  <Teleport
      v-if="showPortal"
      :to="target">
    <div :style="mentionListStyle">
      <a-list>
        <a-list-item
            v-for="item in mentionList"
            :key="item.value"
            @click="onUserSelect(item)">{{ item.name }}
        </a-list-item>
      </a-list>
    </div>
  </Teleport>
</template>
<script lang="ts" setup>
  import tinymce, {Editor, Settings} from 'tinymce';
  import 'tinymce/icons/default/index';
  import 'tinymce/plugins/colorpicker';
  import 'tinymce/plugins/contextmenu';
  import 'tinymce/plugins/image';
  import 'tinymce/plugins/lists';
  import 'tinymce/plugins/media';
  import 'tinymce/plugins/table';
  import 'tinymce/plugins/textcolor';
  import 'tinymce/plugins/wordcount';
  import 'tinymce/themes/silver/theme';
  import {nextTick, onMounted, reactive, ref} from 'vue';

  const mentionList = ref([{
    name: '张三', value: '1'
  }, {
    name: '李四', value: '2'
  }]);

  const value = ref('');

  const init: Settings = {
    language_url: '/static/tinymce/zh_CN.js',
    language: 'zh_CN',
    skin_url: '/static/tinymce/skins/ui/oxide',
    height: 300,
    branding: false,
    plugins: 'lists image media table textcolor wordcount contextmenu',
    toolbar: 'undo redo | formatselect | bold italic'
  };

  onMounted(() => {
    tinymce.init({
      base_url: '/aaaaaaa'
    });
  });

  const onChange = (a, b, c, d) => {
    // console.log(b.dom.getPos());
    // console.log(b.selection.getBookmark());
    // console.log(b.selection);
    // console.log(b.selection.getBoundingClientRect())
    // console.log(b);
  };
  const showPortal = ref(false);
  const target = ref();
  const mentionListStyle = reactive({
    height: '150px',
    width: '100px',
    border: '1px solid black',
    position: 'absolute',
    left: '0',
    right: '0',
    background: 'white'
  });
  const editor = ref<Editor>();
  const onKeydown = (a: KeyboardEvent, b) => {
    editor.value = b;
    if (a.key === '@') {
      const rect = b.selection.getBoundingClientRect();
      console.log(rect);
      const area = document.getElementsByClassName('tox-edit-area')[0];
      target.value = area;
      nextTick(() => {
        showPortal.value = true;
        mentionListStyle.left = (rect.left + 30) + 'px';
        mentionListStyle.top = rect.top + 'px';
      });
    }
  };
  const onUserSelect = (item) => {
    const rng: Range = editor.value.selection.getRng();
    rng.setStart(rng.endContainer, rng.startOffset - 1);

    editor.value.selection.setRng(rng);
    editor.value.selection.setContent('<a contenteditable="false">@' + item.name + '</a>&nbsp;');
    showPortal.value = false;
    target.value = null;
    editor.value.selection.setCursorLocation(rng.startContainer, 0);

  };
</script>
