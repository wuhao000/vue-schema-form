<template>
  <div class="markdown-body">
    <pre>
      <demo-wrapper>
        <comp0></comp0>
        <template #code><code-container>&lt;template&gt; &lt;a-layout&gt; &lt;a-layout-content&gt; &lt;span v-if="display"
          v-text="content"&gt;&lt;/span&gt; &lt;a-form-item v-else-if="$attrs.title"
          :label="$attrs.title"&gt; &lt;d-input v-if="selectType === 'input'" read-only
          style="cursor:pointer" :placeholder="$attrs.placeholder" :value="content"
          @click="showMemberSelect = true"/&gt; &lt;/a-form-item&gt; &lt;d-input
          v-else-if="selectType === 'input'" read-only style="cursor:pointer" :placeholder="$attrs.placeholder"
          :value="content" @click="showMemberSelect = true"/&gt; &lt;template v-else-if="selectType
          === 'button'"&gt; &lt;a-button type="primary" @click="showMemberSelect
          = true" v-text="btnText"&gt; &lt;/a-button&gt; &lt;div&gt; &lt;ul class="member-list"&gt;
          &lt;li v-for="department in displayValue.departments" :key="department.id"&gt;
          &lt;a-icon class="icon" type="folder"&gt;&lt;/a-icon&gt; &lt;span&gt;{{
          department.name }}&lt;/span&gt; &lt;a-icon class="btn close-btn" type="close-circle"
          @click="removeDepartment(department)"&gt;&lt;/a-icon&gt; &lt;/li&gt; &lt;/ul&gt;
          &lt;ul class="member-list"&gt; &lt;li v-for="user in displayValue.users"
          :key="user.id"&gt; &lt;img alt="" class="icon avatar avatar--mini" :src="user.avatar"/&gt;
          &lt;span&gt;{{ user.name }}&lt;/span&gt; &lt;a-icon class="btn close-btn"
          type="close-circle" @click="removeUser(user)"&gt;&lt;/a-icon&gt; &lt;/li&gt;
          &lt;/ul&gt; &lt;/div&gt; &lt;/template&gt; &lt;/a-layout-content&gt; &lt;/a-layout&gt;
          &lt;/template&gt;</code-container></template>
      </demo-wrapper>
    </pre>
  </div>
</template>
<script lang="ts" setup>
  import  comp0 from './comp0.vue';
</script>