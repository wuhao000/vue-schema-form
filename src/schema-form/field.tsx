import {Platform, SchemaFormField} from '@/types/bean';
import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop, Watch} from 'vue-property-decorator';
import ArrayWrapper from './array-wrapper';
import {
  DESKTOP,
  getAlertComponent,
  getColComponent,
  getComponent, getConfirmFunction,
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
  @Prop([Object, Array])
  public formValue: { [key: string]: any } | [];
  @Prop({type: Boolean, default: false})
  public display: boolean;
  @Prop({type: String, default: 'mobile'})
  public platform: Platform;
  @Prop()
  public value: any;
  public currentValue: any = null;
  @Prop()
  public content: any;
  @Prop({type: Boolean, default: false})
  public disabled: boolean;
  @Prop(String)
  public path: string;

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
      props.pathPrefix = this.path;
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

  public renderInputComponent() {
    const {props, currentValue, definition} = this;
    const inputFieldDef = this.componentType;
    const InputFieldComponent = inputFieldDef.component;
    if (this.content) {
      return this.content;
    }
    if (this.display && this.definition.displayValue) {
      if (typeof this.definition.displayValue === 'function') {
        return this.definition.displayValue(this.currentValue);
      } else {
        return this.definition.displayValue;
      }
    }
    if (this.definition.array && inputFieldDef.forArray === false) {
      // @ts-ignore
      return <ArrayWrapper
        subForm={this.definition.type === TYPES.subForm}
        addBtnText={props.addBtnText}
        ref="array"
        platform={this.platform}
        addBtnProps={props.addBtnProps}
        cellSpan={props.cellSpan}
        onAdd={() => {
          this.addArrayItem();
        }}>
        {
          this.currentValue.map((v, index) => {
            // @ts-ignore
            return <InputFieldComponent
              attrs={props}
              arrayIndex={index}
              disabled={this.disabled}
              onRemoveArrayItem={async () => {
                const confirmFunc = getConfirmFunction(this.platform);
                await this[confirmFunc]('确定删除该条吗？', '提示');
                this.currentValue.splice(index, 1);
              }}
              value={v}
              title={this.platform === 'mobile' ? definition.title : null}
              onInput={(val) => {
                this.currentValue[index] = val;
                this.onInput(this.currentValue);
              }}/>;
          })
        }

      </ArrayWrapper>;
    }
    // @ts-ignore
    return <InputFieldComponent
      attrs={props}
      ref="input"
      disabled={this.disabled}
      value={currentValue}
      title={this.platform === 'mobile' ? definition.title : null}
      onInput={this.onInput}/>;
  }

  public render() {
    const {props, definition, platform} = this;
    if (this.display) {
      props.definition = this.definition;
    }
    const component = this.renderInputComponent();
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
      prop: definition.property,
      title: definition.title,
      label: definition.title
    };
  }

  public validate() {
    if (this.definition.type === TYPES.subForm
      && this.$refs.array) {
      const array = this.$refs.array as any;
      const validateFields = array.$children.filter(it => it.validate);
      return new Promise((resolve) => {
        Promise.all(validateFields.map(it => {
          return it.validate();
        })).then((values) => {
          if (values.some(it => !it)) {
            resolve(false);
          } else {
            resolve(true);
          }
        }).catch(() => {
          console.log(2);
          resolve(false);
        });
      });
    }
    return true;
  }

  private addArrayItem() {
    this.currentValue.push(null);
  }
}
