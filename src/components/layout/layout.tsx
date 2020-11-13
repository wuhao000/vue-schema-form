import classNames from 'classnames';
import {Component, inject, provide, ref, App} from 'vue';
import {getListeners, getOptionProps} from '../_util/props-util';
import PropTypes from '../_util/vue-types';

export const BasicProps = {
  prefixCls: PropTypes.string,
  hasSider: PropTypes.boolean,
  tagName: PropTypes.string
};

function generator({suffixCls, tagName, name}) {
  return BasicComponent => {
    return {
      name,
      props: BasicComponent.props,
      setup() {
        const configProvider = inject('configProvider');
        return {configProvider};
      },
      render() {
        const {prefixCls: customizePrefixCls} = this.$props;
        const getPrefixCls = this.configProvider.getPrefixCls;
        const prefixCls = getPrefixCls(suffixCls, customizePrefixCls);
        const basicComponentProps = {
          props: {
            prefixCls,
            ...getOptionProps(this),
            tagName
          },
          on: getListeners(this)
        };
        return <BasicComponent {...basicComponentProps}>{this.$slots.default}</BasicComponent>;
      }
    } as Component;
  };
}

const Basic = {
  props: BasicProps,
  render() {
    const {prefixCls, tagName: Tag, $slots} = this;
    const divProps = {
      class: prefixCls,
      on: getListeners(this)
    };
    return <Tag {...divProps}>{$slots.default}</Tag>;
  }
} as Component;

const BasicLayout = {
  props: BasicProps,
  setup() {
    const siders = ref([]);
    provide('siderHook', {
      addSider: id => {
        siders.value = [...this.siders.value, id];
      },
      removeSider: id => {
        siders.value = siders.value.filter(currentId => currentId !== id);
      }
    });
    return {siders};
  },
  render() {
    const {prefixCls, $slots, hasSider, tagName: Tag} = this;
    const divCls = classNames(prefixCls, {
      [`${prefixCls}-has-sider`]: typeof hasSider === 'boolean' ? hasSider : this.siders.length > 0
    });
    const divProps = {
      class: divCls,
      on: getListeners
    };
    return <Tag {...divProps}>{$slots.default}</Tag>;
  }
} as Component;

const Layout = generator({
  suffixCls: 'layout',
  tagName: 'section',
  name: 'ALayout'
})(BasicLayout) as Component & {
  Sider?: Component,
  Header: Component,
  Footer: Component,
  Content: Component,
  install: (app: App) => any
};

const Header = generator({
  suffixCls: 'layout-header',
  tagName: 'header',
  name: 'ALayoutHeader'
})(Basic);

const Footer = generator({
  suffixCls: 'layout-footer',
  tagName: 'footer',
  name: 'ALayoutFooter'
})(Basic);

const Content = generator({
  suffixCls: 'layout-content',
  tagName: 'main',
  name: 'ALayoutContent'
})(Basic);

Layout.Header = Header;
Layout.Footer = Footer;
Layout.Content = Content;

export default Layout;
