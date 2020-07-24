<template>
  <div style="width: 600px"
       class="bg-white">
    {{value}}
    <v-schema-form :schema="schema"
                   v-model="value"/>
    <a-mentions rows="3"
                placeholder="You can use @ to ref user here"
    >
      <a-mentions-option value="afc163">
        afc163
      </a-mentions-option>
      <a-mentions-option value="zombieJ">
        zombieJ
      </a-mentions-option>
      <a-mentions-option value="yesmeck">
        yesmeck
      </a-mentions-option>
    </a-mentions>
  </div>
</template>
<script lang="ts">
  import SchemaForm from '@/index';
  import Vue from 'vue';

  export default Vue.extend({
    data() {
      return {
        value: null,
        users: [],
        showUserList: false,
        schema: {
          fields: {
            obj: {
              type: 'object',
              fields: {
                'name.value': {
                  type: 'text',
                  title: '名称'
                }
              }
            }
          }
        }
      };
    },
    computed: {
      align() {
        return {
          offset: [-200, 0]
        };
      }
    },
    methods: {
      onInput(e) {
        console.log(e);
        if (e.data === '@') {
          this.showUserList = true;
        }
      }
    },
    created() {
      SchemaForm.registerAntd();
    }
  });
</script>
<style lang="less">
  .flow-steps {
    .flow-step {
      .am-steps-item-tail, .am-steps-item-icon {
        margin-top: 15px;
      }

      .flow-step-title {
      }

      .flow-step-subtitle {
        color: gray;
        font-size: 80%;
      }
    }
  }
</style>
