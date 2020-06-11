<template>
  <ae-layout class="bg-white wrapper">
    <ae-layout-content>
      <d-button @click="changeAge">修改年龄</d-button>
      <v-schema-form v-model="value"
                     :schema="schema">
        <template slot="age"
                  slot-scope="data">
          {{data}}
        </template>
        <template slot="sex">
          222
        </template>
      </v-schema-form>
    </ae-layout-content>
  </ae-layout>
</template>
<script lang="ts">
  import SchemaForm from '@/schema-form';
  import Vue from 'vue';

  export default Vue.extend({
    data() {
      return {
        value: {
          name: ['222'],
          age: 22,
          sex: '1'
        },
        schema: {
          props: {
            labelWidth: '150px'
          },
          fields: {
            name: {
              type: 'string',
              array: true,
              title: '标题',
              props: {
                addBtnProps: {
                  text: true
                }
              }
            },
            age: {
              slot: 'age',
              title: '年龄'
            },
            sex: {
              slot: 'sex',
              title: '性别'
            }
          }
        }
      };
    },
    beforeCreate() {
      SchemaForm.registerAntd();
    },
    methods: {
      changeAge() {
        this.value.age = 42;
      }
    }
  });
</script>
