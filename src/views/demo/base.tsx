import {getFormDefinition, getProps, getValue} from '@/views/demo/utils';

import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  name: 'Base'
})
export default class Base extends Vue {
  public props = getProps();
  public value: any = getValue();
  public options = {
    disabled: false,
    loading: false,
    readonly: false,
    displayMode: false
  };

  public optionFormDefinition = {
    fields: [{
      title: '禁用', type: 'boolean', property: 'disabled'
    }, {
      title: '加载中', type: 'boolean', property: 'loading'
    }, {
      title: '只读', type: 'boolean', property: 'readonly'
    }, {
      title: '详情模式', type: 'boolean', property: 'displayMode'
    }]
  };

  get definition() {
    return getFormDefinition();
  }

  public onOk() {
    // @ts-ignore
    this.$message.success('ok clicked');
  }

  public onReset() {
    // @ts-ignore
    this.$message.error('reset click');
  }

  public onCancel() {
    // @ts-ignore
    this.$message.warning('cancel clicked');
  }
}
