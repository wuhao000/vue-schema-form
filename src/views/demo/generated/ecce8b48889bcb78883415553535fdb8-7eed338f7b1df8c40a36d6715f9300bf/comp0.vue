<template>
  <v-schema-form v-model:value="value"
                 :props="props"
                 :schema="definition"
                 class="demo-form"
                 platform="mobile"></v-schema-form>
  <van-button block
              @click="dialogVisible = true">查看数据
  </van-button>
  <van-popup v-model:show="dialogVisible">
    <div style="padding: 20px;">
      <pre>{{ value }}</pre>
    </div>
  </van-popup>
</template>
<script lang="tsx">
  import {registerAntdMobile} from '../../../../schema-form';
  import {computed, ref} from 'vue';
  import {getProps} from '../../utils';
  registerAntdMobile();

  export default {
    setup() {
      const options = [
        {
          value: 'zhejiang',
          label: '浙江',
          isLeaf: false,
          loading: false,
          children: [{
            label: '杭州', value: 'hz'
          }, {
            label: '温州', value: 'wz'
          }]
        }, {
          value: 'jiangsu',
          label: '江苏',
          isLeaf: false,
          loading: false,
          children: [{
            label: '南京', value: 'nj',
            children: [{
              label: '鼓楼区', value: 'gl'
            }, {
              label: '玄武区', value: 'xw'
            }]
          }, {
            label: '苏州', value: 'sz'
          }]
        }];
      const dialogVisible = ref(false);
      const date1 = ref(new Date());
      return {
        date1,
        onConfirm(v) {
          date1.value = v;
        },
        options,
        dialogVisible,
        props: getProps(),
        value: {
          start: new Date(),
          end: new Date()
        },
        definition: computed(() => {
          return {
            fields: {
              '[start, end]': {
                type: 'daterange',
                title: '时间范围'
              },
              '[province,city,town]': {
                type: 'cascader',
                title: '省市区',
                placeholder: '请选择',
                enum: options
              }
            }
          };
        })
      };
    }
  };
</script>