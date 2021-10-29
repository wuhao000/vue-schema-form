import {computed} from 'vue';

export const getOptionProperty = function getOptionProperty(option: any, property: string | ((option: any) => any)): any {
  if (typeof option === 'string') {
    return option;
  } else if (typeof property === 'string') {
    return option[property];
  } else if (typeof property === 'function') {
    return property(option);
  }
};
export const useOptions = (props) => {
  const options = computed(() => {
    if (props.options) {
      return props.options.map(option => {
        const op: any = Object.assign({}, option);
        op.label = getOptionProperty(option, props.labelProperty);
        op.value = getOptionProperty(option, props.valueProperty);
        return op;
      });
    } else {
      return null;
    }
  });
  return {options};
};
