import {App} from 'vue';
import Button from './button.vue';

Button.install = (app: App) => {
  app.component(Button.name, Button);
};

export default Button;
