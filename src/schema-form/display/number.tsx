import {defineComponent} from 'vue';

export default defineComponent({
  name: 'NumberDisplay',
  props: {
    value: [Number, String, Object],
    extra: [String, Object]
  },
  render() {
    if (this.extra) {
      return <span>
        <a>{this.value}</a>
        <span class="m-l-sm">{this.extra}</span>
      </span>;
    } else {
      return <a>{this.value}</a>;
    }
  }
});
