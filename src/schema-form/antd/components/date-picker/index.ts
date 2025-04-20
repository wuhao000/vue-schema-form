import {App} from 'vue';
import DatePicker from './date-picker.vue';

DatePicker.install = (app: App) => {
  app.component(DatePicker.name, DatePicker);
};

export default DatePicker;
