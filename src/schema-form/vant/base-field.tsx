import { defineComponent } from 'vue';

export default defineComponent({
  name: 'VmBaseField',
  inheritAttrs: false,
  props: {
    title: [String, Object],
    placeholder: String,
    required: Boolean,
    isLink: Boolean
  },
  emits: ['click'],
  render() {
    return <van-field
      required={this.required}
      readonly
      placeholder={this.placeholder}
      isLink={this.isLink}
      v-slots={{
        label: this.$slots.title ?? (() => this.title),
        input: this.$slots.default
      }}
      onClick={(...args) => {
        this.$emit('click', ...args);
      }}
    />;
  }

});