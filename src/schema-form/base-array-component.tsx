import {ASchemaForm, getButtonComponent, getColComponent, getRowComponent} from '@/schema-form/utils';

export default {
  name: 'BaseArrayComponent',
  props: {
    value: Array,
    cellSpan: {type: Number, default: 12},
    addBtnText: String,
    addBtnProps: Object,
    maxLength: {type: Number, default: 0},
    component: String
  },
  data(this: any) {
    return {
      current: this.value || []
    };
  },
  watch: {
    value(value) {
      this.current = value || [];
    },
    current(this: any, current: any[]) {
      this.$emit('input', current);
      this.$emit('change', current);
    }
  },
  render(this: any) {
    const InputComponent = this.component;
    const RowComponent = getRowComponent();
    const ColComponent = getColComponent();
    const content = [
      this.current.map((v, index) => {
        const input = <InputComponent attrs={Object.assign({}, this.$attrs)} vModel={this.current[index]}/>;
        if (this.component === ASchemaForm) {
          return input;
        }
        return <ColComponent span={this.cellSpan}>{input}</ColComponent>;
      }),
      this.renderAddButton()
    ];
    if (this.component === ASchemaForm) {
      return <div>{content}</div>;
    }
    return <RowComponent gutter={this.$attrs.gutter || 20} type="flex">{content}</RowComponent>;
  },
  methods: {
    renderAddButton(this: any) {
      const ColComponent = getColComponent();
      const ButtonComponent = getButtonComponent();
      if (this.maxLength > 0 && this.current.length >= this.maxLength) {
        return null;
      }
      const buttonStyle: any = {};
      if (this.addBtnProps && this.addBtnProps.block) {
        buttonStyle.width = '100%';
      }
      const button = <ButtonComponent onClick={this.onAddClick}
                                      style={buttonStyle}
                                      type="primary"
                                      attrs={Object.assign({}, this.addBtnProps)}>{this.addBtnText || '添加'}</ButtonComponent>;
      if (this.component === ASchemaForm) {
        return button;
      }
      return <ColComponent span={this.cellSpan}>{button}</ColComponent>;
    },
    onAddClick(this: any) {
      this.current.push(null);
    }
  }
};
