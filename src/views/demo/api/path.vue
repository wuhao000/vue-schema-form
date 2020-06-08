<template>
  <a-layout>
    <a-layout-content>
      <v-schema-form :effects="effects"
                     :schema="schema"></v-schema-form>
    </a-layout-content>
  </a-layout>
</template>
<script lang="ts">
  import SchemaForm from '@/index';
  import {EffectsContext} from 'v-schema-form-types';
  import {Options, Vue} from 'vue-class-component';

  @Options({
    name: 'ApiPath'
  })
  export default class ApiPath extends Vue {

    public schema = {
      props: {
        labelCol: 6,
        wrapperCol: 12
      },
      fields: {
        detail: {
          type: 'object',
          fields: {
            name: {
              id: 'name',
              type: 'string',
              title: '名称'
            },
            age: {
              id: 'age',
              type: 'integer',
              title: '年龄'
            }
          }
        }
      }
    };

    public created() {
      SchemaForm.registerAntd();
    }

    public effects($: EffectsContext) {
      $('#age').onFieldCreateOrChange((v, p) => {
        console.log(v + '/' + p);
      });
      $('detail.age').onFieldCreateOrChange((v, p) => {
        console.log(v + '/' + p);
      });
    }
  }
</script>
