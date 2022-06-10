import {computed, ComputedRef} from 'vue';

export const getOptionProperty = function getOptionProperty(option: string | Record<string, unknown>,
                                                            property: string | ((option: Record<string, unknown>) => unknown)): unknown {
  if (typeof option === 'string') {
    return option;
  } else if (typeof property === 'string') {
    return option[property];
  } else if (typeof property === 'function') {
    return property(option);
  }
};
export const useOptions = (props): {
  options: ComputedRef<any[]>
} => {
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
