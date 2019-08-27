import {FormDescriptor, FormProps, Platform, SchemaFormField, ShowFieldCondition} from '@/types/bean';
import {ValidateRules} from 'async-validator';
import difference from 'lodash.difference';
import eq from 'lodash.eq';
import get from 'lodash.get';
import Vue, {VNode} from 'vue';
import Component from 'vue-class-component';
import {Prop, Watch} from 'vue-property-decorator';
import FormField from './field';
import {
  addRule,
  ASchemaForm,
  DESKTOP,
  getButtonComponent,
  getDefaultValue,
  getFormComponent,
  getRowComponent,
  MOBILE,
  register,
  registerAntd,
  registerAntdMobile,
  registerDisplay,
  registerElement,
  TYPES
} from './utils';

@Component({
  name: ASchemaForm
})
export default class SchemaForm extends Vue {

  public static Field: any;
  public static install: (Vue) => void;
  public static registerAntd = registerAntd;
  public static registerAntdMobile = registerAntdMobile;
  public static registerElement = registerElement;
  public static registerComponent = register;
  public static registerDisplayComponent = registerDisplay;

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
  @Prop({type: Boolean, default: false})
  public inline: boolean;
  @Prop(Object)
  public rules: ValidateRules;
  @Prop()
  public title: VNode | string;
  @Prop({type: Boolean, default: false})
  public disabled: boolean;
  @Prop({type: Boolean, default: false})
  public readonly: boolean;
  @Prop({type: Boolean, default: false})
  public loading: boolean;
  @Prop({type: Number})
  public arrayIndex: number;

  public currentValue: { [key: string]: any } | Array<{ [key: string]: any }> = null;

