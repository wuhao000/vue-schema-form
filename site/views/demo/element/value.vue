<template>
  <div class="bg-white">
    <v-schema-form :effects="effects"
                   v-model="value"
                   :schema="schema"></v-schema-form>
    <el-button @click="setValue">
      完全赋值
    </el-button>
    <el-button @click="setValue2">
      局部赋值
    </el-button>
  </div>
</template>
<script lang="ts">
  import {EffectsContext} from '../../../../types';
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component({
    name: 'SetValue'
  })
  export default class SetValue extends Vue {
    public schema = {
      fields: {
        name: {
          type: 'string',
          title: '名称'
        }
      }
    };
    public value = {
      name: 'abc'
    };

    public created() {
      window.SchemaForm.registerElement();
    }

    public setValue() {
      this.value = {
        name: '直接对value赋值'
      };
    }

    public setValue2() {
      this.value.name = '只改变value的name属性';
    }

    public effects($: EffectsContext) {
      $(this.schema.fields.name).onFieldCreateOrChange(() => {

      });
    }
  }
</script>
<style lang="less" type="text/less">
</style>
