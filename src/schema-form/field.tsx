import {Platform, SchemaFormField} from '@/types/bean';
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop, Watch} from 'vue-property-decorator';
import {
  DESKTOP,
  getAlertComponent,
  getColComponent,
  getComponent,
  getDisplayComponent,
  getFormComponent,
  getOptions,
  SchemaFormComponent,
  TYPES
} from './utils';

@Component({
  name: 'FormField'
})
export default class FormField extends Vue {

  @Prop(Object)
  public definition: SchemaFormField;
  @Prop(Object)
  public formValue: { [key: string]: any };
  @Prop({type: Boolean, default: false})
  public display: boolean;
  @Prop({type: String, default: 'mobile'})
  public platform: Platform;
  @Prop({type: Boolean, default: false})
  public validate: boolean;
  @Prop()
  public value: any;
  public currentValue: any = null;
  @Prop()
  private content: any;

  get componentType(): SchemaFormComponent {
    let component: SchemaFormComponent = null;
    if (this.display) {
      component = getDisplayComponent(this.platform, this.definition);
    } else {
      component = getComponent(this.platform, this.definition);
    }
    if (component.component === 'empty') {
      console.warn(`类型${this.definition.type}${this.definition.array ? '（数组）' : ''}没有对应的${this.display ? '展示' : '编辑'}组件`);
    }
    return component;
  }

  get options() {
    return getOptions(this.definition);
  }

  get props() {
    const {definition} = this;
    const props: any = Object.assign({}, this.componentType.getProps(definition));
    const type = definition.type;
    if (type === TYPES.select || type === TYPES.expandSelect) {
      props.options = this.options;
    }
    if (type === TYPES.subForm) {
      props.platform = this.platform;
      props.mode = this.display ? 'display' : 'edit';
    }
    if (definition.placeholder) {
      props.placeholder = definition.placeholder;
    }
    if (this.display) {
      delete props.required;
    }
    return props;
  }

  @Watch('currentValue')
  public currentValueChanged(currentValue: any) {
    this.$emit('input', currentValue);
  }

  @Watch('value', {immediate: true})
  public valueChanged(value: any) {
    if (this.currentValue !== value) {
      this.currentValue = value;
    }
  }

  public render() {
    const {props, currentValue, definition, platform} = this;
    const InputFieldDefinition = this.componentType.component;
    if (this.display) {
      props.definition = this.definition;
    }
    // @ts-ignore
    const component = this.content ? this.content : <InputFieldDefinition
      attrs={props}
      value={currentValue}
      title={this.platform === 'mobile' ? definition.title : null}
      onInput={this.onInput}/>;
    let item = null;
    const FormItemComponent = getFormComponent(this.platform) + '-item';
    const ColComponent = getColComponent();
    if (platform === DESKTOP) {
      const formItem = this.definition.type === TYPES.subForm ? component :
        <FormItemComponent attrs={this.getFormItemProps()}>
          {component}
          {this.renderNotice()}
        </FormItemComponent>;
      if (definition.span) {
        item = <ColComponent span={definition.span}>{formItem}</ColComponent>;
      } else if (definition.type === 'Extra') {
        item = component;
      } else {
        item = formItem;
      }
    } else {
      if (this.display) {
        if (this.definition.type === TYPES.subForm) {
          item = component;
        } else {
          item = <m-list-item title={definition.title} extra={component}/>;
        }
      } else {
        item = component;
      }
    }
    return item;
  }

  public onInput(value) {
    this.$emit('input', value);
    this.$emit('change', value);
    this.$forceUpdate();
  }

  private renderNotice() {
    const AlertComponent = getAlertComponent();
    if (this.definition.notice) {
      return <AlertComponent message={this.definition.notice}/>;
    }
  }

  public getFormItemProps() {
    const {definition} = this;
    return {
      required: this.display ? null : definition.required,
      prop: this.validate ? definition.property : null,
      title: definition.title,
      label: definition.title
    };
  }
}
