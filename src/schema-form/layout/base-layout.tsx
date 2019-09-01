import {SchemaFormStore} from '@/schema-form/internal/utils';
import Vue, {VNode} from 'vue';
import Component from 'vue-class-component';
import {Inject, Prop} from 'vue-property-decorator';

@Component({
  name: 'BaseLayout'
})
export default class BaseLayout extends Vue {
  @Prop({type: Array, required: true})
  public fields: VNode[];
  @Prop()
  public layout: any;
  @Inject('store')
  public store: SchemaFormStore;
}
