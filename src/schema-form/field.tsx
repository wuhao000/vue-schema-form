import {Platform, SchemaFormField} from '@/types/bean';
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop, Watch} from 'vue-property-decorator';
import {
  getColComponent,
  getComponent,
  getDisplayComponent,
  getFormComponent,
  getOptions,
  SchemaFormComponent
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
  public currentValue: any;
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
    const props: any = this.componentType.getProps(definition);
    const type = definition.type;
    if (type === 'Select') {
      props.options = this.options;
    }
    return props;
  }

  @Watch('currentValue')
  public currentValueChanged(currentValue: any) {
    this.$emit('input', currentValue);
  }

  @Watch('value', {immediate: true})
  public valueChanged(value: any) {
    if (this.currentValue !== this.value) {
      this.currentValue = this.value;
    }
  }

  public render() {
    const {props, currentValue, definition, platform} = this;
    const InputFieldDefinition = this.componentType.component;
    const componentAttrs = Object.assign({}, props);
    if (this.display) {
      componentAttrs.definition = this.definition;
    }
    // @ts-ignore
    const component = this.content ? this.content : <InputFieldDefinition
      attrs={componentAttrs}
      value={currentValue}
      title={this.platform === 'mobile' ? definition.title : null}
      onInput={this.onInput}/>;
    let item = null;
    const FormItemComponent = getFormComponent(this.platform) + '-item';
    const ColComponent = getColComponent();
    if (platform === 'desktop') {
      const formItem = this.definition.type === 'SubForm' ? component :
        <FormItemComponent required={definition.required}
                           prop={this.validate ? definition.property : null}
                           title={definition.title}
                           label={definition.title}>
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
        item = <m-list-item title={definition.title} extra={component}/>;
      } else {
        item = component;
      }
    }
    return item;
  }

  public onInput(value) {
    this.$emit('input', value);
    this.$forceUpdate();
  }

  private renderNotice() {
    if (this.definition.notice) {
      return <a-alert message={this.definition.notice}/>;
    }
  }
}
