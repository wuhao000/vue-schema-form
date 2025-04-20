<template>
  <a-button v-bind="buttonProps">
    <template #default>
      <template v-if="title">
        <component
            v-if="isVNodeTitle"
            :is="title"
        />
        <template v-else>{{ title }}</template>
      </template>
      <slot></slot>
    </template>
  </a-button>
</template>
<script setup lang="ts">
  import classNames from 'classnames';
  import { computed, isVNode, PropType, useAttrs, useSlots } from 'vue';
  import { ClassType } from '../../../../../types';
  import { baseButtonProps } from '../../../common/base-button';
  import { useBaseInput } from '../../../mixins';
  import './index.less';

  defineOptions({
    name: 'DButton'
  });

  const props = defineProps({
    ...baseButtonProps,
    prefixCls: {
      type: String,
      default: 'ant-btn'
    },
    text: {
      type: Boolean,
      default: false
    },
    circle: {
      type: Boolean,
      default: false
    },
    htmlType: {
      type: String as PropType<string>,
      default: 'button'
    },
    type: String,
    onClick: Function
  });

  const attrs = useAttrs();
  const vslots = useSlots();

  const { size } = useBaseInput(props, { slots: vslots, attrs });

  // 判断title是否为VNode
  const isVNodeTitle = computed(() => isVNode(props.title));

  const buttonProps = computed(() => {
    const result: any = {
      ...attrs,
      onClick: props.onClick,
      htmlType: props.htmlType,
      size: size.value,
      class: classNames(attrs.class as ClassType, {
        [props.prefixCls + '-text']: props.text
      }),
      shape: props.circle ? 'circle' : attrs.shape
    };

    if (props.type === 'danger') {
      result.danger = true;
    } else {
      result.type = props.type;
    }

    return result;
  });
</script> 
