import {EffectsContext} from 'v-schema-form-types';
import Vue from 'vue';
import Component from 'vue-class-component';
import {SchemaFormStore} from '../internal/utils';

@Component({
  name: 'AntdButton'
})
export default class AntdButton extends Vue {
  @Prop()
  public action: (context: EffectsContext, event) => any;
  @Prop()
  public title: string;
  @Inject('store')
  public store: SchemaFormStore;

  public onClick(e) {
    if (this.action) {
      this.action(this.store.context, e);
    }
  }

  public render() {
    return <el-button props={this.$attrs}
                      onClick={this.onClick}>{this.title}</el-button>;
  }
}
