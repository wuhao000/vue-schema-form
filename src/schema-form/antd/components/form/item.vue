<template>
  <a-form-item v-bind="formItemProps">
    <template v-if="$slots.default" #default>
      <slot></slot>
    </template>
    <template v-if="$slots.label" #label>
      <slot name="label"></slot>
    </template>
  </a-form-item>
</template>

<script setup lang="ts">
import { ComponentInternalInstance } from '@vue/runtime-core';
import AsyncValidator from 'async-validator';
import { debounce } from 'lodash';
import {
  computed,
  ComputedRef,
  getCurrentInstance,
  inject,
  nextTick,
  onBeforeUnmount,
  PropType,
  provide,
  ref,
  useAttrs,
  useSlots,
  VNode
} from 'vue';
import { ValidateRules } from '../../../../../types';
import { getPropByPath, noop } from '../../utils';
import { DFORM_STORE_KEY } from './utils';

// 定义表单项提供者接口
export interface FormItemProvider {
  validate: (trigger?: string, callback?) => void;
  setControl: (control: ComponentInternalInstance) => void;
  onBlur: (e) => void;
  onChange: (e?) => void;
}

defineOptions({
  name: 'DFormItem'
});

// 定义属性
const props = defineProps({
  hasFeedback: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  help: {
    type: [String, Object] as PropType<string | VNode>
  },
  label: {
    type: [String, Object] as PropType<string | VNode>,
    default: ''
  },
  labelWidth: {
    type: [String, Number] as PropType<any>
  },
  labelPosition: {
    type: String as PropType<'left' | 'right'>
  },
  name: {
    type: String as PropType<string>,
    default: ''
  },
  required: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  rules: {
    type: [Object, Array] as PropType<any>
  },
  validateStatus: {
    type: String as PropType<string>
  },
  value: {
    type: [Object, String, Number, Array, Boolean]
  }
});

// 定义事件发射器
const emit = defineEmits(['validate']);

// 获取属性和插槽
const attrs = useAttrs();
const vslots = useSlots();

// 定义状态变量
const control = ref(null);
const currentHelp = ref('');
const currentValidateStatus = ref('');
const form: { value: any } = inject(DFORM_STORE_KEY, () => undefined) as any;
const validateDisabled = ref(true);

// 计算属性
const fieldValue = computed(() => {
  if (props.value !== null && props.value !== undefined) {
    return props.value;
  }
  const model = form?.value?.model;
  if (!model || !props.name) {
    return;
  }

  let path = props.name as string;
  if (path.indexOf(':') !== -1) {
    path = path.replace(/:/, '.');
  }
  return getPropByPath(model, path, true).v;
});

const isRequired = computed(() => {
  if (props.required) {
    return props.required;
  } else {
    return getRules().some(it => it.required);
  }
});

const labelCol = computed(() => {
  let labelCol: any = {};
  if (attrs['label-col']) {
    labelCol = attrs['label-col'];
  }
  if (form?.value?.labelCol) {
    if (typeof form.value.labelCol === 'number') {
      labelCol.span = form.value.labelCol;
    } else {
      labelCol = form.value.labelCol;
    }
  }
  labelCol.style = labelStyle.value;
  return labelCol;
});

const labelStyle = computed(() => {
  const labelWidth = props.labelWidth ? props.labelWidth : form?.value?.labelWidth;
  const labelPosition = props.labelPosition ? props.labelPosition : form?.value?.labelPosition || 'right';
  const style: any = {};
  if (labelWidth) {
    style.width = typeof labelWidth === 'number' ? (labelWidth + 'px') : labelWidth;
    style.float = 'left';
    style.textAlign = labelPosition;
  }
  return style;
});

const wrapperCol = computed(() => {
  let wrapperCol: any = {};
  if (attrs['wrapper-col']) {
    wrapperCol = attrs['wrapper-col'];
  }
  if (form?.value?.wrapperCol) {
    if (typeof form.value.wrapperCol === 'number') {
      wrapperCol.span = form.value.wrapperCol;
    } else {
      wrapperCol = form.value.wrapperCol;
    }
  } else if (form?.value?.labelCol) {
    if (typeof form.value.labelCol === 'number') {
      wrapperCol.span = 24 - form.value.labelCol;
    }
  }
  wrapperCol.style = wrapperStyle.value;
  return wrapperCol;
});

