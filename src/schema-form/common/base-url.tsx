import {computed, PropType, ref, watch} from 'vue';
import {Platform} from '../../../types';
import {useBaseInput} from '../mixins/base-input';

export const baseUrlProps = {
  disabled: {type: Boolean, default: false},
  protocols: {
    type: Array, default: () => {
      return ['http', 'https'];
    }
  },
  value: String,
  platform: String as PropType<Platform>,
  valueProp: {
    type: String,
    default: 'value'
  }
};

export const useBaseUrl = (props, ctx) => {
  const {size} = useBaseInput(props, ctx);
  const domain = ref('');
  const protocol = ref('https');
  const current = computed(() => {
    return (protocol.value ? protocol.value + '://' : '') + (domain.value ? domain.value : '');
  });
  const options = props.protocols.map(imte => ({
    value: imte,
    label: imte + '://'
  }));
  watch(() => current.value, (value) => {
    ctx.emit('update:value', value);
    ctx.emit('change', value);
  });
  watch(() => props.value, (v) => {
    if (typeof v === 'string') {
      if (v !== current.value) {
        const protocolTmp = props.protocols.find(p => v.startsWith(p + '://'));
        if (protocolTmp) {
          protocol.value = protocolTmp;
        }
        domain.value = v.replace(protocolTmp + '://', '');
      }
    } else {
      protocol.value = null;
      domain.value = null;
    }
  }, {immediate: true});
  return {
    protocol, domain, options, currentValue: current, size
  };
};
