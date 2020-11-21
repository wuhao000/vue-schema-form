<template >
<div class="van-daterange">
  <van-cell @click="toggle"
            :title="title">
    <span style="padding-right: 15px;">{{displayValue[0]}}</span>
    -
    <span style="padding-left: 15px;">{{displayValue[1]}}</span>
  </van-cell>
  <van-popup close-on-popstate
             v-model="popupVisible"
             position="bottom">
    <van-datetime-picker :type="type"
                         @confirm="confirm"
                         @cancel="cancel"
                         :value="currentValue[0]"
                         class="van-daterange-start"
                         @input="onInput($event, 0)"
                         title="开始时间"/>
    <van-datetime-picker :type="type"
                         :value="currentValue[1]"
                         class="van-daterange-end"
                         @input="onInput($event, 1)"
                         title="结束时间"/>
  </van-popup>
</div>
</template>
<script lang="js">
import { dateToString } from 'vant/es/sku/utils/time-helper';
import Vue from 'vue';

function formatMonth(value) {
  var year = value.getFullYear();
  var month = value.getMonth() + 1;
  return year + '-' + (month < 10 ? '0' + month : month);
}

export default Vue.extend({
  name: 'VanDateRange',
  props: {
    title: {},
    value: {
      type: Array
    },
    type: String
  },
  data: function data() {
    return {
      popupVisible: false,
      currentValue: this.value && [null, null]
    };
  },
  watch: {
    value: function value(val) {
      this.currentValue = val;
    }
  },
  computed: {
    displayValue: function displayValue() {
      var _this = this;

      if (this.type === 'year-month') {
        if (!this.value || !this.value.length) {
          return [];
        }

        if (this.value instanceof Date) {
          return this.value.map(function (it) {
            return formatMonth(it);
          });
        }
      }

      return this.value.map(function (it) {
        return dateToString(it, _this.type);
      });
    },
    listeners: function listeners() {
      var _this2 = this;

      var result = {};
      Object.keys(this.$listeners).forEach(function (event) {
        if (event !== 'input') {
          result[event] = _this2.$listeners[event];
        }
      });
      return result;
    }
  },
  methods: {
    toggle: function toggle() {
      this.popupVisible = !this.popupVisible;
    },
    cancel: function cancel() {
      this.currentValue = this.value && [null, null];
      this.popupVisible = false;
    },
    confirm: function confirm() {
      this.$emit('input', this.currentValue);
      this.popupVisible = false;
    },
    onInput: function onInput(date, index) {
      this.currentValue[index] = date;
    }
  }
});
</script>
<style >
.van-daterange {
  .van-daterange-end {
    .van-picker__toolbar {
      .van-picker__cancel, .van-picker__confirm {
        display: none;
      }
    }
  }

  .van-picker__toolbar {
    display: flex;
    justify-content: space-around;

    .van-picker__cancel, .van-picker__confirm {
      height: 100%;
      padding: 0 16px;
      font-size: 14px;
      background-color: transparent;
      border: none;
      cursor: pointer;
    }
  }
}
</style>