import {clone, isEqual} from '../../uform/utils';
import {SchemaFormField} from '../../../types';
import Component, {mixins} from 'vue-class-component';

import {Prop, Watch} from 'vue-property-decorator';
import {DESKTOP, getButtonComponent, getFormComponent, getRowComponent, MOBILE} from '../utils/utils';
import FieldBasedComponent from './field-based-component';
import {getComponentType, getRealFields} from './utils';

@Component({
  inheritAttrs: false,
  name: 'InternalForm'
})
class InternalForm extends mixins(FieldBasedComponent) {
  @Prop([Object, String])
  public title: any;
  @Prop([Number])
  public arrayIndex: any;
  @Prop([Array])
  public pathPrefix: any;
  @Prop({type: Object, required: true})
  public definition: SchemaFormField;
  @Prop(Array)
  public schemaPath: string[];
  @Prop({type: Boolean, default: false})
  public inline: boolean;
  @Prop([String, Object])
  public layoutType: string | any;
  @Prop(Object)
  public layoutProps: object;

  get form(): any {
    return this.$refs.form;
  }

  get isMobile() {
    return this.store.platform === MOBILE;
  }

  get isDesktop() {
    return this.store.platform === DESKTOP;
  }

  get isFormDisabled() {
    return this.isDisabled || this.isLoading;
  }

  get isDisabled() {
    return this.store.disabled;
  }

  get isLoading() {
    return this.store.loading;
  }

  get isReadonly() {
    return this.store.readonly;
  }

  @Watch('currentValue', {deep: true})
  public currentValueChanged(currentValue: any, old) {
    this.$emit('input', currentValue);
    this.$emit('change', currentValue);
  }

  @Watch('value', {
    immediate: true,
    deep: true
  })
  public valueChanged(this: any, value: any[] | any) {
    if (!isEqual(value, this.currentValue)) {
      if (this.definition.array) {
        this.currentValue = clone(value) || [];
      } else {
        this.currentValue = clone(value) || {};
      }
    } else if (!value) {
      this.currentValue = {};
    }
  }

  public created(this: any) {
    if (this.value) {
      if (this.definition.array) {
        if (this.value.length) {
          this.currentValue = clone(this.value);
        } else {
          this.currentValue = [{}];
        }
      } else {
        this.currentValue = clone(this.value);
      }
    } else {
      this.currentValue = this.definition.array ? [{}] : {};
    }
  }

  public renderTitle(this: any) {
    if (this.$slots.title) {
      return this.$slots.title;
    } else if (this.store.props && this.title) {
      return <h2 class="form-title">{this.title}</h2>;
    }
  }

  public getGroups(this: any, currentValue: { [p: string]: any } | Array<{ [p: string]: any }>) {
    if (!this.definition.fields) {
      return [];
    }
    const groups = [];
    const spanGroups = [];
    let lastHasSpan = false;
    getRealFields(this.definition.fields).forEach((field, index) => {
      const vnode = this.renderField(field, currentValue, index, true);
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

  public renderSingleFields(this: any, currentValue: { [p: string]: any } | Array<{ [p: string]: any }>) {
    const FormComponent = getFormComponent(this.store.platform);
    const groups = this.getGroups(currentValue);
    const formProps = this.getFormProps();
    const form = <FormComponent attrs={formProps}
                                ref="form"
                                nativeOn={{
                                  submit: (e) => {
                                    e.preventDefault();
                                  }
                                }}
                                on={this.$listeners}>
      {this.definition.array ? this.renderTitle() : null}
      {!this.definition.array && this.isDesktop ? this.renderTitle() : null}
      {this.inline ? groups.reduce((a, b) => a.concat(b))
        : groups.map((group) => this.wrapGroup(group))}
    </FormComponent>;
    if (this.layoutType) {
      // @ts-ignore
      const LayoutComponentDef = getComponentType(this.store, {
        type: this.layoutType,
        props: this.layoutProps
      });
      // @ts-ignore
      return <LayoutComponentDef.component props={
        this.layoutProps
      }>
        {form}
      </LayoutComponentDef.component>;
    }
    return form;
  }

  public renderAddFormButton() {
    const ButtonComponent = getButtonComponent();
    if (this.definition.array && this.store.editable) {
      return <ButtonComponent
        attrs={{
          block: true,
          icon: 'plus',
          disabled: this.isDisabled
        }}
        class="m-b"
        onClick={() => {
          this.addSubItem();
        }}>新增一条</ButtonComponent>;
    }
  }

  public addSubItem(this: any) {
    this.currentValue.push({});
  }

  public wrapGroup(this: any, group: any) {
    const RowComponent = getRowComponent();
    const {props} = this.store;
    if (this.isMobile || group.length === 1) {
      return group;
    }
    return <RowComponent gutter={props && props.gutter || 0}>{group}</RowComponent>;
  }

  public getFormProps() {
    const formProps: any = Object.assign({
      labelWidth: this.$attrs.labelWidth,
      labelCol: this.$attrs.labelCol,
      wrapperCol: this.$attrs.wrapperCol
    }, this.store.props, this.$attrs);
    if (this.isMobile) {
      formProps.title = this.$slots.title || this.title;
    }
    formProps.inline = this.inline;
    formProps.disabled = this.isFormDisabled;
    return formProps;
  }

  public render() {
    return <div>
      {this.renderSingleFields(this.currentValue)}
      {this.renderAddFormButton()}
    </div>;
  }
}

export default InternalForm as any;