const wrapperStyle = computed(() => {
  return {};
});

const labelAlign = computed(() => {
  return attrs.labelAlign || props.labelPosition || form?.value?.labelPosition;
});

// 方法定义
const focus = () => {
  if (control.value && control.value.focus.bind(control.value).bind(control.value).bind(control.value).bind(control.value).bind(control.value)) {
    control.value.focus();
  }
};

const getFilteredRule = (trigger) => {
  const rules = getRules();
  return rules.filter(rule => {
    if (!rule.trigger || trigger === '') {
      return true;
    }
    if (Array.isArray(rule.trigger)) {
      return rule.trigger.indexOf(trigger) > -1;
    } else {
      return rule.trigger === trigger;
    }
  }).map(rule => Object.assign({}, rule));
};

const getRules = () => {
  let formRules: ValidateRules = form?.value?.getRules();
  const selfRules = props.rules;
  const requiredRule = props.required !== undefined ? {required: props.required} : [];
  const prop = getPropByPath(formRules, props.name || '');
  formRules = formRules ? (prop.o[props.name as string || ''] || prop.v) : [];
  return [].concat(selfRules || formRules || []).concat(requiredRule);
};

const onFieldBlur = () => {
  validate('blur');
};

const onFieldChange = () => {
  if (validateDisabled.value) {
    validateDisabled.value = false;
    return;
  }
  validate('change');
};

const validate = debounce((trigger, callback: ((...args: any[]) => void) = noop) => {
  nextTick().then(() => {
    validateDisabled.value = false;
    const rules = getFilteredRule(trigger);
    if ((!rules || rules.length === 0) && props.required === undefined) {
      callback();
      return true;
    }
    currentValidateStatus.value = 'validating';
    const descriptor = {};
    if (rules && rules.length > 0) {
      rules.forEach(rule => {
        delete rule.trigger;
      });
    }
    descriptor[props.name as string] = rules;
    const validator = new AsyncValidator(descriptor);
    const model = {
      [props.name as string]: fieldValue.value
    };
    validator.validate(model, {firstFields: true}, (errors, invalidFields) => {
      currentValidateStatus.value = !errors ? 'success' : 'error';
      currentHelp.value = errors ? errors[0].message : '';
      callback(currentHelp.value, invalidFields);
      emit('validate', !errors, errors);
      form?.value?.emit('validate', props.name, !errors, currentHelp.value || null);
    });
  });
}, 300);

// 获取当前实例
const instance = getCurrentInstance();

// 生命周期钩子
onBeforeUnmount(() => {
  if (props.name) {
    form?.value?.removeField(instance);
  }
});

// 组件挂载时添加表单字段
if (props.name) {
  form?.value?.addField(instance);
}

// 提供formItem给子组件
const formItem: ComputedRef<FormItemProvider> = computed(() => ({
  ...props,
  validate,
  setControl: (localControl) => {
    control.value = localControl;
  },
  onBlur: onFieldBlur,
  onChange: onFieldChange
}));
provide('formItem', formItem);

// 计算最终传递给a-form-item的属性
const formItemProps = computed(() => {
  const result: Record<string, any> = {
    ...attrs,
    ...props
  };
  
  // 如果有label插槽或label是VNode，移除label属性
  if (vslots.label || typeof props.label === 'object') {
    delete result.label;
  }
  
  if (props.help || currentHelp.value) {
    result.help = props.help || currentHelp.value;
  } else {
    result.help = undefined;
  }
  
  result.labelAlign = labelAlign.value;
  result.labelCol = labelCol.value;
  result.validateStatus = props.validateStatus || currentValidateStatus.value;
  result.wrapperCol = wrapperCol.value;
  
  return result;
});
</script> 