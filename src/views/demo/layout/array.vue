<template>
  <a-layout class="bg-white wrapper">
    <a-layout-content>
      <a-button @click="changeAge">修改年龄</a-button>
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
    </a-layout-content>
  </a-layout>
</template>
<script lang="ts">
  import SchemaForm from '@/schema-form';
  import Vue from 'vue';
  import {SchemaFormField} from '../../../../types';

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
              arrayProps: {
                gutter: 0,
                deleteBtnWrapperProps: {
                  width: '80px',
                  style: {
                    marginBottom: '10px'
                  }
                },
                itemProps: {
                  style: {
                    marginBottom: '10px'
                  }
                }
              },
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
        } as SchemaFormField
      };
    },
    beforeCreate() {
      SchemaForm.registerElement();
    },
    methods: {
      changeAge() {
        this.value.age = 42;
      }
    }
  });
</script>
