<template>
  <div class="ant-url-input">
    <d-input-group compact>
      <d-select v-model="protocol"
                placeholder="请选择"
                :disabled="disabled"
                :options="options">
      </d-select>
      <d-input v-model="domain"
               class="input-with-select"
               placeholder="请输入内容"
               style="display:inline-block;width: 50%"
               :disabled="disabled">
      </d-input>
    </d-input-group>
  </div>
</template>
<script lang="ts">
  import BaseUrl from '../common/url';

  export default {
    name: 'DUrlInput',
    mixins: [BaseUrl]
  };
</script>
