import classNames from 'classnames';
import {defineComponent, PropType} from 'vue';
import {baseButtonProps} from '../common/base-button';
import {useBaseInput} from '../mixins';
import {ClassType} from "../types";

export default defineComponent({
  name: 'DButton',
  props: {
    ...baseButtonProps,
    text: {
      type: Boolean,
      default: false
    },
    circle: {
      type: Boolean,
      default: false
    },
    htmlType: {
      type: String as PropType<string>,
      default: 'button'
    },
    type: String,
    onClick: Function
  },
  setup(props, ctx) {
    const {size} = useBaseInput(props, ctx);
    return {
      size
    };
  },
  render() {
    const props: any = {
      ...this.$attrs,
      onClick: this.onClick,
      htmlType: this.htmlType,
      size: this.size,
      class: classNames(this.$attrs.class as ClassType),
      shape: this.circle ? 'circle' : this.$attrs.shape
    };
    if (this.type === 'danger') {
      props.danger = true;
    } else {
      props.type = this.type;
    }
    const defaultSlot = this.$slots.default;
    const slots = Object.assign({}, this.$slots, {
      default: () => {
        return [
          this.title, defaultSlot?.()
        ];
      }
    });
    return <el-button {...props} v-slots={slots}/>;
  }
});
