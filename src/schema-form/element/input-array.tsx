export default {
  props: {
    value: Array,
    cellSpan: {type: Number, default: 12},
    addBtnText: String,
    addBtnProps: Object,
    maxLength: {type: Number, default: 0}
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
    return <el-row gutter={this.$attrs.gutter || 20} type="flex">
      {this.current.map((v, index) => {
        return <el-col span={this.cellSpan}>
          <el-input vModel={this.current[index]}/>
        </el-col>;
      })}
      {this.renderAddButton()}
    </el-row>;
  },
  methods: {
    renderAddButton(this: any) {
      if (this.maxLength > 0 && this.current.length >= this.maxLength) {
        return null;
      }
      return <el-col span={this.cellSpan}>
        <el-button onClick={this.onAddClick}
                   type="primary"
                   attrs={Object.assign({}, this.addBtnProps)}>{this.addBtnText || '添加'}</el-button>
      </el-col>;
    },
    onAddClick(this: any) {
      this.current.push('');
    }
  }
};
