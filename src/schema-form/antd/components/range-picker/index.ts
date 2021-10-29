import {App} from 'vue';
import RangePicker from './range-picker';

RangePicker.install = (app: App) => {
  app.component(RangePicker.name, RangePicker);
};

export default RangePicker;
