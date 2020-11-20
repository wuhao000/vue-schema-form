<template >
<div>{{ value }}</div>
</template>
<script lang="js">
import Vue from 'vue';
export default Vue.extend({
  props: {
    value: {}
  },
  inject: {
    field: {
      from: '_field'
    },
    store: {
      from: 'store'
    },
    formValue: {
      from: '_form_value'
    }
  },
  created: function created() {
    var _this = this;

    var $ = this['store'].context;
    $('*').onFieldCreateOrChange(function (value) {
      var v = $.getValue();
      console.log(v);
      console.log(_this['formValue']);
    });
  }
});
</script>
