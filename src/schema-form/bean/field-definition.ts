import _ from 'lodash';
import {Component, isProxy, isVNode, reactive, toRaw, VNode} from 'vue';
import {
  DefaultPatternRule,
  FieldDefinitionEnum,
  FormFields,
  IFormPathMatcher,
  IRuleDescription,
  Path, Platform, SchemaFormComponent, SchemaFormComponentOptions,
  SchemaFormField, SchemaFormFieldType, SchemaFormStore, TriggerType,
  ValueProcessor
} from '../../../types';
import {buildArrayPath, getComponentType, getRealFields, SchemaFormEvents} from '../internal/utils';
import {isArr, parseDestructPath} from '../uform/utils';
import regexp, {errorMessages} from '../uform/validator/regexp';
import {fixComponentDefinition, isNotNull} from '../utils/utils';

export class FieldDefinition<V = any> {
  public array = false;
  public default?: V = null;
  public definition: SchemaFormField = null;
  public description?: string | VNode;
  public destructPath?: {
    path: string,
    destruct: any
  } = null;
  public disabled = false;
  public display = false;
  public displayValue?: any = null;
  public editable = true;
  public enum: FieldDefinitionEnum;
  public errors?: string[] = null;
  public events?: { [key: string]: (...args: any[]) => any };
  public fields?: FormFields = null;
  public focus?: (event?: boolean) => any = null;
  public id: string = null;
  public inputRef?: any;
  public loading = false;
  public layoutType?: string | { [key: string]: unknown };
  public layoutProps?: { [key: string]: unknown };
  public match?: (path: Path | IFormPathMatcher) => boolean = null;
  public max?: number;
  public min?: number;
  public name?: string = null;
  public options: any;
  public onChange?: (fn: () => void) => void = null;
  public processor: ValueProcessor;
  public path?: string[] = null;
  public plainPath?: string = null;
  public props?: { [key: string]: any } = null;
  public placeholder?: string;
  public required = false;
  public rules?: IRuleDescription[] = null;
  public setGetValue?: (value?: any) => any = null;
  public reset?: () => void;
  public slot?: string | (() => VNode) = null;
  public store?: SchemaFormStore = null;
  public title: any = null;
  public type: string | Component | SchemaFormComponentOptions | SchemaFormComponentOptions[] = null;
  public valid = true;
  public validate?: (trigger?: TriggerType) => (boolean | Promise<unknown>) = null;
  public value: V = null;
  public xType: SchemaFormFieldType = null;
  public visible = true;

  constructor(definition: SchemaFormField,
              store: SchemaFormStore,
              pathPrefix: string[], currentValue: any) {
    this.placeholder = definition.placeholder;
    this.layoutType = definition.layoutType;
    this.layoutProps = definition.layoutProps;
    this.array = definition.array;
    this.definition = definition;
    this.disabled = false;
    this.display = true;
    this.enum = definition.enum || null;
    this.id = definition.id;
    this.processor = definition.processor;
    this.slot = definition.slot;
    this.store = store;
    this.type = definition.type;
    this.xType = definition.xType;
    this.events = definition.events;
    this.name = definition.property;
    this.path = buildArrayPath(pathPrefix, definition);
    this.plainPath = buildArrayPath(pathPrefix, definition).join('.');
    this.destructPath = parseDestructPath(definition.property);
    this.props = reactive(Object.assign({}, definition.xProps || definition.props));
    this.valid = true;
    this.displayValue = definition.displayValue;
    this.required = definition.required;
    this.min = definition.min;
    this.max = definition.max;
    this.fields = getRealFields(definition);
    this.description = definition.description;
    this.errors = [];
    this.default = definition.default;
    this.value = currentValue;
    this.setGetValue = null;
    this.reset = null;
  }

  public getRules() {
    return getRulesFromProps(this.definition, this.required);
  }

  public isVisible() {
    return this.visible;
  }

  public validateIgnore() {
    return this.isVisible() === false ||
      this.display === false ||
      this.editable === false
  }

  public setVisible(visible: boolean) {
    this.visible = visible;
  }

