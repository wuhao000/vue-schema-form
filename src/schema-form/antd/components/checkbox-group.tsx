import {computed, defineComponent, PropType} from 'vue';
import {useOptions} from './utils';
import classNames from 'classnames';

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
    const classes = classNames(this.$attrs.class, {
      'ant-checkbox-group-span': this.span > 0,
      ['ant-checkbox-group-span-' + this.span]: this.span > 0
    });
    const props = {
      ...this.$attrs,
      options: this.localOptions ?? [],
      class: classes
    };
    return <div>
      {this.showSelectAll ? <div>
        <a-checkbox
          onUpdate:checked={this.onSelectAllChange}
          checked={this.allSelected}>全选
        </a-checkbox>
      </div> : null}
      <a-checkbox-group {...props}
                        value={this.value}
                        onUpdate:value={(v) => {
                          this.$emit('update:value', v);
                        }}
                        v-slots={this.$slots}/>
    </div>;
  }
});
