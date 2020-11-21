<template >
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
<script lang="js">
import { dateToString } from 'vant/es/sku/utils/time-helper';
import Vue from 'vue';
export default Vue.extend({
  props: {
    title: {},
    value: {},
    type: String
  },
  data: function data() {
    return {
      popupVisible: false,
      currentValue: this.value
    };
  },
  watch: {
    value: function value(val) {
      this.currentValue = val;
    }
  },
  computed: {
    displayValue: function displayValue() {
      if (this.type === 'year-month') {
        if (!this.value) {
          return '';
        }

        if (this.value instanceof Date) {
          var year = this.value.getFullYear();
          var month = this.value.getMonth() + 1;
          return year + '-' + (month < 10 ? '0' + month : month);
        }
      }

      return dateToString(this.value, this.type);
    },
    listeners: function listeners() {
      var _this = this;

      var result = {};
      Object.keys(this.$listeners).forEach(function (event) {
        if (event !== 'input') {
          result[event] = _this.$listeners[event];
        }
      });
      return result;
    }
  },
  methods: {
    toggle: function toggle() {
      this.popupVisible = !this.popupVisible;
    },
    onInput: function onInput(value) {
      this.currentValue = value;
    },
    cancel: function cancel() {
      this.currentValue = this.value;
      this.popupVisible = false;
    },
    confirm: function confirm() {
      this.$emit('input', this.currentValue);
      this.popupVisible = false;
    }
  }
});
</script>
<style >
.van-picker__cancel, .van-picker__confirm {
  height: 100%;
  padding: 0 16px;
  font-size: 14px;
  background-color: transparent;
  border: none;
  cursor: pointer;
}
</style>