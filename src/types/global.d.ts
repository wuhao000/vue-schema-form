import _ from 'lodash';

declare global {
  export interface Window {
    Vue: any;
    _: typeof _;
  }
  const moment: any;
}
