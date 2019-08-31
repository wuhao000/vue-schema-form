import BaseForm from '@/schema-form/internal/base-form';
import Component, {mixins} from 'vue-class-component';
import {Inject} from 'vue-property-decorator';

@Component({
  name: 'InternalForm'
})
export default class InternalForm extends mixins(BaseForm) {


}
