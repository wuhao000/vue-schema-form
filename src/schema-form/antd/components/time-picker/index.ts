import {App} from 'vue';
import TimePicker from './time-picker';
import TimeRangePicker from './time-range-picker';

TimePicker.RangePicker = TimeRangePicker;
TimePicker.install = (app: App) => {
  app.component(TimePicker.name, TimePicker);
  app.component(TimeRangePicker.name, TimeRangePicker);
};

export default TimePicker;
