import { defineComponent, ref } from 'vue';
import BaseField from './base-field';

export default defineComponent({
  name: 'VmDateRangePicker',
  setup() {
    const date = ref('');
    const show = ref(false);

    const formatDate = (date) => `${date.getMonth() + 1}/${date.getDate()}`;
    const onConfirm = (values) => {
      const [start, end] = values;
      show.value = false;
      date.value = `${formatDate(start)} - ${formatDate(end)}`;
    };

    return {
      date,
      show,
      onConfirm
    };
  },
  render() {
    return [
      <BaseField
        {...this.$attrs}
        onClick={() => {
          this.show = true;
        }}>
        {this.date}
      </BaseField>,
      <van-calendar
        v-model={[this.show, 'show']}
        type="range"
        onConfirm={this.onConfirm} />
    ];
  }
});