import Vue from 'vue';

export default Vue.extend({
  props: {
    type: String
  },
  render() {
    return <i class={'el-icon-' + this.type}/>;
  }
});
