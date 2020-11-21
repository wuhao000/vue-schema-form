import { shallowMount } from '@vue/test-utils';
import DUpload from "../upload.vue";
import Vue from 'vue';
import { Icon, Upload } from 'ant-design-vue';
Vue.use(Icon);
Vue.use(Upload);
describe('Upload', function () {
  it('拖拽上传', function () {
    var wrapper = shallowMount(DUpload, {
      propsData: {
        listType: 'dragger'
      }
    });
    expect(wrapper.text()).toEqual('点击或者拖动文件到虚线框内上传');
  });
  it('card或picture模式', function () {
    var wrapper = shallowMount(DUpload, {
      propsData: {
        listType: 'card'
      }
    });
    expect(wrapper.text()).toEqual('选择文件');
    wrapper.setProps({
      listType: 'picture-card'
    });
    expect(wrapper.text()).toEqual('选择文件');
  });
});