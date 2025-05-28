import { isNull } from '../utils/utils';

const transferValue = (value) => {
  if (isNull(value)) {
    return '';
  }
  return value.toString();
};

const transferBack = (value) => {
  if (isNull(value)) {
    return value;
  } else if (typeof value === 'string' && value.trim() !== '') {
    return parseFloat(value.trim());
  } else if (typeof value === 'number') {
    return value;
  } else {
    return undefined;
  }
};

export default (props, { emit }) => {
  const value = transferValue(props.value);
  return <van-field
    {...props}
    modelValue={value}
    type="number"
    onUpdate:modelValue={v => {
      emit('update:value', transferBack(v));
    }} />;
}
