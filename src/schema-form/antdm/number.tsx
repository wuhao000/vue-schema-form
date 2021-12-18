const transferValue = (value) => {
  if (typeof value === 'number') {
    return value;
  }
  if (typeof value === 'string') {
    if (value.trim() === '') {
      return null;
    } else {
      return parseFloat(value);
    }
  }
  return value;
}

export default (props, {emit}) => {
  const value = props.value;
  props.value = transferValue(value)
  props['onUpdate:value'] = (value) => {
    emit('update:value', transferValue(value));
  }
  return <m-input {...props}/>;
}
