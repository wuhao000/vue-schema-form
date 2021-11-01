<template>
  <a-button @click="show">{{ title || '查看数据' }}</a-button>
  <a-modal
      v-model:visible="visible"
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

  const visible = ref(false);

  const show = () => {
    visible.value = true;
  };

  const close = () => {
    visible.value = false;
  };
</script>
