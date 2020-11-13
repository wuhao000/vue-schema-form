import {renderField, SchemaFormStore} from './utils';
import {SchemaFormField} from 'v-schema-form-types';
import Vue from 'vue';
import Component from 'vue-class-component';

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
    return renderField(this.pathPrefix, this.store, field, currentValue, index, wrap, this.$createElement, this);
  }

}
