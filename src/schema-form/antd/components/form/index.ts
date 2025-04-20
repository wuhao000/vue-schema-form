import {App} from 'vue';
import Form from './form.vue';
import Item from './item.vue';

Form.Item = Item;

Form.install = (app: App) => {
  app.component(Form.name, Form);
  app.component(Item.name, Item);
};

export default Form;
