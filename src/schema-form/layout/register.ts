import {Component} from 'vue';
import {ArrayMode, LayoutOptions, Platform} from '../../../types';
import {FieldDefinition} from '../bean/field-definition';
import {registerComponent} from '../config';
import {DESKTOP, MOBILE} from '../utils/utils';
import Card from './card';
import FormBlock from './form-block';
import FormBlockMobile from './form-block-mobile';
import GridLayout from './grid';
import GroupLayout from './group';
import StepsLayout from './steps';
import Table from './table';
import TextBox from './text-box';

/**
 *
 * @param options
 */
export const registerLayout = (options: {
  component: string | Component,
  platforms: Platform | Platform[],
  arrayMode?: ArrayMode,
  types: string | string[],
  layoutOptions?: LayoutOptions,
  getProps?: ((definition: FieldDefinition, platform: Platform) => any)
}) => {
  registerComponent({
    component: options.component,
    platforms: options.platforms,
    mode: 'layout',
    arrayMode: options.arrayMode ?? 'both',
    types: options.types,
    layoutOptions: options.layoutOptions,
    getProps: options.getProps
  });
};

registerLayout({
  component: GroupLayout,
  platforms: [DESKTOP, MOBILE],
  types: 'group',
  layoutOptions: {
    noTitle: true,
    noWrap: true,
    noDirectives: true
  }
});

registerLayout({
  component: StepsLayout,
  platforms: [DESKTOP, MOBILE],
  types: 'steps',
  layoutOptions: {
    noTitle: true,
    noWrap: true
  }
});

registerLayout({
  component: GridLayout,
  platforms: [DESKTOP, MOBILE],
  types: 'grid',
  layoutOptions: {
    noTitle: true,
    noWrap: true
  }
});
registerLayout({
  component: Table,
  platforms: DESKTOP,
  arrayMode: 'array',
  types: 'table',
  getProps: (field, platform) => {
    return {field, platform}
  }
});
registerLayout({
  component: FormBlock,
  platforms: DESKTOP,
  types: 'block',
  arrayMode: 'array',
  layoutOptions: {
    noTitle: true,
    noWrap: true
  }
});
registerLayout({
  component: FormBlockMobile,
  platforms: MOBILE,
  types: 'block',
  arrayMode: 'array',
  layoutOptions: {
    noTitle: true,
    noWrap: true
  }
});
registerLayout({
  component: Card,
  platforms: [DESKTOP, MOBILE],
  types: ['card'],
  layoutOptions: {
    noTitle: true,
    noWrap: true
  }
});
registerLayout({
  component: TextBox,
  platforms: [DESKTOP, MOBILE],
  types: 'text-box'
});
