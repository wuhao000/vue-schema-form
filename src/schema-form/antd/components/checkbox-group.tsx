import chunk from 'lodash.chunk';
import {computed, defineComponent, PropType, ref} from 'vue';
import {useOptions} from './utils';

export default defineComponent({
  name: 'DCheckboxGroup',
  props: {
    value: Array,
    options: Array,
    span: Number as PropType<number>,
    labelProperty: {
      type: String, default: 'label'
    },
    valueProperty: {
      type: String, default: 'value'
    },
    showSelectAll: Boolean
  },
  emits: ['update:value'],
  setup(props, {emit}) {
    const {options: localOptions} = useOptions(props);
    const allSelected = computed(() => {
      if (!props.value) {
        return false;
      }
      return !localOptions.value.filter(it => !it.disabled)
          .some(it => !props.value.includes(it.value));
    });
    const onSelectAllChange = (v) => {
      if (v) {
        emit('update:value', localOptions.value
            .filter(it => !it.disabled)
            .map(it => it.value));
      } else {
        emit('update:value', []);
      }
    };
    return {
      localOptions,
      allSelected,
      onSelectAllChange
    };
  },
  render() {
    const props = {
      ...this.$attrs
    };
    const slots = {
      ...this.$slots
    };
    if (this.localOptions && this.span) {
      const cols = Math.abs(24 / (this.span as number));
      const chunks = chunk(this.localOptions, cols);
      slots.default = () => chunks.map(c => (
          <a-row>
            {
              c.map(o => (
                  <a-col span={this.span}>
                    <a-checkbox {...o}>{o.label}</a-checkbox>
                  </a-col>
              ))
            }
          </a-row>
      )) as any;
    } else {
      props.options = this.localOptions;
    }
    return <>
      {this.showSelectAll ? <div>
        <a-checkbox
            onUpdate:checked={this.onSelectAllChange}
            checked={this.allSelected}>全选
        </a-checkbox>
      </div> : null}
      <a-checkbox-group {...props}
                        value={this.value}
                        onUpdate:value={(v) => {
                          this.allSelected = v.length === this.localOptions.length;
                          this.$emit('update:value', v);
                        }}
                        v-slots={slots}/>
    </>;
  }
});
