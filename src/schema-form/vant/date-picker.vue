<template>
  <div>
    <van-cell @click="toggle"
              :title="title">
      {{displayValue}}
    </van-cell>
    <van-popup close-on-popstate
               v-model="popupVisible"
               position="bottom">
      <van-datetime-picker @confirm="confirm"
                           :type="type"
                           v-bind="$attrs"
                           @input="onInput"
                           v-model="currentValue"
                           @cancel="cancel"/>
    </van-popup>
  </div>
</template>
<script lang="tsx">
  import {dateToString} from 'vant/es/sku/utils/time-helper';
  import Vue from 'vue';

  export default Vue.extend({
    props: {
      title: {},
      value: {},
      type: String
    },
    data() {
      return {
        popupVisible: false,
        currentValue: this.value
      };
    },
    watch: {
      value(val) {
        this.currentValue = val;
      }
    },
    computed: {
      displayValue(this: any) {
    if (this.type === 'year-month') {
      if (!this.value) {
        return '';
      }
      if (this.value instanceof Date) {
        const year = this.value.getFullYear();
        const month = this.value.getMonth() + 1;
        return year + '-' + (month < 10 ? ('0' + month) : month);
      }
    }
    return dateToString(this.value, this.type);
  },
  listeners() {
    const result = {};
    Object.keys(this.$listeners).forEach(event => {
      if (event !== 'input') {
        result[event] = this.$listeners[event];
      }
    });
    return result;
  }
  },
  methods: {
    toggle() {
      this.popupVisible = !this.popupVisible;
    },
    onInput(value) {
      this.currentValue = value;
    },
    cancel() {
      this.currentValue = this.value;
      this.popupVisible = false;
    },
    confirm() {
      this.$emit('input', this.currentValue);
      this.popupVisible = false;
    }
  }
  });

</script>
<style lang="less">
  .van-picker__cancel, .van-picker__confirm {
    height: 100%;
    padding: 0 16px;
    font-size: 14px;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
</style>
