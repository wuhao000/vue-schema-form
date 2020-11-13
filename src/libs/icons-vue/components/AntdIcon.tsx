import classNames from 'classnames';
import VueIcon from './IconBase';
import { setTwoToneColor, getTwoToneColor } from './twoTonePrimaryColor';
import { normalizeTwoToneColors } from '../utils';
import { defineComponent } from 'vue';

// Initial setting
setTwoToneColor('#1890ff');
const COMPONENT_NAME = 'AntdIcon';
const Icon = defineComponent({
  functional: true,
  props: {
    icon: Object,
    spin: Boolean,
    rotate: Number,
    tabIndex: [String, Number],
    twoToneColor: [String, Array]
  },
  render(h, ctx) {
    const {
      icon,
      spin,
      rotate,
      tabIndex,
      twoToneColor,
      ...restProps
    } = {...this.$attrs, ...this.$props};
    const { click: onClick } = listeners;
    const classString = classNames('anticon', {
      [`anticon-${icon.name}`]: Boolean(icon.name)
    });

    const svgClassString = classNames({
      'anticon-spin': !!spin || icon.name === 'loading'
    });

    let iconTabIndex = tabIndex;
    if (iconTabIndex === undefined && onClick) {
      iconTabIndex = -1;
    }

    const svgStyle = rotate
      ? {
          msTransform: `rotate(${rotate}deg)`,
          transform: `rotate(${rotate}deg)`
        }
      : undefined;
    const [primaryColor, secondaryColor] = normalizeTwoToneColors(twoToneColor);

    return (
      <span
        role="img"
        aria-label={icon.name}
        tabIndex={iconTabIndex}
        class={classString}
        {...{ ...restData, attrs: restProps, on: listeners }}
      >
        <VueIcon
          class={svgClassString}
          icon={icon}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          style={svgStyle}
        />
      </span>
    );
  }
}) && {getTwoToneColor, setTwoToneColor, name: COMPONENT_NAME};

export default Icon;
