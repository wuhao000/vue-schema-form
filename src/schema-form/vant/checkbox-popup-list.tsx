import { computed, defineComponent, PropType, ref, watch } from 'vue';
import { SelectOption } from '../../types/form';
import BaseField from './base-field';

export default defineComponent({
  name: 'VmCheckboxPopupList',
  props: {
    options: Array as PropType<SelectOption[]>,
    multiple: Boolean,
    value: [String, Number, Array, Boolean, Object]
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    const localValue = ref();

    const showPicker = ref(false);

    const onConfirm = () => {
      emit('update:value', localValue.value);
    };

    const valueString = computed(() => {
      if (props.multiple) {
        const options = props.options.filter(it => (props.value as Array<string | number | boolean> ?? []).includes(it.value));
        if (options.some(it => typeof it.label !== 'string')) {
          return <div>{options.map(o => <span>{o.label}</span>)}</div>;
        }
        return options.map(it => it.label).join('、');
      } else {
        return props.options.find(it => it.value === props.value)?.label;
      }
    });

    watch(() => showPicker.value, show => {
      if (show) {
        localValue.value = props.value;
      }
    });

    const getInputContent = () => {
      if (props.multiple) {
        return <van-checkbox-group
          v-model={[localValue.value, 'modelValue']}
        >
          <van-cell-group>
            {
              props.options.map(option => (
                <van-cell>
                  <van-checkbox
                    name={option.value}
                    key={option.value}
                  >{option.label}</van-checkbox>
                </van-cell>
              ))
            }
          </van-cell-group>
        </van-checkbox-group>;
      } else {
        return <van-radio-group
          v-model={[localValue.value, 'modelValue']}
        >
          <van-cell-group>
            {
              props.options.map(option => (
                <van-cell>
                  <van-radio
                    name={option.value}
                    key={option.value}
                  >{option.label}</van-radio>
                </van-cell>
              ))
            }
          </van-cell-group>
        </van-radio-group>;
      }
    };

    const onCancel = () => {
      showPicker.value = false;
    };

    return {
      localValue,
      valueString,
      showPicker,
      onConfirm,
      onCancel,
      getInputContent
    };
  },
  render() {
    return [
      <BaseField
        {...this.$attrs}
        isLink
        onClick={() => {
          this.showPicker = true;
        }}>{this.valueString}</BaseField>,
      <van-popup v-model={[this.showPicker, 'show']}
                 destroy-on-close
                 position="bottom"
      >
        <div class="van-picker__toolbar">
          <button
            onClick={this.onCancel}
            type="button" class="van-picker__cancel van-haptics-feedback">取消
          </button>
          <div class="van-picker__title van-ellipsis">标题</div>
          <button
            onClick={this.onConfirm}
            type="button" class="van-picker__confirm van-haptics-feedback">确认
          </button>
        </div>
        {this.getInputContent()}
      </van-popup>
    ];
  }
});