import {FormDescriptor, FormProps, Platform, SchemaFormField, ShowFieldCondition} from '@/types/bean';
import difference from 'lodash.difference';
import eq from 'lodash.eq';
import get from 'lodash.get';
import Vue, {VNode} from 'vue';
import Component from 'vue-class-component';
import {Prop, Watch} from 'vue-property-decorator';
import FormField from './field';
import {
  ASchemaForm,
  getDefaultValue,
  getFormComponent,
  getRowComponent,
  register,
  registerAntd,
  registerAntdMobile,
  registerDisplay,
  registerElement
} from './utils';

@Component({
  name: ASchemaForm
})
export default class SchemaForm extends Vue {

  @Prop(Object)
  public definition: FormDescriptor;
  @Prop({type: String, default: 'desktop'})
  public platform: Platform;
  @Prop({type: Object, default: () => ({})})
  public props: FormProps;
  @Prop([Array, Object])
  public value: { [key: string]: any } | Array<{ [key: string]: any }>;
  @Prop({type: String, default: 'edit'})
  public mode: 'edit' | 'display';
  public currentValue: { [key: string]: any } | Array<{ [key: string]: any }> = null;
  public static Field: any;
  public static install: (Vue) => void;
  public static registerAntd = registerAntd;
  public static registerAntdMobile = registerAntdMobile;
  public static registerElement = registerElement;
  public static registerComponent = register;
  public static registerDisplayComponent = registerDisplay;
  @Prop()
  public title: VNode | string;


  @Watch('currentValue', {deep: true})
  public currentValueChanged(currentValue: any) {
    this.$emit('input', currentValue);
  }

  @Watch('definitions')
  public definitionsChanged() {
    const currentValue = this.currentValue;
    const value = this.value;
    if (this.definition.array) {
      if (difference(currentValue as any[], value as any[])
        .concat(difference(value as any[], currentValue as any[])).length > 0) {
        this.buildExtraProperties();
      }
    } else if (!eq(currentValue, value)) {
      this.buildExtraProperties();
    }
  }

  @Watch('platform')
  public platformChanged() {
    this.$forceUpdate();
  }

  @Watch('definition.mode')
  public modeChanged() {
    this.$forceUpdate();
  }

  @Watch('value', {immediate: true})
  public valueChanged(value: any[] | any) {
    const currentValue = this.currentValue;
    if (this.definition.array) {
      if (difference(currentValue as any[], value as any[])
        .concat(difference(value as any[], currentValue as any[])).length > 0) {
        this.currentValue = value || [];
        this.buildExtraProperties();
      }
    } else if (!eq(currentValue, value)) {
      this.currentValue = value || {};
      this.buildExtraProperties();
    }
  }

  public created() {
    if (this.value) {
      if (this.definition.array) {
        if (this.value.length) {
          this.currentValue = this.value;
        } else {
          this.currentValue = [{}];
        }
      } else {
        this.currentValue = this.value;
      }
    } else {
      this.currentValue = this.definition.array ? [{}] : {};
    }
    this.buildExtraProperties();
  }

  get realFields() {
    return this.definition.fields.filter(it => it !== null && it !== undefined);
  }

  public setDefaultValue(property, tmpValue, field) {
    let copy = tmpValue;
    const splits = property.split('.');
    splits.forEach((name, index) => {
      if (index < splits.length - 1) {
        if (!copy[name]) {
          this.$set(copy, name, {});
        }
        copy = copy[name];
      } else {
        copy[name] = getDefaultValue(field);
      }
    });
  }

  public buildExtraProperties() {
    const {value, currentValue} = this;
    this.realFields.forEach(field => {
      const property = field.property;
      if (this.definition.array) {
        currentValue.forEach(tmpValue => {
          if (property.includes('.')) {
            this.setDefaultValue(property, tmpValue, field);
          } else {
            if (!tmpValue || tmpValue[property] === undefined) {
              this.$set(tmpValue, property, getDefaultValue(field));
            } else if (value && value.length) {
              this.$set(tmpValue, property, value[0][field.property]);
            }
          }
        });
      } else {
        const tmpValue = currentValue;
        if (property.includes('.')) {
          this.setDefaultValue(property, tmpValue, field);
        } else {
          if (!tmpValue || tmpValue[property] === undefined) {
            this.$set(tmpValue, property, getDefaultValue(field));
          } else if (value) {
            this.$set(tmpValue, property, value[field.property]);
          }
        }
      }
    });
  }

  public render() {
    return <div class="schema-form">
      {this.definition.array ? this.renderTitle() : null}
      {this.renderFields()}
      {this.renderAddFormButton()}
      {this.renderButtons()}
    </div>;
  }

  get form(): any {
    return this.$refs.form;
  }

  private static getPropertyValueByPath(property: string, currentValue: { [p: string]: any } | Array<{ [p: string]: any }>) {
    return get(currentValue, property);
  }

