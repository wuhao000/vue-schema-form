import _ from 'lodash';

declare global {
  export interface Window {
    Vue: any;
    _: typeof _;
    moment: any;
    aegis: any;
    antd: any;
  }

  export const antdm: any;

  export const vant: any;

  export const ELEMENT: any;

}
