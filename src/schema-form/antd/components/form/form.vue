<template>
  <a-form
      :style="$attrs.style"
      :layout="layout"
      :class="formClassName"
      @submit="onSubmit"
  >
    <slot></slot>
    <div
        v-if="okCancel"
        :class="`${prefixCls}-footer-btns`">
      <a-button @click="handleCancel">{{ cancelText }}</a-button>
      <a-button
          @click="handleOk"
          type="primary"
          style="margin-left: 8px"
      >{{ okText }}
      </a-button>
    </div>
  </a-form>
</template>
<script setup lang="ts">
  import classNames from 'classnames';
  import { computed, PropType, provide, ref, Ref, useAttrs } from 'vue';
  import { ClassType, ValidateRules } from '../../../../../types';
  import { DFORM_STORE_KEY } from './utils';

  // 定义选项
  defineOptions({
    name: 'DForm',
    inheritAttrs: false
  });

  // 定义属性
  const props = defineProps({
    /**
     * 显示取消确认按钮，分别产生cancel和ok事件，cancel和ok没有默认操作，完全由用户定义
     */
    okCancel: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    size: {
      type: String as PropType<'small' | 'large' | 'default'>,
      default: 'default'
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    readOnly: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    labelCol: {
      type: [Number, Object] as PropType<number | { [key: string]: unknown }>
    },
    okText: {
      type: String as PropType<string>,
      default: '确定'
    },
    cancelText: {
      type: String as PropType<string>,
      default: '取消'
    },
    inline: {
      type: Boolean as PropType<boolean>
    },
    /**
     * 标签宽度
     */
    labelWidth: {
      type: [String, Number] as PropType<string | number>
    },
    labelPosition: {
      type: String as PropType<'left' | 'right'>
    },
    hideRequiredMark: {
      type: Boolean as PropType<boolean>
    },
    layout: {
      type: String as PropType<'horizontal' | 'inline' | 'vertical'>,
      default: 'horizontal'
    },
    model: {
      type: Object as PropType<any>
    },
    rules: {
      type: Object as PropType<ValidateRules>
    },
    onSubmit: {
      type: Function as PropType<any>
    },
    wrapperCol: {
      type: [Number, Object] as PropType<number | any>
    }
  });

  // 定义事件
  const emit = defineEmits(['ok', 'cancel']);

  // 获取属性
  const attrs = useAttrs();

  // 定义状态
  const prefixCls = ref('ant-form');
  const fields: Ref<any[]> = ref([]);

  // 方法定义
  const clearValidate = (props = []) => {
    const localFields = props.length
        ? (typeof props === 'string'
                ? fields.value.filter(field => props === (field as any).prop)
                : fields.value.filter(field => props.indexOf((field as any).prop) > -1)
        ) : fields.value;
    localFields.forEach(field => {
      (field as any).clearValidate();
    });
  };

  const validate = (callback) => {
    if (!props.model) {
      return;
    }
    let promise;
    let copyCallback = callback;
    // if no callback, return promise
    if (typeof copyCallback !== 'function' && Promise) {
      promise = new Promise((resolve, reject) => {
        copyCallback = valid => {
          valid ? resolve(valid) : reject(valid);
        };
      });
    }

    let valid = true;
    let count = 0;
    // 如果需要验证的fields为空，调用验证时立刻返回callback
    if (fields.value.length === 0 && copyCallback) {
      copyCallback(true);
    }
    let invalidFields = {};
    fields.value.forEach(field => {
      field.validate('', (message, field) => {
        if (message) {
          valid = false;
        }
        invalidFields = Object.assign({}, invalidFields, field);
        if (typeof copyCallback === 'function' && ++count === fields.value.length) {
          copyCallback(valid, invalidFields);
        }
      });
    });

    if (promise) {
      return promise;
    }
  };

  // 计算属性
  const layout = computed(() => {
    if (props.inline) {
      return 'inline';
    } else {
      return props.layout;
    }
  });

  const formClassName = computed(() => {
    return classNames({
      [`${prefixCls.value}-hide-required-mark`]: props.hideRequiredMark
    }, attrs.class as ClassType);
  });

  // 事件处理
  const handleCancel = (e) => {
    emit('cancel', e);
  };

  const handleOk = (e) => {
    emit('ok', e);
  };

  // 表单状态，提供给子组件
  const form = computed(() => ({
    ...props,
    emit,
    getRules: () => props.rules,
    addField: (field) => {
      if (field) {
        fields.value.push(field);
      }
    },
    removeField: (field) => {
      if (field.prop) {
        fields.value.splice(fields.value.indexOf(field), 1);
      }
    }
  }));

  // 提供表单实例给子组件
  provide(DFORM_STORE_KEY, form);

  // 暴露方法给外部
  defineExpose({
    prefixCls,
    fields,
    clearValidate,
    validate
  });
</script> 
