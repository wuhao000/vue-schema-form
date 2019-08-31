import FormField from '@/schema-form/field';
import {TYPES} from '@/schema-form/utils';
import {getFieldValue, setFieldValue} from '@/schema-form/utils/field';
import {FormProps, SchemaFormField, ShowFieldCondition} from '@/types/bean';
import {Effects} from '@/types/form';
import {IField} from '@/uform/types';
import {parseDestructPath} from '@/uform/utils';
import Vue from 'vue';
import Component from 'vue-class-component';
import {Inject, Prop} from 'vue-property-decorator';

@Component({
  name: 'FieldBasedComponent'
})
export default class FieldBasedComponent extends Vue {

  @Inject()
  public store: {
    effects: Effects;
    props: FormProps;
    disabled: boolean;
    platform: 'mobile' | 'desktop'
    mode: 'edit' | 'display';
    readonly: boolean;
    loading: boolean;
  };
  @Prop(Array)
  public pathPrefix: string[];

  private renderField(field: SchemaFormField, currentValue: { [p: string]: any } | Array<{ [p: string]: any }>, index: number) {
    const {platform} = this.store;
    let value = null;
    if (field.property.includes('.')) {
      value = getPropertyValueByPath(field.property.substr(0, field.property.lastIndexOf('.')), currentValue);
    } else {
      value = currentValue;
    }
    if (field.type === TYPES.object) {
      if (!field.props) {
        field.props = {props: this.store.props};
      } else {
        field.props.props = Object.assign({}, this.store.props, field.prrops.props);
      }
      field.props.effects = this.store.effects;
    }
    const iField = this.createField(field);
    // @ts-ignore
    return <FormField
        value={getFieldValue(value, iField)}
        onInput={(v) => {
          setFieldValue(value, iField, v);
        }}
        field={iField}
        path={this.buildFieldPath(field)}
        display={this.store.mode === 'display'}
        disabled={this.store.disabled}
        content={this.$slots[field.slot]}
        definition={field}
        key={'field-' + field.property + '-' + index}
        onChange={(value) => {
          this.onFieldChange(iField, value);
        }}
        formValue={currentValue}
        platform={platform}/>;
  }



  public createField(definition: SchemaFormField): IField {
    return {
      array: definition.array,
      type: definition.type,
      processor: definition.processor,
      display: this.store.mode === 'display',
      editable: !this.store.disabled && !this.store.readonly,
      name: definition.property,
      path: this.buildArrayPath(definition),
      plainPath: this.buildFieldPath(definition).join('.'),
      destructPath: parseDestructPath(definition.property),
      props: definition.props,
      visible: this.calcShowState(definition),
      required: definition.required,
      effectErrors: [],
      errors: [],
      hiddenFromParent: false,
      initialValue: null,
      initialize: () => {
      },
      invalid: false,
      value: null
    };
  }


  private buildFieldPath(field: SchemaFormField): string[] {
    if (this.pathPrefix) {
      return this.pathPrefix.concat(field.property);
    } else {
      return [field.property];
    }
  }

  private onFieldChange(iField: IField<any>, v: any) {
    if (this.store.effects && this.store.effects.onFieldChange) {
      this.store.effects.onFieldChange(iField, v, this.context);
    }
  }

  public calcShowState(definition: SchemaFormField) {
    if (!definition.depends) {
      return true;
    } else {
      if (typeof definition.depends === 'function') {
        return definition.depends(this.currentValue);
      } else {
        return !definition.depends
            .map(condition => this.matchCondition(condition))
            .some(it => !it);
      }
    }
  }


  private matchCondition(condition: ShowFieldCondition): boolean {
    if (!this.currentValue) {
      return false;
    } else {
      const currentValue = this.currentValue[condition.property];
      const compareValue = condition.value;
      if (currentValue === null || currentValue === undefined) {
        switch (condition.operator) {
          case 'in':
            return compareValue.includes(currentValue);
          case 'notIn':
            return !compareValue.includes(currentValue);
        }
        return false;
      } else {
        switch (condition.operator) {
          case '=':
            return compareValue.toString() === currentValue.toString();
          case '<':
            return parseFloat(currentValue) < parseFloat(compareValue);
          case '>':
            return parseFloat(currentValue) > parseFloat(compareValue);
          case '>=':
            return parseFloat(currentValue) >= parseFloat(compareValue);
          case '<=':
            return parseFloat(currentValue) <= parseFloat(compareValue);
          case 'in':
            return compareValue.includes(currentValue);
          case 'notIn':
            return !compareValue.includes(currentValue);
        }
      }
    }
    return true;
  }
}
