import classNames from 'classnames';
import {Component, getCurrentInstance, inject, onBeforeUnmount, onMounted, provide, watch} from 'vue';
import BaseMixin from '../_util/BaseMixin';
import isNumeric from '../_util/isNumeric';
import {getComponentFromProp, getListeners, getOptionProps, hasProp, initDefaultProps} from '../_util/props-util';
import PropTypes from '../_util/vue-types';
import {ConfigConsumerProps} from '../config-provider';
import Icon from '../icon';

// matchMedia polyfill for
// https://github.com/WickyNilliams/enquire.js/issues/82
if (typeof window !== 'undefined') {
  const matchMediaPolyfill = (mediaQuery: string) => {
    return {
      media: mediaQuery,
      matches: false,
      addListener(listener: ((this: MediaQueryList, ev: MediaQueryListEvent) => any) | null) {
      },
      removeListener(listener: ((this: MediaQueryList, ev: MediaQueryListEvent) => any) | null) {
      }
    } as MediaQueryList;
  };
  window.matchMedia = window.matchMedia || matchMediaPolyfill;
}

const dimensionMaxMap = {
  xs: '479.98px',
  sm: '575.98px',
  md: '767.98px',
  lg: '991.98px',
  xl: '1199.98px',
  xxl: '1599.98px'
};

// export type CollapseType = 'clickTrigger' | 'responsive';

export const SiderProps = {
  prefixCls: PropTypes.string,
  collapsible: PropTypes.bool,
  collapsed: PropTypes.bool,
  defaultCollapsed: PropTypes.bool,
  reverseArrow: PropTypes.bool,
  // onCollapse?: (collapsed: boolean, type: CollapseType) => void;
  zeroWidthTriggerStyle: PropTypes.object,
  trigger: PropTypes.any,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  collapsedWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  breakpoint: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', 'xxl']),
  theme: PropTypes.oneOf(['light', 'dark']).def('dark')
};

// export interface SiderState {
//   collapsed?: boolean;
//   below: boolean;
//   belowShow?: boolean;
// }

// export interface SiderContext {
//   siderCollapsed: boolean;
// }

const generateId = (() => {
  let i = 0;
  return (prefix = '') => {
    i += 1;
    return `${prefix}${i}`;
  };
})();