  @Watch('currentValue', {deep: true})
  public currentValueChanged(currentValue: any) {
    this.$emit('input', currentValue);
    this.$emit('change', currentValue);
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

  @Watch('value', {immediate: true, deep: true})
  public valueChanged(value: any[] | any) {
    if (value !== this.currentValue) {
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
    } else if (!value) {
      this.currentValue = {};
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
      {this.$slots.header}
      {this.definition.array ? this.renderTitle() : null}
      {this.renderFields()}
      {this.renderAddFormButton()}
      {this.renderButtons()}
      {this.$slots.footer}
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
    const ButtonComponent = getButtonComponent();
    if (props && this.mode === 'edit') {
      if (this.$slots.btns) {
        return this.$slots.btns;
      }
      if (this.platform === 'mobile') {
        return <div class="action-btns">
          {this.hasListener('ok') ? <m-white-space/> : null}
          {this.hasListener('ok') ? <m-button type="primary"
                                              disabled={this.disabled}
                                              loading={this.loading}
                                              attrs={props && props.okProps}
                                              onClick={() => {
                                                this.onOk();
                                              }}>
            {props && props.okText || '保存'}
          </m-button> : null}
          {this.hasListener('cancel') ? <m-white-space/> : null}
          {this.hasListener('cancel') ? <m-button
            disabled={this.disabled || this.loading}
            onClick={() => {
              this.$emit('cancel');
            }}
            attrs={props && props.cancelProps}>
            {props && props.cancelText || '取消'}
          </m-button> : null}
          {this.hasListener('reset') ? <m-white-space/> : null}
          {this.hasListener('reset') ? <m-button
            disabled={this.disabled || this.loading}
            type="error"
            onClick={() => {
              this.$emit('reset');
            }}
            attrs={props && props.resetProps}>
            {props && props.resetText || '重置'}
          </m-button> : null}
        </div>;
      } else {
        return <div class="action-btns">
          {this.hasListener('cancel') ? <ButtonComponent disabled={this.disabled || this.loading}
                                                         onClick={() => {
                                                           this.$emit('cancel');
                                                         }}
                                                         class="cancel-btn"
                                                         attrs={props && props.cancelProps}>
            {props && props.cancelText || '取消'}
          </ButtonComponent> : null}
          {this.hasListener('ok') ? <ButtonComponent type="primary"
                                                     disabled={this.disabled}
                                                     loading={this.loading}
                                                     class="confirm-btn"
                                                     attrs={props && props.okProps}
                                                     onClick={() => {
                                                       this.onOk();
                                                     }}>
            {props && props.okText || '保存'}
          </ButtonComponent> : null}
          {this.hasListener('reset') ? <ButtonComponent type="danger"
                                                        class="reset-btn"
                                                        disabled={this.disabled || this.loading}
                                                        attrs={props && props.resetProps}
                                                        onClick={() => {
                                                          this.$emit('reset', this.currentValue);
                                                        }}>
            {props && props.resetText || '重置'}
          </ButtonComponent> : null}
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
    if (this.hasListener('ok')) {
      if (this.form && this.validateRules && this.form.validate) {
        const valid = await this.form.validate();
        if (valid) {
          this.$emit('ok', this.currentValue);
        } else {
          this.$message.error('表单数据有误');
        }
      } else {
        this.$emit('ok', this.currentValue);
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
    if (field.type === TYPES.subForm) {
      if (!field.props) {
        field.props = {props: this.props};
      } else {
        field.props.props = this.props;
      }
      field.props.disabled = this.disabled;
      field.props.readonly = this.readonly;
    }
    const propertyName = field.property.substr(field.property.lastIndexOf('.') + 1);
    // @ts-ignore
    return this.calcShowState(field) ? <FormField
      vModel={value[propertyName]}
      validate={!!(this.props && this.validateRules)}
      display={this.mode === 'display'}
      disabled={this.disabled}
      content={this.$slots[field.slot]}
      definition={field}
      key={'field-' + field.property + '-' + index}
      onChange={(value) => {
        this.onFieldValueChange(value, field);
      }}
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

  get isMobile() {
    return this.platform === MOBILE;
  }

  get isDesktop() {
    return this.platform === DESKTOP;
  }

  get validateRules() {
    if (this.rules) {
      return this.rules;
    }
    const rules = {};
    this.realFields.map(field => {
      if (field.required) {
        addRule(rules, field, {required: true, message: `${field.title}为必填项`});
      }
      if (typeof field.min === 'number') {
        addRule(rules, field, {min: field.min, message: `${field.title}不能小于${field.min}`});
      }
      if (typeof field.max === 'number') {
        addRule(rules, field, {max: field.max, message: `${field.title}不能大于${field.max}`});
      }
    });
    if (Object.keys(rules).length) {
      return rules;
    }
    return null;
  }

  private renderSingleFields(currentValue: { [p: string]: any } | Array<{ [p: string]: any }>) {
    const {props} = this;
    const FormComponent = getFormComponent(this.platform);
    const groups = this.getGroups(currentValue);
    const formProps = this.getFormProps(currentValue);
    return <FormComponent attrs={formProps}
                          ref="form"
                          on={this.$listeners}>
      {this.$slots.prepend}
      {!this.definition.array && this.isDesktop ? this.renderTitle() : null}
      {props && props.inline ? groups.reduce((a, b) => a.concat(b))
        : groups.map((group) => this.wrapGroup(group))}
      {this.renderDeleteSubFormButton(currentValue)}
      {this.$slots.append}
    </FormComponent>;
  }

  private renderAddFormButton() {
    const ButtonComponent = getButtonComponent();
    if (this.definition.array && this.mode === 'edit') {
      return <ButtonComponent
        attrs={{
          block: true,
          icon: 'plus',
          disabled: this.disabled
        }}
        class="m-b"
        onClick={() => {
          this.addSubItem();
        }}>新增一条</ButtonComponent>;
    }
  }

  private addSubItem() {
    this.currentValue.push({});
    this.buildExtraProperties();
  }

  private renderDeleteSubFormButton(value: { [p: string]: any } | Array<{ [p: string]: any }>) {
    const ButtonComponent = getButtonComponent();
    return this.definition.array && this.currentValue.length > 1 && this.mode !== 'display' ?
      <div class="delete-profile-enhan">
        <ButtonComponent disabled={this.disabled} onClick={() => {
          this.currentValue.splice(this.currentValue.indexOf(value), 1);
        }} text icon="delete" type="danger">删除该条
        </ButtonComponent>
      </div> : null;
  }

  private wrapGroup(group: any) {
    const RowComponent = getRowComponent();
    const {props} = this;
    if (this.isMobile || group.length === 1) {
      return group;
    }
    return <RowComponent gutter={props && props.gutter || 0}>{group}</RowComponent>;
  }

  public hasListener(event: string): boolean {
    return !!this.$listeners[event];
  }

  private onFieldValueChange(value: any, field: SchemaFormField) {
    this.$emit('change', this.currentValue);
  }

  private getFormProps(currentValue: { [p: string]: any } | Array<{ [p: string]: any }>) {
    const formProps = Object.assign({}, this.props);
    if (this.isMobile) {
      const title = this.$slots.title || this.title;
      if (this.arrayIndex !== null && this.arrayIndex !== undefined) {
        formProps.title = <div style={{
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <span>{title + ' (' + (this.arrayIndex + 1) + ')'}</span>
          {this.arrayIndex > 0 ? <a style={{color: '#e94721', cursor: 'pointer'}}
                                    onclick={(e) => {
                                      this.$emit('removeArrayItem', this.arrayIndex);
                                    }}>
            <ae-icon type="delete"/>
            删除
          </a> : null}
        </div>;
      } else {
        formProps.title = title;
      }
    }
    formProps.model = currentValue;
    formProps.rules = this.validateRules;
    formProps.inline = this.inline;
    formProps.disabled = this.disabled || this.loading;
    return formProps;
  }
}
