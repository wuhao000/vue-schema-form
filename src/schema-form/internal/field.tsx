import AsyncValidator from 'async-validator';
import {IField, SchemaFormField, SchemaFormStore} from 'v-schema-form-types';
import {VNode} from 'vue';
import Component, {mixins} from 'vue-class-component';
import {Inject, Prop, Watch} from 'vue-property-decorator';
import Emitter from '../../mixins/emitter';
import {clone, isEqual} from '../../uform/utils';
import ArrayWrapper from '../array-wrapper';
import {createSimpleMobileFieldComponent} from '../compatible';
import {SCHEMA_FORM_STORE_INJECT_KEY} from '../form';
import {
  addRule,
  DESKTOP,
  getColComponent,
  getConfirmFunction,
  getDefaultValue,
  getOptions,
  LibComponents,
  MOBILE,
  swap,
  TYPES
} from '../utils/utils';
import {
  getComponentType,
  getFormItemComponent,
  getRealFields,
  matchCondition,
  renderField,
  SchemaFormEvents
} from './utils';

function getCurrentValue(value, defaultValue) {
  return clone(value) || defaultValue || null;
}

@Component({
  name: 'FormField'
})
export default class FormField extends mixins(Emitter) {

  @Prop(Object)
  public definition: SchemaFormField;
  @Prop([Object, Array])
  public formValue: { [key: string]: any } | [];
  @Prop({type: Boolean, default: true})
  public wrap: boolean;
  @Prop()
  public value: any;
  @Prop()
  public content: any;
  @Prop({type: Boolean, default: false})
  public disabled: boolean;
  @Prop(Array)
  public path: string[];
  @Prop(Array)
  public schemaPath: string[];
  @Prop({required: true})
  public field: IField;
  @Prop(Array)
  public pathPrefix: string[];
  @Inject(SCHEMA_FORM_STORE_INJECT_KEY)
  public store: SchemaFormStore;
  public currentValue: any = getCurrentValue(this.value, this.definition.default);

  public renderField(field: SchemaFormField, currentValue: { [p: string]: any } | Array<{ [p: string]: any }>, index: number, wrap: boolean) {
    return renderField(this.pathPrefix, this.store, field, currentValue, index, wrap, this.$createElement, this);
  }

  get options() {
    return getOptions(this.field);
  }

  get component() {
    return this.field.component;
  }

  get props() {
    const {field, definition, component, path, schemaPath, store: {platform}} = this;
    const props: any = Object.assign({}, component.getProps(field));
    const type = field.type;
    if (type === TYPES.object) {
      props.platform = platform;
      props.editable = this.store.editable;
      props.pathPrefix = path;
      props.schemaPath = schemaPath;
      props.layoutType = definition.layoutType;
      props.layoutProps = definition.layoutProps;
    }
    if (definition.placeholder) {
      props.placeholder = definition.placeholder;
    }
    props.required = field.required;
    if (!this.store.editable || platform === DESKTOP) {
      delete props.required;
    }
    return props;
  }

  @Watch('currentValue', {deep: true, immediate: true})
  public currentValueChanged(currentValue: any, old: any) {
    if (!isEqual(currentValue, this.value)) {
      this.field.value = this.currentValue;
      if (this.store.editable && this.field.editable) {
        this.$emit('input', currentValue);
        this.$emit('change', currentValue);
      }
      this.store.context.trigger(SchemaFormEvents.fieldChange, {
        path: this.field.plainPath,
        value: currentValue,
        field: this.field
      });
    }
  }

  @Watch('formValue', {deep: true})
  public formValueChanged(val) {
    const definition = this.definition;
    if (definition.depends) {
      if (typeof definition.depends === 'function') {
        this.field.visible = definition.depends(val);
      } else {
        return !definition.depends
          .map(condition => matchCondition(val, condition))
          .some(it => !it);
      }
    }
  }

  @Watch('value', {immediate: true})
  public valueChanged(value: any) {
    if (!isEqual(this.currentValue, value)) {
      this.currentValue = getCurrentValue(value, this.definition.default);
    }
  }

  public created() {
    const {field, store} = this;
    if (this.currentValue === undefined || this.currentValue === null) {
      this.currentValue = getDefaultValue(field);
    }
    field.validate = this.validate;
    field.value = this.currentValue;
    field.focus = this.focus;
    field.setGetValue = (value: any) => {
      if (value !== undefined) {
        this.currentValue = getCurrentValue(value, this.definition.default);
      } else {
        return this.currentValue;
      }
    };
    store.context.trigger(SchemaFormEvents.fieldCreate, {
      path: field.plainPath,
      value: this.currentValue,
      field: this.field
    });
  }

