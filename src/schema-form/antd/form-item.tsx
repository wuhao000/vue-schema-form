import AsyncValidator from 'async-validator';
import debounce from 'lodash.debounce';
import Component, {mixins} from 'vue-class-component';
import {Inject, Prop, Provide} from 'vue-property-decorator';
import {ValidateRule, ValidateRules} from '../../../types';
import Emitter from '../mixins/emitter';
import {getPropByPath, noop} from './utils';

@Component({
  name: 'DFormItem'
})
export default class DFormItem extends mixins(Emitter) {
  public static componentName: 'ElFormItem';
  public control = null;
  public currentHelp = '';
  public currentValidateStatus = '';
  @Inject({from: 'form', default: () => undefined})
  public form: any;
  @Provide('formItem')
  public formItem = {
    ...this.$props,
    ...this.$data,
    validate: this.validate
  };
  @Prop({type: Boolean, default: false})
  public hasFeedback: boolean;
  @Prop({type: String})
  public help: string;
  @Prop({type: String, default: ''})
  public label: string;
  @Prop({type: [String, Number]})
  public labelWidth: any;
  @Prop({type: String, default: ''})
  public prop: string;
  @Prop({type: Boolean, default: false})
  public required: boolean;
  @Prop({type: [Object, Array]})
  public rules: any;
  public validateDisabled = true;
  @Prop({type: String})
  public validateStatus: string;
  @Prop({})
  public value: any;

  get fieldValue() {
    if (this.value !== null && this.value !== undefined) {
      return this.value;
    }
    const model = this.form && this.form.model;
    if (!model || !this.prop) {
      return;
    }

    let path = this.prop;
    if (path.indexOf(':') !== -1) {
      path = path.replace(/:/, '.');
    }
    return getPropByPath(model, path, true).v;
  }

  get isRequired() {
    if (this.required) {
      return this.required;
    } else {
      return this.getRules().some(it => it.required);
    }
  }

  get labelCol() {
    let labelCol: any = {};
    if (this.$attrs['label-col']) {
      labelCol = this.$attrs['label-col'];
    }
    if (this.form && this.form.labelCol) {
      if (typeof this.form.labelCol === 'number') {
        labelCol.span = this.form.labelCol;
      } else {
        labelCol = this.form.labelCol;
      }
    }
    labelCol.style = this.labelStyle;
    return labelCol;
  }

  get labelStyle() {
    const labelWidth = this.labelWidth ? this.labelWidth : (this.form && this.form.labelWidth);
    const style: any = {};
    if (labelWidth) {
      style.width = typeof labelWidth === 'number' ? (labelWidth + 'px') : labelWidth;
      style.float = 'left';
    }
    return style;
  }

  get wrapperCol() {
    let wrapperCol: any = {};
    if (this.$attrs['wrapper-col']) {
      wrapperCol = this.$attrs['wrapper-col'];
    }
    if (this.form && this.form.wrapperCol) {
      if (typeof this.form.wrapperCol === 'number') {
        wrapperCol.span = this.form.wrapperCol;
      } else {
        wrapperCol = this.form.wrapperCol;
      }
    } else if (this.form && this.form.labelCol) {
      if (typeof this.form.labelCol === 'number') {
        wrapperCol.span = 24 - this.form.labelCol;
      }
    }
    wrapperCol.style = this.wrapperStyle;
    return wrapperCol;
  }

  get wrapperStyle() {
    const labelWidth = this.labelWidth ? this.labelWidth : (this.form && this.form.labelWidth);
    const style: any = {};
    if (labelWidth) {
      style.marginLeft = typeof labelWidth === 'number' ? (labelWidth + 'px') : labelWidth;
    }
    return style;
  }

  public beforeDestroy() {
    if (this.prop) {
      this.dispatch('DForm', 'd.form.removeField', [this]);
    }
  }

  public created() {
    if (this.prop) {
      this.dispatch('DForm', 'd.form.addField', [this]);
      this.$on('d.form-item.setControl', (control) => {
        this.control = control;
      });
      const rules = this.getRules();
      if (rules.length || this.required !== undefined) {
        this.$on('d.form.blur', this.onFieldBlur);
        this.$on('el.form.blur', this.onFieldBlur);
        this.$on('d.form.change', this.onFieldChange);
        this.$on('el.form.change', this.onFieldChange);
      }
    }
    this.validate = debounce(this.validate, 300);
  }

  public focus() {
    if (this.control && this.control.focus.bind(this.control).bind(this.control).bind(this.control).bind(this.control).bind(this.control)) {
      this.control.focus();
    }
  }

  public getFilteredRule(trigger) {
    const rules = this.getRules();
    return rules.filter(rule => {
      if (!rule.trigger || trigger === '') {
        return true;
      }
      if (Array.isArray(rule.trigger)) {
        return rule.trigger.indexOf(trigger) > -1;
      } else {
        return rule.trigger === trigger;
      }
    }).map(rule => Object.assign({}, rule));
  }

  public getRules(): ValidateRule[] {
    let formRules: ValidateRules = this.form && this.form.rules;
    const selfRules = this.rules;
    const requiredRule = this.required !== undefined ? {required: this.required} : [];
    const prop = getPropByPath(formRules, this.prop || '');
    formRules = formRules ? (prop.o[this.prop || ''] || prop.v) : [];
    return [].concat(selfRules || formRules || []).concat(requiredRule);
  }

  public onFieldBlur() {
    this.validate('blur');
  }

  public onFieldChange() {
    if (this.validateDisabled) {
      this.validateDisabled = false;
      return;
    }
    this.validate('change');
  }

  public render() {
    const props = Object.assign({}, this.$props);
    if (this.$slots.label) {
      props.label = this.$slots.label;
    }
    props.help = this.help || this.currentHelp;
    props.labelCol = this.labelCol;
    props.validateStatus = this.validateStatus || this.currentValidateStatus;
    props.wrapperCol = this.wrapperCol;
    return <a-form-item props={props}
                        attrs={this.$attrs}>
      {this.$slots.default}
    </a-form-item>;
  }

  public validate(trigger, callback = noop) {
    this.$nextTick(() => {
      this.validateDisabled = false;
      const rules = this.getFilteredRule(trigger);
      if ((!rules || rules.length === 0) && this.required === undefined) {
        callback();
        return true;
      }
      this.currentValidateStatus = 'validating';
      const descriptor = {};
      if (rules && rules.length > 0) {
        rules.forEach(rule => {
          delete rule.trigger;
        });
      }
      descriptor[this.prop] = rules;
      const validator = new AsyncValidator(descriptor);
      const model = {
        [this.prop]: this.fieldValue
      };
      validator.validate(model, {firstFields: true}, (errors, invalidFields) => {
        this.currentValidateStatus = !errors ? 'success' : 'error';
        this.currentHelp = errors ? errors[0].message : '';
        callback(this.currentHelp, invalidFields);
        this.$emit('validate', !errors, errors);
        this.form && this.form.$emit('validate', this.prop, !errors, this.currentHelp || null);
      });
    });
  }
}
