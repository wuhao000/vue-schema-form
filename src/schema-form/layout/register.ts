import Fieldset from './fieldset';
import {IField, Platform} from '../../../types';
import {addComponent} from '../utils/register';
import {DESKTOP, MOBILE} from '../utils/utils';
import Card from './card';
import FormBlock from './form-block';
import GridLayout from './grid';
import TextBox from './text-box';

/**
 *
 * @param options
 */
export const registerLayout = (options: {
  component: string | object,
  platforms: Platform | Platform[],
  types: string | string[],
  getProps?: ((definition: IField, platform: Platform) => object)
}) => {
  addComponent({
    component: options.component, platforms: options.platforms,
    types: options.types, forArray: null, getProps: options.getProps,
    forDisplay: null, layout: true
  });
};

registerLayout({
  component: Fieldset, platforms: DESKTOP, types: 'fieldset'
});

registerLayout({
  component: GridLayout, platforms: [DESKTOP, MOBILE], types: 'grid'
});
registerLayout({
  component: FormBlock, platforms: DESKTOP, types: 'block'
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
