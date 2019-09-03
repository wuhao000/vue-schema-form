import FieldBasedComponent from '@/schema-form/internal/field-based-component';
import {createField, getComponentType, getRealFields} from '@/schema-form/internal/utils';
import {
  DESKTOP,
  getButtonComponent,
  getDefaultValue,
  getFormComponent,
  getRowComponent,
  MOBILE
} from '@/schema-form/utils/utils';
import {SchemaFormField} from '@/types/bean';
import difference from 'lodash.difference';
import eq from 'lodash.eq';
import Component, {mixins} from 'vue-class-component';

import {Prop, Watch} from 'vue-property-decorator';

@Component({
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
  @Prop({})
  public props: any;
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

  get isMobile(this: any) {
    return this.store.platform === MOBILE;
  }

  get isDesktop(this: any) {
    return this.store.platform === DESKTOP;
  }

  get isFormDisabled() {
    return this.isDisabled || this.isLoading;
  }

  get isDisabled() {
    return this['store'].disabled;
  }

  get isLoading() {
    return this['store'].loading;
  }

  get isReadonly() {
    return this['store'].readonly;
  }

  @Watch('currentValue')
  public currentValueChanged(currentValue: any, old: any) {
    this.$emit('input', currentValue);
    this.$emit('change', currentValue);
  }

  @Watch('definition')
  public definitionChanged(this: any) {
    const currentValue = this.currentValue;
    const value = this.value;
    if (this.definition.array) {
      if (difference(currentValue as any[], value as any[])
        .concat(difference(value as any[], currentValue as any[])).length > 0) {
      }
    }
  }

  @Watch('value', {
    immediate: true,
    deep: true
  })
  public valueChanged(this: any, value: any[] | any) {
    if (value !== this.currentValue) {
      const currentValue = this.currentValue;
      if (this.definition.array) {
        if (difference(currentValue as any[], value as any[])
          .concat(difference(value as any[], currentValue as any[])).length > 0) {
          this.currentValue = value || [];
        }
      } else if (!eq(currentValue, value)) {
        this.currentValue = value || {};
      }
    } else if (!value) {
      this.currentValue = {};
    }
  }

  public created(this: any) {
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
  }

  public setDefaultValue(this: any, property, tmpValue, fieldDef) {
    let copy = tmpValue;
    const splits = property.split('.');
    splits.forEach((name, index) => {
      if (index < splits.length - 1) {
        if (!copy[name]) {
          this.$set(copy, name, {});
        }
        copy = copy[name];
      } else {
        copy[name] = getDefaultValue(createField(
          this.currentValue, this.store,
          this.pathPrefix, fieldDef));
      }
    });
  }

  public renderTitle(this: any) {
    if (this.$slots.title) {
      return this.$slots.title;
    } else if (this.store.props && this.title) {
      return <h2 class="form-title">{this.title}</h2>;
    }
  }

  public getGroups(this: any, currentValue: { [p: string]: any } | Array<{ [p: string]: any }>) {
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
                                on={this.$listeners}>
      {this.definition.array ? this.renderTitle() : null}
      {!this.definition.array && this.isDesktop ? this.renderTitle() : null}
      {this.inline ? groups.reduce((a, b) => a.concat(b))
        : groups.map((group) => this.wrapGroup(group))}
    </FormComponent>;
    if (this.layoutType) {
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

  public renderAddFormButton(this: any) {
    const ButtonComponent = getButtonComponent();
    if (this.definition.array && this.store.mode === 'edit') {
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

  public getFormProps(this: any) {
    const formProps = Object.assign({}, this.store.props, this.props);
    if (this.isMobile) {
      const title = this.$slots.title || this.title;
      if (this.arrayIndex !== null && this.arrayIndex !== undefined) {
        formProps.title = <div style={{
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <span>{title + ' (' + (this.arrayIndex + 1) + ')'}</span>
          {this.arrayIndex > 0 ? <a style={{color: '#e94721', cursor: 'pointer'}}
                                    onclick={() => {
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
