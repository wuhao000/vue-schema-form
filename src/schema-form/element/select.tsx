import {getOptionProperty} from '@/schema-form/utils';

export default {
  props: {
    options: Array,
    labelProperty: {type: String, default: 'label'},
    valueProperty: {type: String, default: 'value'}
  },
  render(this: any) {
    return <el-select attrs={this.$attrs} on={this.$listeners}>
      {
        this.options.map(option => {
          return <el-option label={getOptionProperty(option, this.labelProperty)}
                            value={getOptionProperty(option, this.valueProperty)}/>;
        })
      }
    </el-select>;
  }
};
