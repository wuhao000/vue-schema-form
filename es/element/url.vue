<template>
  <el-input v-model="domain"
            class="input-with-select"
            placeholder="请输入内容"
            :disabled="disabled">
    <el-select v-model="protocol"
               placeholder="请选择"
               slot="prepend"
               style="width: 100px;"
               :disabled="disabled">
      <el-option v-for="p in protocols"
                 :key="p"
                 :label="p + '://'"
                 :value="p"></el-option>
    </el-select>
  </el-input>
</template>
<script lang="ts">
  import BaseUrl from '../common/url';

  export default {
    name: 'ElUrlInput',
    mixins: [BaseUrl]
  };
</script>
