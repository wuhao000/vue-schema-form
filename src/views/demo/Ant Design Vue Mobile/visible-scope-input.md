```vue

<template>
  <a-layout>
    <a-layout-content>
      <span
          v-if="display"
          v-text="content"></span>
      <a-form-item
          v-else-if="$attrs.title"
          :label="$attrs.title">
        <d-input
            v-if="selectType === 'input'"
            read-only
            style="cursor:pointer"
            :placeholder="$attrs.placeholder"
            :value="content"
            @click="showMemberSelect = true"/>
      </a-form-item>
      <d-input
          v-else-if="selectType === 'input'"
          read-only
          style="cursor:pointer"
          :placeholder="$attrs.placeholder"
          :value="content"
          @click="showMemberSelect = true"/>
      <template v-else-if="selectType === 'button'">
        <a-button
            type="primary"
            @click="showMemberSelect = true"
            v-text="btnText">
        </a-button>
        <div>
          <ul class="member-list">
            <li
                v-for="department in displayValue.departments"
                :key="department.id">
              <a-icon
                  class="icon"
                  type="folder"></a-icon>
              <span>{{ department.name }}</span>
              <a-icon
                  class="btn close-btn"
                  type="close-circle"
                  @click="removeDepartment(department)"></a-icon>
            </li>
          </ul>
          <ul class="member-list">
            <li
                v-for="user in displayValue.users"
                :key="user.id">
              <img
                  alt=""
                  class="icon avatar avatar--mini"
                  :src="user.avatar"/>
              <span>{{ user.name }}</span>
              <a-icon
                  class="btn close-btn"
                  type="close-circle"
                  @click="removeUser(user)"></a-icon>
            </li>
          </ul>
        </div>
      </template>
    </a-layout-content>
  </a-layout>
</template>
```
