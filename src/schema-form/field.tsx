import {Platform, SchemaFormField, ShowFieldCondition} from '@/types/bean';
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
  public shouldShowField = true;
  @Prop()
  private content: any;

  get componentType(): SchemaFormComponent {
    if (this.display) {
      return getDisplayComponent(this.platform, this.definition);
    }
    return getComponent(this.platform, this.definition);
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

  @Watch('formValue', {deep: true, immediate: true})
  public modelChanged() {
    this.calcShowState();
  }

  @Watch('value')
  public valueChanged(value: any) {
    if (this.currentValue !== this.value) {
      this.onInput(value);
    }
  }

  public created() {
    const value = this.value;
    if (this.definition.type === 'Integer') {
      if (value !== null && value !== undefined) {
        if (this.definition.array) {
          this.onInput(value.map(v => parseInt(v)));
        } else {
          this.onInput(parseInt(value));
        }
      }
    } else if (this.definition.type === 'Double') {
      if (value !== null && value !== undefined) {
        if (this.definition.array) {
          this.onInput(value.map(v => parseFloat(v)));
        } else {
          this.onInput(parseFloat(value));
        }
      }
    } else {
      this.onInput(value);
    }
  }

  public calcShowState() {
    const {definition} = this;
    if (!definition.depends) {
      this.shouldShowField = true;
    } else {
      if (typeof definition.depends === 'function') {
        this.shouldShowField = definition.depends(this.formValue);
      } else {
        this.shouldShowField = !definition.depends
          .map(condition => this.matchCondition(condition))
          .some(it => !it);
      }
    }
  }

  private matchCondition(condition: ShowFieldCondition): boolean {
    if (!this.formValue) {
      return false;
    } else {
      const currentValue = this.formValue[condition.property];
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

  public render() {
    const {shouldShowField, props, currentValue, definition, platform} = this;
    const InputFieldDefinition = this.componentType.component;
    // @ts-ignore
    const component = this.content ? this.content : <InputFieldDefinition attrs={props}
                                                                          value={currentValue}
                                                                          title={this.platform === 'mobile' ? definition.title : null}
                                                                          onInput={this.onInput}/>;

    let item = null;
    const FormItemComponent = getFormComponent(this.platform) + '-item';
    const ColComponent = getColComponent();
    if (platform === 'desktop') {
      const formItem = <FormItemComponent required={definition.required}
                                          prop={this.validate ? definition.property : null}
                                          label={definition.title}>
        {component}
        {this.renderNotice()}
      </FormItemComponent>;
      if (definition.span) {
        item = shouldShowField ? <ColComponent span={definition.span}>{formItem}</ColComponent> : null;
      } else if (definition.type === 'Extra') {
        item = shouldShowField ? component : null;
      } else {
        item = shouldShowField ? formItem : null;
      }
    } else {
      item = shouldShowField ? component : null;
    }
    return item;
  }

  public onInput(value) {
    this.currentValue = value;
    this.$emit('input', value);
    this.$forceUpdate();
  }

  private renderNotice() {
    if (this.definition.notice) {
      return <a-alert message={this.definition.notice}/>;
    }
  }
}
