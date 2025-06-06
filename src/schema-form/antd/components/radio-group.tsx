import { chunk } from 'lodash';
import omit from 'omit.js';
import { defineComponent, PropType } from 'vue';
import { useOptions } from '../../utils/utils';

export default defineComponent({
  name: 'DRadioGroup',
  props: {
    options: Array,
    value: [String, Number, Boolean, Object],
    span: Number as PropType<number>,
    labelProperty: {
      type: [String, Function], default: 'label'
    },
    readonly: Boolean,
    disabled: Boolean,
    valueProperty: {
      type: [String, Function], default: 'value'
    },
    type: {
      type: String as PropType<'button' | 'radio'>,
      default: 'radio'
    },
    allowClear: {
      type: Boolean
    }
  },
  emits: ['update:value'],
  setup(props, {emit}) {
    const {options: localOptions} = useOptions(props);
    const onOptionClick = (o) => {
      if (o.value === props.value && props.allowClear) {
        emit('update:value', undefined);
      }
    };
    return {localOptions, onOptionClick};
  },
  render() {
    const props = {
      ...this.$attrs
    };
    const slots = {
      ...this.$slots
    };
    if (this.localOptions && this.span) {
      const cols = Math.abs(24 / this.span);
      const chunks = chunk(this.localOptions, cols);
      slots.default = () => chunks.map(c => (
        <a-row>
          {
            c.map(o => (
              <a-col span={this.span}>
                {
                  this.type === 'button' ? <a-radio-button {...o}
                                                           onClick={() => {
                                                             this.onOptionClick(o);
                                                           }}>{o.label}</a-radio-button>
                    : <a-radio {...o}
                               onClick={() => {
                                 this.onOptionClick(o);
                               }}>{o.label}</a-radio>
                }
              </a-col>
            ))
          }
        </a-row>
      )) as any;
    } else {
      slots.default = () => this.localOptions && this.localOptions.map(it => omit(it, ['children'])).map(o => (
        this.type === 'button' ? <a-radio-button {...o}
                                                 onClick={() => {
                                                   this.onOptionClick(o);
                                                 }}>{o.label}</a-radio-button>
          : <a-radio {...o}
                     onClick={() => {
                       this.onOptionClick(o);
                     }}>{o.label}</a-radio>
      )) as any;
    }
    return <a-radio-group
      {...props}
      value={this.value}
      onUpdate:value={(v) => {
        if (this.readonly) {
          this.$emit('update:value', this.value);
        } else if (!this.disabled) {
          this.$emit('update:value', v);
        }
      }}
      disabled={this.disabled}
      v-slots={slots} />;
  }
});