  public generateEvents(): { [key: string]: (...args: any[]) => any } {

    const getEventMetadata = (event) => {
      return {event, path: this.plainPath, field: this};
    };

    const onFocus = (event, ...args) => {
      if (this.events?.onFocus) {
        this.events?.onFocus?.(this.store.context, event, ...args);
      } else if (this.props?.onBlur) {
        this.props?.onFocus?.(event, ...args);
      }
      const input = this.inputRef;
      let el: any;
      if (isVNode(input)) {
        el = input.el;
      } else {
        el = input;
      }
      if (el) {
        if (el.focus) {
          el.focus({preventScroll: false});
          if (event === true) {
            el.scrollIntoView({behavior: 'smooth'});
          }
        }
        this.store.context.trigger(SchemaFormEvents.fieldFocus, getEventMetadata(event));
      }
    };

    const onKeydown = (event, ...args) => {
      if (this.events?.onKeydown) {
        this.events?.onKeydown?.(this.store.context, event, ...args);
      } else if (this.props?.onKeydown) {
        this.props?.onKeydown?.(event, ...args);
      }
      this.store.context.trigger(SchemaFormEvents.fieldKeydown, getEventMetadata(event));
    };

    const onKeyup = (event, ...args) => {
      if (this.events?.onKeyup) {
        this.events?.onKeyup?.(this.store.context, event, ...args);
      } else if (this.props?.onKeyup) {
        this.props?.onKeyup?.(event, ...args);
      }
      this.store.context.trigger(SchemaFormEvents.fieldKeyup, getEventMetadata(event));
    };

    const onBlur = (event, ...args) => {
      if (this.events?.onBlur) {
        this.events?.onBlur?.(this.store.context, event, ...args);
      } else if (this.props?.onBlur) {
        this.props?.onBlur?.(event, ...args);
      }
      if (this.valid) {
        this.validate('blur');
      } else {
        this.validate();
      }
      this.store.context.trigger(SchemaFormEvents.fieldBlur, getEventMetadata(event));
    };

    const fieldEvents = {
      onBlur, onFocus, onKeydown, onKeyup
    };
    if (this.events) {
      const keys = Object.keys(fieldEvents);
      Object.keys(this.events).filter(it => !keys.includes(it)).forEach(eventKey => {
        fieldEvents[eventKey] = (...args) => {
          this.events[eventKey](this.store.context, ...args);
        };
      });
    }
    return fieldEvents;
  }

  public getComponent(forDisplay = false, platform: Platform = 'desktop'): SchemaFormComponent | undefined {
    return getComponent(this, this.store, forDisplay, platform);
  }

}

const getRulesFromProps = (field: SchemaFormField, required: boolean) => {
  const rules: IRuleDescription[] = [];
  if (isArr(field.rules)) {
    field.rules.forEach(rule => {
      rules.push(resolveRule(rule));
    });
  } else {
    resolveRule(field.rules);
  }
  if (required && !rules.some(rule => rule.required)) {
    let type = null;
    switch (field.type) {
      case 'integer':
      case 'double':
      case 'number':
        type = 'number';
        break;
      case 'string':
      case 'text':
        type = 'string';
        break;
      case 'boolean':
        type = 'boolean';
        break;
    }
    if (field.array) {
      type = 'array';
    }
    if (type) {
      rules.push({
        required: true,
        message: `${field.title ?? '该字段'}为必填项`
      }, {
        required: true,
        type,
        message: `${field.title ?? '该字段'}的值无效`
      });
    } else {
      rules.push({
        required: true,
        message: `${field.title ?? '该字段'}为必填项`
      });
    }
  }
  if (field.format && !rules.some(rule => rule.format === field.format)) {
    rules.push({format: field.format, message: `${field.title ?? '字段'}格式不正确`});
  }
  if (isNotNull(field.min)) {
    if (['integer', 'double', 'number'].includes(field.type as string)) {
      rules.push({type: 'number', min: field.min, message: `${field.title}不能小于${field.min}`});
    } else if (['string', 'html', 'code', 'text'].includes(field.type as string)) {
      rules.push({type: 'string', min: field.min, message: `${field.title}长度不能小于${field.min}`});
    }
  }
  if (isNotNull(field.max)) {
    if (['integer', 'double', 'number'].includes(field.type as string)) {
      rules.push({type: 'number', max: field.max, message: `${field.title}不能大于${field.max}`});
    } else if (['string', 'text'].includes(field.type as string)) {
      rules.push({type: 'string', max: field.max, message: `${field.title}长度不能大于${field.max}`});
    }
  }
  return _.cloneDeep(rules);
};

const resolveRule = (rule: IRuleDescription | DefaultPatternRule): IRuleDescription => {
  if (typeof rule === 'string') {
    return {
      pattern: regexp[rule],
      message: errorMessages[rule]
    };
  } else {
    return rule;
  }
};

interface SimpleField {
  xType?: SchemaFormFieldType;
  type?: SchemaFormFieldType;
  slot?: string | (() => VNode);
  array?: boolean;
  editable?: boolean | ((value: any, field: FieldDefinition) => boolean);
}

export const getComponent = (field: SimpleField,
                      store: SchemaFormStore,
                      forDisplay = false,
                      platform: Platform = 'desktop'): SchemaFormComponent => {
  const type = field.xType || field.type;
  if (field.slot) {
    return undefined;
  }
  if (typeof type === 'string') {
    return getComponentType(store, {
      type,
      editable: field.editable,
      array: field.array
    });
  }
  if (typeof type === 'function' || isVNode(type)) {
    console.log(1, type);
    return {
      component: type,
      platform,
      mode: forDisplay ? 'display' : 'input',
      arrayMode: 'single',
      layoutOptions: null,
      valueProp: 'value',
      wrap: true,
      getProps: () => {
        return {};
      }
    };
  }
  if (typeof type === 'object' && (typeof type['setup'] === 'function' || typeof type['render'] === 'function')) {
    return {
      component: isProxy(type) ? toRaw(type) : type,
      platform,
      mode: forDisplay ? 'display' : 'input',
      arrayMode: 'single',
      layoutOptions: null,
      valueProp: 'value',
      wrap: true,
      getProps: () => {
        return {};
      }
    };
  }
  return fixComponentDefinition(type as SchemaFormComponentOptions | SchemaFormComponentOptions[], !field.editable);
}
