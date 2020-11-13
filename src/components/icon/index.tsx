import VueIcon from '@/libs/icons-vue';
import classNames from 'classnames';
import {App, defineComponent} from 'vue';
import {filterEmpty, getListeners} from '../_util/props-util';
import PropTypes from '../_util/vue-types';
import warning from '../_util/warning';
import Base from '../base';
import LocaleReceiver from '../locale-provider/locale-receiver';
import createFromIconfontCN from './IconFont';
import {getTwoToneColor, setTwoToneColor} from './twoTonePrimaryColor';

import {alias, getThemeFromTypeName, removeTypeTheme, svgBaseProps, withThemeSuffix} from './utils';

// Initial setting

setTwoToneColor('#1890ff');
const defaultTheme = 'outlined';
let dangerousTheme;

function renderIcon(locale, context) {
  const {$props: props, $slots} = context;
  const listeners = getListeners(context);
  const {
    // affect inner <svg>...</svg>
    type,
    component: Component,
    viewBox,
    spin,
    // other
    theme, // default to outlined
    twoToneColor,
    rotate,
    tabIndex
  } = props;
  let children = filterEmpty($slots.default);
  children = children.length === 0 ? undefined : children;
  warning(
      Boolean(type || Component || children),
      'Icon',
      'Icon should have `type` prop or `component` prop or `children`.'
  );

  const classString = classNames({
    [`anticon`]: true,
    [`anticon-${type}`]: !!type
  });

  const svgClassString = classNames({
    [`anticon-spin`]: !!spin || type === 'loading'
  });

  const svgStyle = rotate
      ? {
        msTransform: `rotate(${rotate}deg)`,
        transform: `rotate(${rotate}deg)`
      }
      : undefined;

  const innerSvgProps = {
    attrs: {
      ...svgBaseProps,
      viewBox
    },
    class: svgClassString,
    style: svgStyle
  };
  if (!viewBox) {
    delete innerSvgProps.attrs.viewBox;
  }

  const renderInnerNode = () => {
    // component > children > type
    if (Component) {
      return <Component {...innerSvgProps}>{children}</Component>;
    }
    if (children) {
      warning(
          Boolean(viewBox) || (children.length === 1 && children[0].tag === 'use'),
          'Icon',
          'Make sure that you provide correct `viewBox`' +
          ' prop (default `0 0 1024 1024`) to the icon.'
      );
      const innerSvgProps = {
        attrs: {
          ...svgBaseProps
        },
        class: svgClassString,
        style: svgStyle
      };
      return (
          <svg {...innerSvgProps} viewBox={viewBox}>
            {children}
          </svg>
      );
    }

    if (typeof type === 'string') {
      let computedType = type;
      if (theme) {
        const themeInName = getThemeFromTypeName(type);
        warning(
            !themeInName || theme === themeInName,
            'Icon',
            `The icon name '${type}' already specify a theme '${themeInName}',` +
            ` the 'theme' prop '${theme}' will be ignored.`
        );
      }
      computedType = withThemeSuffix(
          removeTypeTheme(alias(computedType)),
          dangerousTheme || theme || defaultTheme
      );

      return (
          <VueIcon
              focusable="false"
              class={svgClassString}
              type={computedType}
              primaryColor={twoToneColor}
              style={svgStyle}
          />
      );
    }
  };
  let iconTabIndex = tabIndex;
  if (iconTabIndex === undefined && 'click' in listeners) {
    iconTabIndex = -1;
  }
  // functional component not support nativeOn，https://github.com/vuejs/vue/issues/7526
  const iProps = {
    attrs: {
      'aria-label': type && `${locale.icon}: ${type}`,
      tabIndex: iconTabIndex
    },
    on: listeners,
    class: classString,
    staticClass: ''
  };
  return <i {...iProps}>{renderInnerNode()}</i>;
}
const COMPONENT_NAME = 'AIcon';
const Icon = defineComponent({
  name: COMPONENT_NAME,
  props: {
    tabIndex: PropTypes.number,
    type: PropTypes.string,
    component: PropTypes.any,
    viewBox: PropTypes.any,
    spin: PropTypes.bool.def(false),
    rotate: PropTypes.number,
    theme: PropTypes.oneOf(['filled', 'outlined', 'twoTone']),
    twoToneColor: PropTypes.string,
    role: PropTypes.string
  },
  render() {
    return (
        // @ts-ignore
        <LocaleReceiver
            componentName="Icon"
            scopedSlots={{default: locale => renderIcon(locale, this)}}
        />
    );
  }
}) && {
  createFromIconfontCN: createFromIconfontCN,
  getTwoToneColor: getTwoToneColor,
  setTwoToneColor: setTwoToneColor,
  install: (app: App) => {
    app.use(Base);
    app.component(COMPONENT_NAME, Icon);
  }
};

export default Icon;
