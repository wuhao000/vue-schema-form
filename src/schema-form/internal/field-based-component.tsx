import {renderField, SchemaFormStore} from '@/schema-form/internal/utils';
import {SchemaFormField} from '@/types/bean';
import Vue from 'vue';
import Component from 'vue-class-component';
import {Inject, Prop} from 'vue-property-decorator';

@Component({
  name: 'FieldBasedComponent'
})
export default class FieldBasedComponent extends Vue {

  @Prop([Array, Object])
  public value: { [key: string]: any } | Array<{ [key: string]: any }>;
  @Prop(Array)
  public pathPrefix: string[];
  public currentValue: { [key: string]: any } | Array<{ [key: string]: any }> = null;
  @Inject()
  public store: SchemaFormStore;

  public renderField(field: SchemaFormField, currentValue: { [p: string]: any } | Array<{ [p: string]: any }>, index: number, wrap: boolean) {
    return renderField(this.pathPrefix, this.store, field, currentValue, index, wrap, this.$createElement);
  }

  get display() {
    return this.store.mode === 'display';
  }

}
