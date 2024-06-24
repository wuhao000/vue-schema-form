import locale from 'ant-design-vue/es/time-picker/locale/zh_CN';
import {PropType, ref, watch} from 'vue';
import {useBaseInput} from '../mixins';
import {isNotNull, isNull} from '../utils/utils';

export const baseTimePickerProps = {
  value: {
    type: [String, Date]
  },
  valueType: {
    type: String as PropType<'string' | 'date'>,
    default: 'string'
  },
  locale: {
    type: Object as PropType<any>,
    default: () => locale
  },
  localeCode: {
    type: String as PropType<string>,
    default: 'zh'
  },
  clearable: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  format: {
    type: String as PropType<string>,
    default: 'HH:mm'
  }
};

export const useBaseTimePicker = (props, {attrs, emit, convertValue, convertValueBack, valueProp}) => {
  const {disabled, size} = useBaseInput(props, {attrs});
  const stateValue = ref(null);
  watch(() => props[valueProp], (value: string | Date) => {
    const convertedValue: Date = convertValue(value);
    if (isNull(stateValue.value)) {
      stateValue.value = convertedValue;
    } else if (!convertedValue) {
      stateValue.value = null;
    } else if (stateValue.value.toString() !== convertedValue.toString()) {
      stateValue.value = convertedValue;
    }
  }, {immediate: true});
  const getProps = () => {
    return {
      size: size.value,
      disabled: disabled.value,
      ...props,
      ...attrs,
      [valueProp]: stateValue.value,
      [`onUpdate:${valueProp}`]: (value) => {
        if (isNotNull(value) && value.toString() === '[object InputEvent]') {
          return;
        }
        const convertedValue = convertValueBack(value);
        emit(`update:${valueProp}`, convertedValue);
        stateValue.value = value;
      },
      onChange: (value) => {
        emit('change', value);
      },
      allowClear: attrs.allowClear !== undefined ? attrs.allowClear : props.clearable,
      format: props.format
    };
  };
  return {
    getProps,
    stateValue
  };
};
