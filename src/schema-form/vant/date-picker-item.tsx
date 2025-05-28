import { computed, defineComponent, ref, watch } from 'vue';
import dayjs from 'dayjs';
import { isNotNull } from '../utils/utils';
import BaseField from './base-field';


export default defineComponent({
  name: 'VmDatePickerItem',
  inheritAttrs: false,
  props: {
    mode: String,
    format: String,
    valueType: String,
    value: [String, Date]
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    const convertValue = (value: string | Date) => {
      if (!value) {
        return undefined;
      }
      if (value instanceof Date) {
        return value;
      } else if (typeof value === 'string' && props.mode === 'time') {
        return dayjs(value, props.format || 'HH:mm').toDate();
      } else {
        return dayjs(value, props.format).toDate();
      }
    };
    const convertValueBack = (value: Date) => {
      if (isNotNull(value) && props.mode === 'time') {
        if (props.valueType === 'date') {
          return value;
        } else {
          return dayjs(value).format(props.format || 'HH:mm');
        }
      }
      return value;
    };
    const localValue = ref();
    const showPicker = ref(false);
    const valueString = computed(() => {
      const v = localValue.value;
      if (v) {
        switch (props.mode) {
          case 'year':
            return dayjs(v).format('YYYY') + '年';
          case 'date':
            return dayjs(v).format(props.format || 'YYYY-MM-DD');
          case 'time':
            return dayjs(v).format(props.format || 'HH:mm');
          case 'datetime':
            return dayjs(v).format(props.format || 'YYYY-MM-DD HH:mm');
          case 'month':
            return dayjs(v).format(props.format || 'YYYY年MM月');
        }
      }
      return 'aaa';
    });

    const onConfirm = () => {
      const v = convertValueBack(localValue.value);
      if (props.value !== v) {
        emit('update:value', v);
      }
      showPicker.value = false;
    };

    watch(() => props.value, () => {
      const v = convertValue(props.value);
      if (localValue.value !== v) {
        localValue.value = v;
      }
    }, { immediate: true });

    const columnsType = computed(() => {
      if (props.mode === 'year') {
        return ['year'];
      } else if (props.mode === 'month') {
        return ['year', 'month'];
      }
      return undefined;
    });

    return {
      localValue,
      valueString,
      showPicker,
      columnsType,
      onConfirm
    };
  },

  render() {
    const day = dayjs(this.localValue);
    const arr = [day.year()];
    if (this.mode === 'month' || this.mode === 'date') {
      arr[1] = day.month();
    }
    if (this.mode === 'date') {
      arr[2] = day.date();
    }
    return [
      <BaseField
        {...this.$attrs}
        isLink
        onClick={() => {
          this.showPicker = true;
        }}>
        {this.valueString}
      </BaseField>,
      <van-popup
        v-model={[this.showPicker, 'show']}
        destroyOnClose
        position="bottom">
        <van-date-picker
          {...this.$attrs}
          columnsType={this.columnsType}
          modelValue={arr}
          onUpdate:modelValue={v => {
            const numArr = v.map(it => parseInt(it));
            if (this.mode === 'year') {
              this.localValue = dayjs().year(numArr[0]).toDate();
            } else if (this.mode === 'month') {
              this.localValue = dayjs().year(numArr[0]).month(numArr[1]).toDate();
            } else {
              this.localValue = dayjs().year(numArr[0]).month(numArr[1]).date(numArr[2]).toDate();
            }
          }}
          onConfirm={this.onConfirm}
          onCancel={
            () => this.showPicker = false
          }
        />
      </van-popup>
    ];
  }
});