import {SchemaFormStore} from 'v-schema-form-types';
import Vue, {VNode} from 'vue';
import Component from 'vue-class-component';
import {Inject, Prop} from 'vue-property-decorator';

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