export default {
  name: 'ALayoutSider',
  __ANT_LAYOUT_SIDER: true,
  mixins: [BaseMixin],
  setup() {
    this.uniqueId = generateId('ant-sider-');
    let matchMedia;
    if (typeof window !== 'undefined') {
      matchMedia = window.matchMedia;
    }
    const props = getOptionProps(this);
    if (matchMedia && props.breakpoint && props.breakpoint in dimensionMaxMap) {
      this.mql = matchMedia(`(max-width: ${dimensionMaxMap[props.breakpoint]})`);
    }
    let sCollapsed;
    if ('collapsed' in props) {
      sCollapsed = props.collapsed;
    } else {
      sCollapsed = props.defaultCollapsed;
    }
    const {root} = getCurrentInstance();
    provide('layoutSiderContext', root);
    const siderHook = inject('siderHook') || (() => ({}));
    const configProvider = inject('configProvider') || (() => ConfigConsumerProps);
    watch(props.collapsed, (value) => {
      this.setState({
        sCollapsed: value
      });
    });
    onMounted(() => {
      this.$nextTick(() => {
        if (this.mql) {
          this.mql.addListener(this.responsiveHandler);
          this.responsiveHandler(this.mql);
        }

        if (this.siderHook.addSider) {
          this.siderHook.addSider(this.uniqueId);
        }
      });
    });
    onBeforeUnmount(() => {
      if (this.mql) {
        this.mql.removeListener(this.responsiveHandler);
      }

      if (this.siderHook.removeSider) {
        this.siderHook.removeSider(this.uniqueId);
      }
    });
    const responsiveHandler = (mql) => {
      this.setState({below: mql.matches});
      this.$emit('breakpoint', mql.matches);
      if (this.sCollapsed !== mql.matches) {
        this.setCollapsed(mql.matches, 'responsive');
      }
    };

    const setCollapsed = (collapsed, type) => {
      if (!hasProp(this, 'collapsed')) {
        this.setState({
          sCollapsed: collapsed
        });
      }
      this.$emit('collapse', collapsed, type);
    };

    const toggle = () => {
      const collapsed = !this.sCollapsed;
      this.setCollapsed(collapsed, 'clickTrigger');
    };

    const belowShowChange = () => {
      this.setState({belowShow: !this.belowShow});
    };
    return {
      sCollapsed,
      below: false,
      belowShow: false,
      siderHook, configProvider,
      setCollapsed, toggle, responsiveHandler, belowShowChange
    };
  },
  model: {
    prop: 'collapsed',
    event: 'collapse'
  },
  props: initDefaultProps(SiderProps, {
    collapsible: false,
    defaultCollapsed: false,
    reverseArrow: false,
    width: 200,
    collapsedWidth: 80
  }),
  render() {
    const {
      prefixCls: customizePrefixCls,
      theme,
      collapsible,
      reverseArrow,
      width,
      collapsedWidth,
      zeroWidthTriggerStyle
    } = getOptionProps(this);
    const getPrefixCls = this.configProvider.getPrefixCls;
    const prefixCls = getPrefixCls('layout-sider', customizePrefixCls);

    const trigger = getComponentFromProp(this, 'trigger');
    const rawWidth = this.sCollapsed ? collapsedWidth : width;
    // use "px" as fallback unit for width
    const siderWidth = isNumeric(rawWidth) ? `${rawWidth}px` : String(rawWidth);
    // special trigger when collapsedWidth == 0
    const zeroWidthTrigger =
        parseFloat(String(collapsedWidth || 0)) === 0 ? (
            <span
                onClick={this.toggle}
                class={`${prefixCls}-zero-width-trigger ${prefixCls}-zero-width-trigger-${
                    reverseArrow ? 'right' : 'left'
                }`}
                style={zeroWidthTriggerStyle}
            >
              <Icon type="bars"/>
            </span>
        ) : null;
    const iconObj = {
      expanded: reverseArrow ? <Icon type="right"/> : <Icon type="left"/>,
      collapsed: reverseArrow ? <Icon type="left"/> : <Icon type="right"/>
    };
    const status = this.sCollapsed ? 'collapsed' : 'expanded';
    const defaultTrigger = iconObj[status];
    const triggerDom =
        trigger !== null
            ? zeroWidthTrigger || (
            <div class={`${prefixCls}-trigger`} onClick={this.toggle} style={{width: siderWidth}}>
              {trigger || defaultTrigger}
            </div>
        )
            : null;
    const divStyle = {
      // ...style,
      flex: `0 0 ${siderWidth}`,
      maxWidth: siderWidth, // Fix width transition bug in IE11
      minWidth: siderWidth, // https://github.com/ant-design/ant-design/issues/6349
      width: siderWidth
    };
    const siderCls = classNames(prefixCls, `${prefixCls}-${theme}`, {
      [`${prefixCls}-collapsed`]: !!this.sCollapsed,
      [`${prefixCls}-has-trigger`]: collapsible && trigger !== null && !zeroWidthTrigger,
      [`${prefixCls}-below`]: !!this.below,
      [`${prefixCls}-zero-width`]: parseFloat(siderWidth) === 0
    });
    const divProps = {
      on: getListeners(this),
      class: siderCls,
      style: divStyle
    };
    return (
        <aside {...divProps}>
          <div class={`${prefixCls}-children`}>{this.$slots.default}</div>
          {collapsible || (this.below && zeroWidthTrigger) ? triggerDom : null}
        </aside>
    );
  }
} as Component;
