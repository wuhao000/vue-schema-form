import _ from 'lodash';

declare global {
  export interface Window {
    Vue: any;
    _: typeof _;
    moment: any;
  }

  export const aegis: any;

  export const antdm: any;

  export const ELEMENT: any;
}
