import {registerLayout} from '../utils/register';
import {DESKTOP, MOBILE} from '../utils/utils';
import Card from './card';
import FormBlock from './form-block';
import GridLayout from './grid';
import TextBox from './text-box';

export const registerCommonLayout = () => {
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
};
