<template>
  <div class="d-time-range-picker">
    <time-picker :format="format"
                 :allow-clear="clearable || $attrs.allowClear"
                 :placeholder="placeholder[0]"
                 v-bind="$attrs"
                 v-model="stateValue[0]"></time-picker>
    <span class="d-time-range-picker-separator">{{ separator }}</span>
    <time-picker :format="format"
                 :allow-clear="clearable || $attrs.allowClear"
                 :placeholder="placeholder[1]"
                 v-bind="$attrs"
                 v-model="stateValue[1]"></time-picker>
  </div>
</template>
<script lang="tsx">
  import Component from 'vue-class-component';
  import {Model, Prop, Watch} from 'vue-property-decorator';
  import BaseFormComponent from '../mixins/base-input-component';
  import TimePicker from './time-picker';

  @Component({
    components: {
      TimePicker
    }
  })
  export default class DTimeRangePicker extends BaseFormComponent {
    public static install: (Vue) => void;
    @Prop({type: String, default: '-'})
    public separator: string;
    @Model('change')
    public value: any;
    @Prop({type: Boolean, default: false})
    public clearable: boolean;
    @Prop({type: Array, default: () => ['开始时间', '结束时间']})
    public placeholder: string[];
    @Prop({type: String, default: 'HH:mm:ss'})
    public format: string;

    public convertValue(value: Array<Date | number>): any {
      if (!value) {
        return [null, null];
      }
      return value;
    }

    public convertValueBack(value: any): any {
      return value;
    }

    public getProps() {
      return {
        allowClear: this.$attrs.allowClear !== undefined ? this.$attrs.allowClear : this.clearable
      };
    }

    @Watch('value')
    public valueChanged(value: any) {
      const convertValue = this.convertValue(value);
      if (this.stateValue === null || this['stateValue'] === undefined) {
        this.stateValue = convertValue;
      } else if (!convertValue) {
        this.stateValue = [];
      } else {
        if (this.stateValue.toString() !== convertValue.toString()) {
          this.stateValue = convertValue;
        }
      }
    }

  }
</script>
<style lang="less">
  .d-time-range-picker {
    display: flex;
    align-items: center;
    &-separator {
      padding: 0 10px;
    }
  }
</style>
