import {ASchemaForm, getButtonComponent, getColComponent, getRowComponent} from '@/schema-form/utils';

export default {
  name: 'ArrayWrapper',
  props: {
    cellSpan: {type: Number, default: 24},
    addBtnText: String,
    addBtnProps: Object,
    maxLength: {type: Number, default: 0},
    subForm: {type: Boolean, default: false}
  },
  render(this: any) {
    const RowComponent = getRowComponent();
    const content = [
      this.$slots.default,
      this.renderAddButton()
    ];
    if (this.subForm) {
      return <div>{content}</div>;
    }
    if (this.$attrs.platform === 'mobile') {
      return content;
    } else {
      return <RowComponent gutter={this.$attrs.gutter || 20}
                           type="flex">{content}</RowComponent>;
    }
  },
  methods: {
    renderAddButton(this: any) {
      if (this.$attrs.mode === 'display') {
        return null;
      }
      const ColComponent = getColComponent();
      let ButtonComponent = getButtonComponent();
      if (this.maxLength > 0 && this.current.length >= this.maxLength) {
        return null;
      }
      if (this.$attrs.platform === 'mobile') {
        ButtonComponent = 'm-button';
      }
      const buttonStyle: any = {};
      if (this.addBtnProps && this.addBtnProps.block) {
        buttonStyle.width = '100%';
      }
      const button = <ButtonComponent onClick={this.onAddClick}
                                      style={buttonStyle}
                                      icon="plus"
                                      attrs={Object.assign({}, this.addBtnProps)}>{this.addBtnText || '添加'}</ButtonComponent>;
      if (this.subForm) {
        return <div style={{margin: '10px 15px'}}>{button}</div>;
      }
      return <ColComponent span={this.cellSpan}>{button}</ColComponent>;
    },
    onAddClick(this: any) {
      this.$emit('add');
    }
  }
};
