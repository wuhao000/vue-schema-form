<template>
  <div class="markdown-body">
    <pre><demo-wrapper>
<comp0></comp0>
<template #code><code-container>
&lt;template&gt;
  &lt;div&gt;
    &lt;simple-edit-demo :init="register"/&gt;
  &lt;/div&gt;
&lt;/template&gt;
&lt;script lang="ts"&gt;
  import {registerAntdMobile} from '../../../schema-form/antdm/register';
  import SimpleEditDemo from '../common/simple.vue';

  export default {
    components: {
      SimpleEditDemo
    },
    setup() {
      return {
        register: () =&gt; {
          registerAntdMobile();
        }
      };
    }
  };
&lt;/script&gt;
</code-container></template>
</demo-wrapper></pre>

  </div>
</template>
<script lang="ts" setup>
  import  comp0 from './comp0.vue';
</script>