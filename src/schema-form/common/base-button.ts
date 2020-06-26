import {EffectsContext, SchemaFormStore} from 'v-schema-form-types';
import Vue from 'vue';
import Component from 'vue-class-component';
import {Inject, Prop} from 'vue-property-decorator';

@Component({
  name: 'BaseButton'
})
export default class BaseButton extends Vue {
  @Prop()
  public action: (context: EffectsContext, event) => void;
  @Prop({type: [String, Object]})
  public title: string | object;
  @Inject('store')
  public store: SchemaFormStore;


  public onClick(e) {
    if (this.action) {
      this.action(this.store.context, e);
    }
  }
}