  private renderButtons() {
    const {props} = this;
    if (props && this.mode === 'edit') {
      if (this.platform === 'mobile') {
        return <div class="action-buttons">
          {props.onOk ? <m-white-space/> : null}
          {props.onOk ? <m-button type="primary"
                                  attrs={props && props.okProps}
                                  onClick={props && props.onOk}>
            {props && props.okText || '保存'}
          </m-button> : null}
          {props.onCancel ? <m-white-space/> : null}
          {props.onCancel ? <m-button onClick={props && props.onCancel}
                                      attrs={props && props.cancelProps}>
            {props && props.cancelText || '取消'}
          </m-button> : null}
        </div>;
      } else {
        return <div class="action-buttons">
          {props.onCancel ? <d-button onClick={props && props.onCancel}
                                      class="cancel-button"
                                      attrs={props && props.cancelProps}>
            {props && props.cancelText || '取消'}
          </d-button> : null}
          {props.onOk ? <d-button type="primary"
                                  class="confirm-button"
                                  attrs={props && props.okProps}
                                  onClick={this.onOk}>
            {props && props.okText || '保存'}
          </d-button> : null}
        </div>;
      }
    }
  }

  private renderTitle() {
    if (this.$slots.title) {
      return this.$slots.title;
    } else if (this.props && this.title) {
      return <h2 class="form-title">{this.title}</h2>;
    }
  }

  private async onOk(this: any) {
    const {props} = this;
    if (props && props.onOk) {
      if (this.form && props.rules && this.form.validate) {
        const valid = await this.form.validate();
        if (valid) {
          props.onOk();
        } else {
          this.$message.error('表单数据有误');
        }
      } else {
        props.onOk();
      }
    }
  }

  private getGroups(currentValue: { [p: string]: any } | Array<{ [p: string]: any }>) {
    const groups = [];
    const spanGroups = [];
    let lastHasSpan = false;
    this.realFields.forEach((field, index) => {
      const vnode = this.renderField(field, currentValue, index);
      if (field.span) {
        if (lastHasSpan) {
          spanGroups[spanGroups.length - 1].push(field.span);
          groups[groups.length - 1].push(vnode);
        } else {
          spanGroups.push([field.span]);
          groups.push([vnode]);
        }
        lastHasSpan = true;
      } else {
        lastHasSpan = false;
        spanGroups.push([]);
        groups.push([vnode]);
      }
    });
    return groups;
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

  private renderField(field: SchemaFormField, currentValue: { [p: string]: any } | Array<{ [p: string]: any }>, index: number) {
    const {platform} = this;
    let value = null;
    if (field.property.includes('.')) {
      value = SchemaForm.getPropertyValueByPath(field.property.substr(0, field.property.lastIndexOf('.')), currentValue);
    } else {
      value = currentValue;
    }
    const propertyName = field.property.substr(field.property.lastIndexOf('.') + 1);
    // @ts-ignore
    return this.calcShowState(field) ? <FormField vModel={value[propertyName]}
                                                  validate={!!(this.props && this.props.rules)}
                                                  display={this.mode === 'display'}
                                                  content={this.$slots[field.slot]}
                                                  definition={field}
                                                  key={'field-' + field.property + '-' + index}
                                                  formValue={currentValue}
                                                  platform={platform}/> : null;
  }

  private renderFields() {
    if (this.definition.array) {
      return this.currentValue.map(currentValue => {
        return this.renderSingleFields(currentValue);
      });
    } else {
      return this.renderSingleFields(this.currentValue);
    }
  }

  private renderSingleFields(currentValue: { [p: string]: any } | Array<{ [p: string]: any }>) {
    const RowComponent = getRowComponent();
    const {props} = this;
    const formEvents: any = {};
    if (props) {
      if (props.onOk) {
        formEvents.ok = props.onOk;
      }
      if (props.onCancel) {
        formEvents.cancel = props.onCancel;
      }
    }
    const FormComponent = getFormComponent(this.platform);
    const groups = this.getGroups(currentValue);
    return <FormComponent attrs={Object.assign({}, props)}
                          title={this.platform === 'mobile' ? (this.$slots.title || this.title) : null}
                          ref="form"
                          on={formEvents}>
      {
        !this.definition.array && this.platform === 'desktop' ? this.renderTitle() : null
      }
      {
        props && props.inline ? groups.reduce((a, b) => a.concat(b))
          : groups.map((group) => <RowComponent gutter={props && props.gutter || 0}>{group}</RowComponent>)
      }
      {this.renderDeleteSubFormButton(currentValue)}
    </FormComponent>;
  }

  private renderAddFormButton() {
    if (this.definition.array && this.mode === 'edit') {
      return <d-button block icon="plus"
                       class="m-b"
                       onClick={() => {
                         this.addSubItem();
                       }}>新增一条</d-button>;
    }
  }

  private addSubItem() {
    this.currentValue.push({});
    this.buildExtraProperties();
  }

  private renderDeleteSubFormButton(value: { [p: string]: any } | Array<{ [p: string]: any }>) {
    return this.definition.array && this.currentValue.length > 1 ? <div class="delete-profile-enhan">
      <d-button onClick={() => {
        this.currentValue.splice(this.currentValue.indexOf(value), 1);
      }} text icon="delete" type="danger">删除该条
      </d-button>
    </div> : null;
  }
}
