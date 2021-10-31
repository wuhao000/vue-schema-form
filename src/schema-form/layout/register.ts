import {FieldDefinition, LayoutOptions, Platform} from '../../../types';
import {registerComponent} from '../config';
import {DESKTOP, MOBILE} from '../utils/utils';
import Card from './card';
import FormBlock from './form-block';
import GridLayout from './grid';
import StepsLayout from './steps';
import Table from './table';
import TextBox from './text-box';

/**
 *
 * @param options
 */
export const registerLayout = (options: {
  component: string | any,
  platforms: Platform | Platform[],
  types: string | string[],
  layoutOptions?: LayoutOptions,
  getProps?: ((definition: FieldDefinition, platform: Platform) => any)
}) => {
  registerComponent({
    component: options.component, platforms: options.platforms,
    types: options.types,
    mode: ['layout'],
    layoutOptions: options.layoutOptions,
    getProps: options.getProps
  });
};

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
  types: 'table'
});
registerLayout({
  component: FormBlock,
  platforms: DESKTOP,
  types: 'block',
  layoutOptions: {
    noTitle: true,
    noWrap: true
  }
});
registerLayout({
  component: Card,
  platforms: [DESKTOP],
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
