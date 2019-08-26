import {getOptionProperty} from '@/schema-form/utils';

export default {
  name: 'BaseOptionComponent',
  props: {
    options: Array,
    labelProperty: {type: String, default: 'label'},
    valueProperty: {type: String, default: 'value'}
  },
  render(this: any) {
    const InputComponent = this.component;
    const OptionComponent = this.optionComponent;
    return <InputComponent
      attrs={this.$attrs}
      on={this.$listeners}>
      {
        this.options.map(option => {
          const props = {};
          props[this.labelProp] = getOptionProperty(option, this.labelProperty);
          props[this.valueProp] = getOptionProperty(option, this.valueProperty);
          return <OptionComponent attrs={props}>
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
