<template>
  <div>{{ value }}</div>
</template>
<script lang="tsx">
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
    created() {
      const $ = this['store'].context;
      $('*').onFieldCreateOrChange(value => {
        const v = $.getValue();
        console.log(v);
        console.log(this['formValue']);
      });
    }
  });
</script>
