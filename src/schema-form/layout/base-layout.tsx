import {SchemaFormStore} from '../internal/utils';
import Vue, {VNode} from 'vue';
import Component from 'vue-class-component';

@Component({
  name: 'BaseLayout'
})
export default class BaseLayout extends Vue {
  @Prop({type: Array})
  public fields: VNode[];
  @Prop()
  public layout: any;
  @Inject('store')
  public store: SchemaFormStore;
}
