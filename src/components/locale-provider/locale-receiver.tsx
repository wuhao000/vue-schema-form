import PropTypes from '../_util/vue-types';
import defaultLocaleData from './default';
import { defineComponent, inject } from 'vue';

export default defineComponent({
  name: 'LocaleReceiver',
  props: {
    componentName: PropTypes.string.def('global'),
    defaultLocale: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    children: PropTypes.func
  },
  setup(props) {
    const localeData: any = inject('localeData');
    const getLocale = () => {
      const { componentName, defaultLocale } = props;
      const locale = defaultLocale || defaultLocaleData[componentName || 'global'];
      const { antLocale } = localeData;

      const localeFromContext = componentName && antLocale ? antLocale[componentName] : {};
      return {
        ...(typeof locale === 'function' ? locale() : locale),
        ...(localeFromContext || {})
      };
    }

    const getLocaleCode = () => {
      const { antLocale } = localeData;
      const localeCode = antLocale && antLocale.locale;
      // Had use LocaleProvide but didn't set locale
      if (antLocale && antLocale.exist && !localeCode) {
        return defaultLocaleData.locale;
      }
      return localeCode;
    }
    return {getLocale, getLocaleCode, localeData};
  },

  render() {
    const { $scopedSlots } = this;
    const children = this.children || $scopedSlots.default;
    const { antLocale } = this.localeData;
    return children(this.getLocale(), this.getLocaleCode(), antLocale);
  }
});
