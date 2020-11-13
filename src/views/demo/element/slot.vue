<template>
  <div class="bg-white">
    <v-schema-form :effects="effects"
                   :schema="schema">
      <div slot="header">
        {{header}}
      </div>
      <div slot="middle">
        {{middle}}
      </div>
      <div slot="footer">
        {{footer}}
      </div>
    </v-schema-form>
    <el-button @click="setValue">
      赋值
    </el-button>
  </div>
</template>
<script lang="ts">
  import SchemaForm from '@/schema-form';
  import {EffectsContext} from 'types';
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component({
    name: 'SlotDemo'
  })
  export default class SlotDemo extends Vue {
    public footer = '';
    public header = '';
    public middle = '22';
    public schema = {
      fields: {
        name: {
          type: 'string',
          title: '名称'
        },
        middle: {
          slot: 'middle'
        }
      }
    };

    public created() {
      SchemaForm.registerElement();
    }

    public effects($: EffectsContext) {
      $(this.schema.fields.name).onFieldCreateOrChange((v) => {

      });
    }

    public setValue() {
      this.header = 'this is header';
      this.middle = 'this is middle';
      this.footer = 'this is footer';
    }
  }
</script>
<style scoped>
</style>
