import {App} from 'vue';
import Button from './button';

Button.install = (app: App) => {
  app.component(Button.name, Button);
};

export default Button;
