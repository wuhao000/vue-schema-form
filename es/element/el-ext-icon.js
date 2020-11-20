import { createVNode } from "vue";
export default Vue.extend({
  props: {
    type: String
  },
  render: function render() {
    var h = arguments[0];
    return createVNode("i", {
      "class": 'el-icon-' + this.type
    }, null);
  }
});