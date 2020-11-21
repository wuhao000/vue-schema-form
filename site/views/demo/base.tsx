import {getFormDefinition, getProps, getValue} from './utils';

import Vue from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';

@Component({
  name: 'BaseDemo'
})
export default class BaseDemo extends Vue {

  @Prop({type: String, default: 'desktop'})
  public platform: string;
  @Prop(Function)
  public init: () => any;
  public props = getProps();
  public value: any = getValue();
  public options = {
    disabled: false,
    loading: false,
    readonly: false,
    displayMode: false,
    sticky: false,
    mobile: false
  };

  public created() {
    if (this.init) {
      this.init();
    }
    window.ondevicelight = () => {
      console.log(1);
    };
    window.ondevicemotion = () => {
      console.log(2);
    };
    window.ondeviceorientation = () => {
      console.log(3);
    };
    window.onresize = () => {
      console.log(window.outerHeight + '/' + window.outerWidth);
    };
  }

  public optionFormDefinition = {
    title: '选项',
    props: {
      inline: true,
      title: '选项'
    },
    fields: [{
      title: '禁用', type: 'boolean', property: 'disabled'
    }, {
      title: '加载中', type: 'boolean', property: 'loading'
    }, {
      title: '详情模式', type: 'boolean', property: 'displayMode'
    }, {
      title: '固定模式', type: 'boolean', property: 'sticky'
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
