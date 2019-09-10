<template>
  <el-button v-bind="this.$attrs"
             @click="onClick">
    {{title}}
  </el-button>
</template>
<script lang="ts">
  import {EffectsContext} from '@/types/form';
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import {Inject, Prop} from 'vue-property-decorator';
  import {SchemaFormStore} from '../internal/utils';

  @Component({
    name: 'AntdButton'
  })
  export default class AntdButton extends Vue {
    @Prop()
    public action: (context: EffectsContext, event) => any;
    @Prop()
    public title: string;
    @Inject('store')
    public store: SchemaFormStore;

    public onClick(e) {
      if (this.action) {
        this.action(this.store.context, e);
      }
    }
  }
</script>
