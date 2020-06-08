import {VNode} from 'vue';
import {Options, Vue} from 'vue-class-component';
import {Inject, Prop} from 'vue-property-decorator';
import {SchemaFormStore} from '../internal/utils';

@Options({
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
