<template>
  <a-button @click="show">{{ title || '查看数据' }}</a-button>
  <a-modal
      v-model:open="open"
      destroy-on-close>
    <code-editor>
      {{ value }}
    </code-editor>
    <template #footer>
      <a-button
          type="primary"
          @click="close">确定
      </a-button>
    </template>
  </a-modal>
</template>
<script lang="ts" setup>
  import {ref} from 'vue';

  // eslint-disable-next-line no-undef
  defineProps({
    value: Object,
    title: String
  });

  const open = ref(false);

  const show = () => {
    open.value = true;
  };

  const close = () => {
    open.value = false;
  };
</script>
