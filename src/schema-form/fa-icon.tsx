import classNames from 'classnames';
import {computed, defineComponent, PropType} from 'vue';

export default defineComponent({
  name: 'FaIcon',
  props: {
    animation: {
      type: String as PropType<string>
    },
    border: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    color: {
      type: String as PropType<string>
    },
    fixed: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    flip: {
      type: String as PropType<string>
    },
    list: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    name: {
      type: String as PropType<string>
    },
    rotate: {
      type: Number as PropType<number>
    },
    size: {
      type: String as PropType<string>,
      default: null
    }
  },
  setup(props) {
    const iconStyle = computed(() => {
      const style: {
        color?: string
      } = {};
      if (props.color) {
        style.color = props.color as string;
      }
      return style;
    });
    const iconClass = computed(() => {
      return classNames(`fa-${props.name}`, {
        [`fa-${props.size}`]: props.size,
        [`fa-${props.animation}`]: props.animation,
        [`fa-rotate-${props.rotate}`]: props.rotate,
        [`fa-flip-${props.flip}`]: props.flip,
        ['fa-border']: props.border,
        ['fa-fw']: props.fixed,
        ['fa-li']: props.list
      });
    });

    return {
      iconClass,
      iconStyle
    };
  },
  render() {
    return (
        <em
            class={this.iconClass + ' fa'}
            style={this.iconStyle}/>
    );
  }
});