  get input(): any {
    return this.$refs.input;
  }

  public focus() {
    if ((this.$el as HTMLElement).focus) {
      (this.$el as HTMLElement).focus({preventScroll: false});
      this.$el.scrollIntoView({behavior: 'smooth'});
    }
  }

  @Watch('field', {immediate: true})
  public fieldChanged(field: IField) {
    this.dispatch('ASchemaForm', 'SchemaForm.addSchemaField', [field]);
  }

  get isDisabled() {
    return this.disabled || this.field.disabled || (this.field.props && this.field.props.disabled);
  }

  public beforeDestroy() {
    this.dispatch('ASchemaForm', 'SchemaForm.removeSchemaField', [this.field]);
  }

  public renderInputComponent() {
    const {props, content, onInput, currentValue, store: {platform}, isDisabled, definition, field} = this;
    if (definition.slot) {
      if (this.store.root.$slots && this.store.root.$slots[definition.slot]) {
        return this.store.root.$slots[definition.slot];
      }
      if (this.store.root.$scopedSlots && this.store.root.$scopedSlots[definition.slot]) {
        return this.store.root.$scopedSlots[definition.slot](currentValue);
      }
      return;
    }
    const inputFieldDef = this.component;
    const InputFieldComponent = inputFieldDef.component;
    if (content) {
      return content;
    }
    if ((!this.store.editable || !this.field.editable) && field.displayValue) {
      let displayValue: any = '';
      if (typeof field.displayValue === 'function') {
        displayValue = field.displayValue(currentValue);
      } else {
        displayValue = field.displayValue;
      }
      if (typeof displayValue === 'object') {
        return displayValue;
      } else {
        return <span>{displayValue}</span>;
      }
    }
    const style: any = Object.assign({}, props.style || {});
    if (inputFieldDef.layout) {
      props.layout = definition.layout;
      const noWrap = !this.field.title;
      props.fields = getRealFields(definition.fields).map((field, index) => {
        return this.renderField(field, currentValue, index, !noWrap);
      });
    }
    if (field.array && inputFieldDef.forArray === false) {
      return this.createArrayInputComponent(InputFieldComponent);
    }
    props.disabled = isDisabled;
    props.value = currentValue;
    props.title = props.title || (platform === 'mobile' ? field.title : null);
    if (definition.type === TYPES.object
      && definition.props) {
      if (!definition.props.props) {
        definition.props.props = {};
      }
      Object.keys(definition.props).forEach(key => {
        if (key !== 'props') {
          definition.props.props[key] = definition.props[key];
        }
      });
    }
    const className = props.className;
    delete props.className;
    delete props.style;
    const nativeEvents = {};
    const events = {};
    if (this.definition.events) {
      Object.keys(this.definition.events).forEach(eventName => {
        events[eventName] = (...args: any[]) => {
          this.definition.events[eventName](this.store.context, ...args);
        };
      });
    }
    if (this.definition.nativeEvents) {
      Object.keys(this.definition.nativeEvents).forEach(eventName => {
        nativeEvents[eventName] = (...args: any[]) => {
          this.definition.nativeEvents[eventName](this.store.context, ...args);
        };
      });
    }
    // @ts-ignore
    return <InputFieldComponent
      props={props}
      value={currentValue}
      class={className}
      attrs={props}
      style={style}
      nativeOn={nativeEvents}
      on={Object.assign({
        blur: this.onBlur,
        focus: this.onFocus,
        keydown: this.onKeydown,
        keyup: this.onKeyup,
        input: onInput,
        compositionend: (e) => {
          this.onInput(e.target.value);
        }
      }, events)}
      key={field.plainPath}
      ref="input"/>;
  }

