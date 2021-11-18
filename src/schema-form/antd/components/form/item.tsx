import {ComponentInternalInstance} from '@vue/runtime-core';
import AsyncValidator from 'async-validator';
import debounce from 'lodash.debounce';
import {
  computed,
  ComputedRef,
  defineComponent,
  getCurrentInstance,
  inject,
  nextTick,
  onBeforeUnmount,
  PropType,
  provide,
  ref,
  VNode
} from 'vue';
import {ValidateRules} from '../../../../../types';
import {getPropByPath, noop} from '../../utils';

export interface FormItemProvider {
  validate: (trigger?: string, callback?) => void;
  setControl: (control: ComponentInternalInstance) => void;
  onBlur: (e) => void;
  onChange: (e?) => void;
}

export default defineComponent({
  name: 'DFormItem',
  props: {
    hasFeedback: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    help: {
      type: String as PropType<string>
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
  },
  emits: ['validate'],
  setup(props, {emit, attrs}) {
    const control = ref(null);
    const currentHelp = ref('');
    const currentValidateStatus = ref('');
    const form: { value: any } = inject('form', () => undefined) as any;
    const validateDisabled = ref(true);

    const fieldValue = computed(() => {
      if (props.value !== null && props.value !== undefined) {
        return props.value;
      }
      const model = form && form.value.model;
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
      if (form && form.value.labelCol) {
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
      const labelWidth = props.labelWidth ? props.labelWidth : (form && form.value.labelWidth);
      const labelPosition = props.labelPosition ? props.labelPosition : (form && form.value.labelPosition) || 'right';
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
      if (form && form.value.wrapperCol) {
        if (typeof form.value.wrapperCol === 'number') {
          wrapperCol.span = form.value.wrapperCol;
        } else {
          wrapperCol = form.value.wrapperCol;
        }
      } else if (form && form.value.labelCol) {
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
      let formRules: ValidateRules = form && form.value.getRules();
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
    const validate = debounce((trigger, callback: ((...args: any) => void) = noop) => {
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
          form && form.value.emit('validate', props.name, !errors, currentHelp.value || null);
        });
      });
    }, 300);
    const instance = getCurrentInstance();
    onBeforeUnmount(() => {
      if (props.name) {
        form.value.removeField(instance);
      }
    });
    if (props.name) {
      form.value.addField(instance);
    }
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
    return {
      control,
      currentHelp,
      currentValidateStatus,
      form,
      validateDisabled,
      fieldValue,
      isRequired,
      labelCol,
      labelStyle,
      wrapperCol,
      wrapperStyle,
      focus,
      getFilteredRule,
      getRules,
      onFieldBlur,
      onFieldChange,
      validate
    };
  },
  render() {
    const props: any = {
      ...this.$attrs,
      ...this.$props
    };
    const label = props.label;
    const slots = {...this.$slots};
    if (typeof props.label === 'object' || slots.label) {
      slots.label = this.$slots.label || (() => label);
      delete props.label;
    }
    if (this.help || this.currentHelp) {
      props.help = this.help || this.currentHelp;
    } else {
      props.help = undefined;
    }
    props.labelCol = this.labelCol;
    props.validateStatus = this.validateStatus || this.currentValidateStatus;
    props.wrapperCol = this.wrapperCol;
    return <a-form-item {...props}
                        v-slots={slots}/>;
  }
});
