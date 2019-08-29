import {ASchemaForm, getButtonComponent, getColComponent, getRowComponent} from '@/schema-form/utils';

export default {
  name: 'BaseArrayComponent',
  props: {
    value: Array,
    cellSpan: {type: Number, default: 12},
    addBtnText: String,
    addBtnProps: Object,
    maxLength: {type: Number, default: 0},
    component: String,
    disabled: {type: Boolean, default: false}
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
        const input = <InputComponent attrs={Object.assign({arrayIndex: index}, this.$attrs)}
                                      onRemoveArrayItem={async (index) => {
                                        await this.$mconfirm('确定删除此项吗?', '提示');
                                        this.current.splice(index, 1);
                                      }}
                                      vModel={this.current[index]}/>;
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
    if (this.$attrs.platform === 'mobile') {
      return content;
    } else {
      return <RowComponent gutter={this.$attrs.gutter || 20}
                           type="flex">{content}</RowComponent>;
    }
  },
  methods: {
    validate() {
      return true;
    },
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
                                      disabled={this.disabled}
                                      style={buttonStyle}
                                      icon="plus"
                                      attrs={Object.assign({}, this.addBtnProps)}>{this.addBtnText || '添加'}</ButtonComponent>;
      if (this.component === ASchemaForm) {
        return <div style={{margin: '10px 15px'}}>{button}</div>;
      }
      return <ColComponent span={this.cellSpan}>{button}</ColComponent>;
    },
    onAddClick(this: any) {
      this.current.push(null);
    }
  }
};
