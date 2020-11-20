import Card from './card';
import FormBlock from './form-block';
import GridLayout from './grid';
import TextBox from './text-box';
import { addComponent } from '../utils/register';
import { DESKTOP, MOBILE } from '../utils/utils';

/**
 *
 * @param options
 */
export var registerLayout = function registerLayout(options) {
  addComponent({
    component: options.component,
    platforms: options.platforms,
    types: options.types,
    forArray: null,
    getProps: options.getProps,
    forDisplay: null,
    layout: true
  });
};
registerLayout({
  component: GridLayout,
  platforms: [DESKTOP, MOBILE],
  types: 'grid'
});
registerLayout({
  component: FormBlock,
  platforms: DESKTOP,
  types: 'block'
});
registerLayout({
  component: Card,
  platforms: [DESKTOP],
  types: ['card']
});
registerLayout({
  component: TextBox,
  platforms: [DESKTOP, MOBILE],
  types: 'text-box'
});