  private createArrayInputComponent(InputFieldComponent: string | object) {
    const platform = this.store.platform;
    const {onArrayItemInput, props, currentValue, isDisabled, field, definition} = this;
    let ArrayComponent: any = ArrayWrapper;
    if (typeof definition.arrayComponent === 'string') {
      // @ts-ignore
      const componentDef = getComponentType(this.store, {
        type: definition.arrayComponent,
        props: definition.arrayProps
      });
      if (componentDef.component !== 'empty') {
        ArrayComponent = componentDef.component;
      }
    } else if (['function', 'object'].includes(typeof definition.arrayComponent)) {
      ArrayComponent = definition.arrayComponent;
    }
    const arrayProps = Object.assign({}, this.props, definition.arrayProps);
    const arrayClass = arrayProps.className;
    const arrayStyle = arrayProps.style;
    delete arrayProps.className;
    delete arrayProps.style;
    // @ts-ignore
    return <ArrayComponent
      props={arrayProps}
      class={arrayClass}
      style={arrayStyle}
      disabled={isDisabled}
      subForm={field.type === TYPES.object}
      addBtnText={props.addBtnText}
      ref="array"
      key={field.plainPath}
      platform={platform}
      addBtnProps={props.addBtnProps}
      cellSpan={props.cellSpan}
      onRemove={async (index) => {
        try {
          const confirmFunc = getConfirmFunction(platform);
          await confirmFunc('确定删除该条吗？', '提示');
          this.removeArrayItem(index);
        } catch (e) {
          console.error(e);
        }
      }}
      onMoveDown={(index) => {
        if (index <= currentValue.length - 1) {
          swap(currentValue, index, index + 1);
        }
      }}
      onMoveUp={(index) => {
        if (index > 0) {
          swap(currentValue, index, index - 1);
        }
      }}
      onAdd={() => {
        this.addArrayItem();
      }}>
      {
        currentValue ? currentValue.map((v, index) => {
          const itemProps = Object.assign({}, props, {
            pathPrefix: this.path.concat(index),
            schemaPath: this.path
          });
          if (field.type === TYPES.object) {
            itemProps.definition = Object.assign({}, itemProps.definition);
            delete itemProps.definition.array;
          }
          const className = itemProps.className;
          const style = itemProps.style;
          delete itemProps.className;
          delete itemProps.style;
          // @ts-ignore
          return <InputFieldComponent
            attrs={itemProps}
            class={className}
            style={style}
            arrayIndex={index}
            disabled={isDisabled}
            key={field.plainPath + '-' + index}
            value={v}
            title={platform === 'mobile' ? field.title : null}
            onBlur={this.onBlur}
            onFocus={this.onFocus}
            onInput={(val) => {
              onArrayItemInput(val, index);
            }}/>;
        }) : null
      }
    </ArrayComponent>;
  }

  public onBlur(event) {
    if (!this.field.valid) {
      this.validate();
    }
    this.store.context.trigger(SchemaFormEvents.fieldBlur, this.getEventMetadata(event));
  }

  public getEventMetadata(event) {
    return {event, path: this.field.plainPath, field: this.field};
  }

  public onFocus(event) {
    this.store.context.trigger(SchemaFormEvents.fieldFocus, this.getEventMetadata(event));
  }

  public onKeydown(event) {
    this.store.context.trigger(SchemaFormEvents.fieldKeydown, this.getEventMetadata(event));
  }

  public onKeyup(event) {
    this.store.context.trigger(SchemaFormEvents.fieldKeyup, this.getEventMetadata(event));
  }

  get type() {
    return this.field.type;
  }

  get editable() {
    return this.store.editable && this.field.editable;
  }

  public render() {
    const {props, field, definition, editable, store: {platform}} = this;
    if (!editable) {
      props.definition = definition;
      props.field = field;
    }
    const inputComponent = this.renderInputComponent();
    let item = null;
    const FormItemComponent = getFormItemComponent(platform);
    const ColComponent = getColComponent();
    if (platform === DESKTOP) {
      item = this.renderDesktopComponent(inputComponent, FormItemComponent, item, ColComponent);
    } else if (platform === MOBILE) {
      if (!editable) {
        item = createSimpleMobileFieldComponent(field.title,
          inputComponent, field,
          this.$createElement);
      } else {
        item = inputComponent;
      }
    }
    const style: any = {};
    if (!field.visible) {
      style.display = 'none';
    }
    if (item) {
      if (item.data) {
        (item as VNode).data.staticStyle = style;
      } else {
        (item as VNode).data = {
          staticStyle: style
        };
      }
    }
    return item;
  }

