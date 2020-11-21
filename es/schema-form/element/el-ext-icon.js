import Vue from 'vue';
export default Vue.extend({
  props: {
    type: String
  },
  render: function render() {
    var h = arguments[0];
    return h("i", {
      "class": 'el-icon-' + this.type
    });
  }
});