import Card from '@/schema-form/layout/card';
import FormBlock from '@/schema-form/layout/form-block';
import GridLayout from '@/schema-form/layout/grid';
import TextBox from '@/schema-form/layout/text-box';
import {addComponent} from '@/schema-form/utils/register';
import {DESKTOP, MOBILE} from '@/schema-form/utils/utils';
import {IField, Platform} from 'v-schema-form-types';

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
