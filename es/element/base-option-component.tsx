import {getOptionProperty} from '../utils/utils';

export default {
  name: 'BaseOptionComponent',
  props: {
    options: Array,
    labelProperty: {type: String, default: 'label'},
    valueProperty: {type: String, default: 'value'},
    value: {}
  },
  render(this: any) {
    const InputComponent = this.component;
    const OptionComponent = this.optionComponent;
    const props = Object.assign({value: this.value}, this.$attrs);
    if (props.value === undefined) {
      if (props.multiple) {
        props.value = [];
      } else {
        props.value = null;
      }
    }
    return <InputComponent
      props={props}
      on={this.$listeners}>
      {
        this.options.map(option => {
          const props = {};
          props[this.labelProp] = getOptionProperty(option, this.labelProperty);
          props[this.valueProp] = getOptionProperty(option, this.valueProperty);
          return <OptionComponent props={props}>
            {this.labelProp === 'text' ? props[this.labelProp] : null}
          </OptionComponent>;
        })
      }
    </InputComponent>;
  },
  computed: {
    labelProp() {
      return 'label';
    },
    valueProp() {
      return 'value';
    },
    component() {
      return '';
    },
    optionComponent() {
      return '';
    }
  }
};
