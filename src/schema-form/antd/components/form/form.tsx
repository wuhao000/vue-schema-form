import classNames from 'classnames';
import {computed, defineComponent, PropType, provide, ref, Ref} from 'vue';
import {ValidateRules} from '../../../../../types';

export default defineComponent({
  inheritAttrs: false,
  name: 'DForm',
  props: {
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
      type: [Number, Object] as PropType<number | object>
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
      type: Object as PropType<object>
    },
    rules: {
      type: Object as PropType<ValidateRules>
    },
    onSubmit: {
      type: Function as PropType<any>,
      default() {
        return () => {
        };
      }
    },
    wrapperCol: {
      type: [Number, Object] as PropType<number | object>
    }
  },
  setup(props: any, {emit}) {
    const prefixCls = ref('ant-form');
    const fields: Ref<any[]> = ref([]);
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
    const resetFields = () => {
      if (!props.model) {
        console.warn('[Element Warn][Form]model is required for resetFields to work.');
        return;
      }
      fields.value.forEach(field => {
        (field as any).resetField();
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
          copyCallback = (valid) => {
            const errorField = fields.value.find(it => it.currentValidateStatus === 'error');
            if (errorField) {
              errorField.focus();
            }
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
    const validateField = (props, cb) => {
      const copyProps = [].concat(props);
      const localFields = fields.value.filter(field => copyProps.indexOf((field as any).prop) !== -1);
      if (!localFields.length) {
        console.warn('[Element Warn]please pass correct props!');
        return;
      }
      localFields.forEach(field => {
        (field as any).validate('', cb);
      });
    };
    const getLayout = () => {
      if (props.inline) {
        return 'inline';
      } else {
        return props.layout;
      }
    };
    const renderButtons = () => {
      if (props.okCancel) {
        return <div class={prefixCls.value + '-footer-btns'}>
          {
            <a-button onClick={(e) => {
              emit('cancel', e);
            }}>{props.cancelText}</a-button>
          }
          {
            <a-button
              onClick={(e) => {
                emit('ok', e);
              }}
              type={'primary'}
              style={{marginLeft: '8px'}}>{props.okText}</a-button>
          }
        </div>;
      }
    };
    const form = computed(() => ({
      ...props,
      emit,
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
    provide('form', form);
    return {
      prefixCls,
      fields,
      clearValidate,
      resetFields,
      validate,
      validateField,
      getLayout,
      renderButtons
    };
  },
  render(ctx) {
    const {
      prefixCls,
      hideRequiredMark,
      onSubmit,
      $slots
    } = ctx;
    const layout = this.getLayout();
    const formClassName = classNames({
      [`${prefixCls}-hide-required-mark`]: hideRequiredMark
    });
    return (
      <a-form onSubmit={onSubmit}
              layout={layout}
              class={formClassName}>
        {$slots.default?.()}
        {this.renderButtons()}
      </a-form>
    );
  }
});
