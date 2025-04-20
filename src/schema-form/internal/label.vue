<template>
  <div v-if="platform === 'mobile' && LibComponents.popup[platform]">
    {{ title }}
    <component
        :is="InfoIcon"
        @click="handleInfoIconClick"
        class="info-icon"
    />
    <component
        :is="LibComponentsPopup"
        height="100%"
        :title="title"
        :show-ok="false"
        v-model:open="visible"
    >
      <component
          :is="Result"
          :message="messageContent"
          class="result-message"
          button-text="返回"
          button-type="primary"
          @click="handleResultClick"
      />
    </component>
  </div>
  <component
      v-else
      :is="LibComponentsPopover"
      trigger="hover"
  >
    <template #content>
      <div>
        <h2>{{ title }}</h2>
        <component
            :is="contentComponent"
            v-if="isVNodeContent" />
        <span v-else>{{ content }}</span>
      </div>
    </template>
    <label>
      <span>{{ title }}</span>
      <component
          :is="InfoIcon"
          class="info-icon" />
    </label>
  </component>
</template>
<script setup lang="ts">
  import { computed, isVNode, PropType, ref } from 'vue';
  import { LibComponents } from '../utils/utils';

  defineOptions({
    name: 'SchemaFormFieldLabel'
  });

  const props = defineProps({
    platform: {
      type: String as PropType<'mobile' | 'desktop'>,
      default: 'desktop'
    },
    content: [String, Object],
    title: [String, Object]
  });

  const visible = ref(false);

  const InfoIcon = computed(() => LibComponents.icons[props.platform].info);

  const messageContent = computed(() => props.content);

  const LibComponentsPopup = computed(() => LibComponents.popup[props.platform]);
  const Result = computed(() => LibComponents.result[props.platform]);
  const LibComponentsPopover = computed(() => LibComponents.popover[props.platform]);

  // 检查content是否为VNode
  const isVNodeContent = computed(() => isVNode(props.content));
  const contentComponent = computed(() => isVNodeContent.value ? props.content : null);

  // 事件处理函数
  const handleInfoIconClick = (e: Event) => {
    e.stopPropagation();
    visible.value = true;
  };

  const handleResultClick = () => {
    visible.value = false;
  };
</script>
<style lang="less" scoped>
  .info-icon {
    margin-left: 5px;
    color: #247dc5;
  }

  .result-message {
    padding-top: 0;
  }

  .schema-form-field-tip-content {
    text-align: left;
  }
</style> 