  private renderDesktopComponent(inputComponent, FormItemComponent: string, item, ColComponent: string) {
    const {definition, field} = this;
    const formItemProps = this.getFormItemProps();
    const style = formItemProps.style;
    const className = formItemProps.className;
    delete formItemProps.style;
    delete formItemProps.className;
    const noWrap = !field.title;
    const formItem = noWrap ? inputComponent :
      <FormItemComponent attrs={Object.assign({}, formItemProps, {label: null})}
                         class={className}
                         style={style}>
        {definition?.wrapperProps?.noTitle ? null :
          <span slot="label">{formItemProps.label}</span>}
        {inputComponent}
        {
          definition.description ? <div>{definition.description}</div> : null
        }
      </FormItemComponent>;
    if (definition.span) {
      item = <ColComponent span={definition.span}>{formItem}</ColComponent>;
    } else {
      item = formItem;
    }
    return item;
  }

  public getRules() {
    const {definition, field} = this;
    const rules = field.rules || [];
    if (rules.length === 0) {
      if (field.required) {
        addRule(rules, field, {required: true, message: `${field.title}为必填项`});
      }
      if (typeof definition.min === 'number') {
        addRule(rules, field, {min: definition.min, message: `${field.title}不能小于${definition.min}`});
      }
      if (typeof definition.max === 'number') {
        addRule(rules, field, {max: definition.max, message: `${field.title}不能大于${definition.max}`});
      }
    }
    return rules;
  }

  public onInput(value) {
    if (!isEqual(this.currentValue, value)) {
      this.currentValue = getCurrentValue(value, this.definition.default);
    }
  }

  get error() {
    return this.field.errors.join('、');
  }

  public getFormItemProps() {
    const {definition, field, store: {platform, editable}} = this;
    const component = getFormItemComponent(platform);
    const props: any = {
      required: editable ? definition.required : null,
      title: field.title,
      label: field.title
    };
    if (platform === DESKTOP) {
      if (definition.tip) {
        const popover = LibComponents.popover;
        props.label = <LibComponents.popover
          content={definition.tip}
          trigger="hover">
          <span slot={popover === 'el-popover' ? 'reference' : 'default'}>
            {field.title}
            <LibComponents.icon style={{marginLeft: '5px', color: '#247dc5'}}
                                type={LibComponents.icons.info}/>
          </span>
        </LibComponents.popover>;
      } else {
        props.label = field.title;
      }
    }
    if (definition.wrapperProps) {
      Object.assign(props, definition.wrapperProps);
      if (definition.wrapperProps.noTitle) {
        props.title = null;
        props.label = null;
      }
    }
    if (component === 'd-form-item' || component === 'a-form-item') {
      props.help = field.errors.join('、');
      if (props.help) {
        props.hasFeedback = true;
        props.validateStatus = 'error';
      }
    } else if (component === 'el-form-item') {
      props.error = field.errors.join('、');
    }
    return props;
  }

  public validate() {
    if (this.component.layout) {
      return true;
    }
    const {field} = this;
    if (this.type === TYPES.object
      && this.$refs.array) {
      const array = this.$refs.array as any;
      const validateFields = array.$children.filter(it => (it as any).validate);
      return new Promise((resolve) => {
        Promise.all(validateFields.map(it => {
          return it.validate();
        })).then((values) => {
          resolve(values.filter(it => !!it).flat());
        });
      });
    }
    const rules = this.getRules();
    if (rules.length) {
      const validator = new AsyncValidator({
        [field.plainPath]: rules
      });
      let value = this.currentValue;
      if ([TYPES.integer, TYPES.double, TYPES.number].includes(this.type as any)) {
        value = parseFloat(value);
      }
      const model = {
        [field.plainPath]: value
      };
      return new Promise((resolve) => {
        validator.validate(model, {firstFields: true}, (errors) => {
          if (errors) {
            field.valid = false;
            field.errors = errors.map(error => error.message);
          } else {
            field.valid = true;
            field.errors = [];
          }
          if (errors) {
            resolve(errors.map(it => ({message: it.message, path: this.field.plainPath})));
          } else {
            resolve(null);
          }
        });
      });
    }
    return true;
  }

  private removeArrayItem(index: number) {
    this.currentValue.splice(index, 1);
  }

  private addArrayItem() {
    if (this.currentValue) {
      if (this.type === TYPES.object) {
        this.currentValue.push({});
      } else {
        this.currentValue.push(null);
      }
    } else {
      if (this.type === TYPES.object) {
        this.currentValue = [{}];
      } else {
        this.currentValue = [null];
      }
    }
  }

  private onArrayItemInput(val: any, index: number) {
    this.currentValue.splice(index, 1, val);
    this.onInput(this.currentValue);
  }
}
