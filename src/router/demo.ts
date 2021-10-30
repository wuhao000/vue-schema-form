import {RouteRecordRaw} from 'vue-router';
import RootComponent from '../components/root.vue';

export default [{
  path: '/demo/AntDesignVue',
  redirect: '/demo/AntDesignVue/jiandanchangjing',
  component: RootComponent,
  meta: {
    tags: [],
    name: 'Ant Design Vue'
  },
  children: [
    {
  path: '/demo/AntDesignVue/jiandanchangjing',
  component: () => import('../generated/demo/AntDesignVue/jiandanchangjing/index.vue'),
  meta: {
    tags: ['Ant Design Vue'],
    name: '简单场景'
  },
  children: [
    
  ]
},
{
  path: '/demo/AntDesignVue/biaodanxiangqing',
  component: () => import('../generated/demo/AntDesignVue/biaodanxiangqing/index.vue'),
  meta: {
    tags: ['Ant Design Vue'],
    name: '表单详情'
  },
  children: [
    
  ]
},
{
  path: '/demo/AntDesignVue/biaodanliandong',
  component: () => import('../generated/demo/AntDesignVue/biaodanliandong/index.vue'),
  meta: {
    tags: ['Ant Design Vue'],
    name: '表单联动'
  },
  children: [
    
  ]
},
{
  path: '/demo/AntDesignVue/biaodanxiaoyan',
  component: () => import('../generated/demo/AntDesignVue/biaodanxiaoyan/index.vue'),
  meta: {
    tags: ['Ant Design Vue'],
    name: '表单校验'
  },
  children: [
    
  ]
},
{
  path: '/demo/AntDesignVue/biaodanliebiao',
  component: () => import('../generated/demo/AntDesignVue/biaodanliebiao/index.vue'),
  meta: {
    tags: ['Ant Design Vue'],
    name: '表单列表'
  },
  children: [
    
  ]
},
{
  path: '/demo/AntDesignVue/dongtaibiaodan',
  component: () => import('../generated/demo/AntDesignVue/dongtaibiaodan/index.vue'),
  meta: {
    tags: ['Ant Design Vue'],
    name: '动态表单'
  },
  children: [
    
  ]
},
{
  path: '/demo/AntDesignVue/zidingyizujian',
  component: () => import('../generated/demo/AntDesignVue/zidingyizujian/index.vue'),
  meta: {
    tags: ['Ant Design Vue'],
    name: '自定义组件'
  },
  children: [
    
  ]
},
{
  path: '/demo/AntDesignVue/xuhao',
  component: () => import('../generated/demo/AntDesignVue/xuhao/index.vue'),
  meta: {
    tags: ['Ant Design Vue'],
    name: '序号'
  },
  children: [
    
  ]
}
  ]
}, {
  path: '/demo/AntDesignVueMobile',
  redirect: '/demo/AntDesignVueMobile/liebiao',
  component: RootComponent,
  meta: {
    tags: [],
    name: 'Ant Design Vue Mobile'
  },
  children: [
    {
  path: '/demo/AntDesignVueMobile/liebiao',
  component: () => import('../generated/demo/AntDesignVueMobile/liebiao/index.vue'),
  meta: {
    tags: ['Ant Design Vue Mobile'],
    name: '列表'
  },
  children: [
    
  ]
},
{
  path: '/demo/AntDesignVueMobile/fuzuoyonghanshu',
  component: () => import('../generated/demo/AntDesignVueMobile/fuzuoyonghanshu/index.vue'),
  meta: {
    tags: ['Ant Design Vue Mobile'],
    name: '副作用函数'
  },
  children: [
    
  ]
},
{
  path: '/demo/AntDesignVueMobile/dongtaibiaodan',
  component: () => import('../generated/demo/AntDesignVueMobile/dongtaibiaodan/index.vue'),
  meta: {
    tags: ['Ant Design Vue Mobile'],
    name: '动态表单'
  },
  children: [
    
  ]
},
{
  path: '/demo/AntDesignVueMobile/xiaoyan',
  component: () => import('../generated/demo/AntDesignVueMobile/xiaoyan/index.vue'),
  meta: {
    tags: ['Ant Design Vue Mobile'],
    name: '校验'
  },
  children: [
    
  ]
},
{
  path: '/demo/AntDesignVueMobile/jiandanbuju',
  component: () => import('../generated/demo/AntDesignVueMobile/jiandanbuju/index.vue'),
  meta: {
    tags: ['Ant Design Vue Mobile'],
    name: '简单布局'
  },
  children: [
    
  ]
},
{
  path: '/demo/AntDesignVueMobile/bianji',
  component: () => import('../generated/demo/AntDesignVueMobile/bianji/index.vue'),
  meta: {
    tags: ['Ant Design Vue Mobile'],
    name: '编辑'
  },
  children: [
    
  ]
},
{
  path: '/demo/AntDesignVueMobile/jiegoufuzhi',
  component: () => import('../generated/demo/AntDesignVueMobile/jiegoufuzhi/index.vue'),
  meta: {
    tags: ['Ant Design Vue Mobile'],
    name: '解构赋值'
  },
  children: [
    
  ]
},
{
  path: '/demo/AntDesignVueMobile/xiangqing',
  component: () => import('../generated/demo/AntDesignVueMobile/xiangqing/index.vue'),
  meta: {
    tags: ['Ant Design Vue Mobile'],
    name: '详情'
  },
  children: [
    
  ]
}
  ]
}, {
  path: '/demo/Element',
  redirect: '/demo/Element/liebiao',
  component: RootComponent,
  meta: {
    tags: [],
    name: 'Element'
  },
  children: [
    {
  path: '/demo/Element/liebiao',
  component: () => import('../generated/demo/Element/liebiao/index.vue'),
  meta: {
    tags: ['Element'],
    name: '列表'
  },
  children: [
    
  ]
},
{
  path: '/demo/Element/dongtaibiaodan',
  component: () => import('../generated/demo/Element/dongtaibiaodan/index.vue'),
  meta: {
    tags: ['Element'],
    name: '动态表单'
  },
  children: [
    
  ]
},
{
  path: '/demo/Element/xiaoyan',
  component: () => import('../generated/demo/Element/xiaoyan/index.vue'),
  meta: {
    tags: ['Element'],
    name: '校验'
  },
  children: [
    
  ]
},
{
  path: '/demo/Element/jiandanchangjing',
  component: () => import('../generated/demo/Element/jiandanchangjing/index.vue'),
  meta: {
    tags: ['Element'],
    name: '简单场景'
  },
  children: [
    
  ]
},
{
  path: '/demo/Element/liandong',
  component: () => import('../generated/demo/Element/liandong/index.vue'),
  meta: {
    tags: ['Element'],
    name: '联动'
  },
  children: [
    
  ]
},
{
  path: '/demo/Element/jiegou',
  component: () => import('../generated/demo/Element/jiegou/index.vue'),
  meta: {
    tags: ['Element'],
    name: '解构'
  },
  children: [
    
  ]
},
{
  path: '/demo/Element/xiangqing',
  component: () => import('../generated/demo/Element/xiangqing/index.vue'),
  meta: {
    tags: ['Element'],
    name: '详情'
  },
  children: [
    
  ]
}
  ]
}, {
  path: '/demo/zibiaodan',
  redirect: '/demo/zibiaodan/yidongduan',
  component: RootComponent,
  meta: {
    tags: [],
    name: '子表单'
  },
  children: [
    {
  path: '/demo/zibiaodan/yidongduan',
  component: () => import('../generated/demo/zibiaodan/yidongduan/index.vue'),
  meta: {
    tags: ['子表单'],
    name: '移动端'
  },
  children: [
    
  ]
},
{
  path: '/demo/zibiaodan/bianji',
  component: () => import('../generated/demo/zibiaodan/bianji/index.vue'),
  meta: {
    tags: ['子表单'],
    name: '编辑'
  },
  children: [
    
  ]
},
{
  path: '/demo/zibiaodan/xiangqing',
  component: () => import('../generated/demo/zibiaodan/xiangqing/index.vue'),
  meta: {
    tags: ['子表单'],
    name: '详情'
  },
  children: [
    
  ]
}
  ]
}, {
  path: '/demo/buju',
  redirect: '/demo/buju/fenbu',
  component: RootComponent,
  meta: {
    tags: [],
    name: '布局'
  },
  children: [
    {
  path: '/demo/buju/fenbu',
  component: () => import('../generated/demo/buju/fenbu/index.vue'),
  meta: {
    tags: ['布局'],
    name: '分步'
  },
  children: [
    
  ]
},
{
  path: '/demo/buju/kapian',
  component: () => import('../generated/demo/buju/kapian/index.vue'),
  meta: {
    tags: ['布局'],
    name: '卡片'
  },
  children: [
    
  ]
},
{
  path: '/demo/buju/qiantao',
  component: () => import('../generated/demo/buju/qiantao/index.vue'),
  meta: {
    tags: ['布局'],
    name: '嵌套'
  },
  children: [
    
  ]
},
{
  path: '/demo/buju/shuzu',
  component: () => import('../generated/demo/buju/shuzu/index.vue'),
  meta: {
    tags: ['布局'],
    name: '数组'
  },
  children: [
    
  ]
},
{
  path: '/demo/buju/wenbenchuanlian',
  component: () => import('../generated/demo/buju/wenbenchuanlian/index.vue'),
  meta: {
    tags: ['布局'],
    name: '文本串联'
  },
  children: [
    
  ]
},
{
  path: '/demo/buju/zhage',
  component: () => import('../generated/demo/buju/zhage/index.vue'),
  meta: {
    tags: ['布局'],
    name: '栅格'
  },
  children: [
    
  ]
},
{
  path: '/demo/buju/denglu',
  component: () => import('../generated/demo/buju/denglu/index.vue'),
  meta: {
    tags: ['布局'],
    name: '登录'
  },
  children: [
    
  ]
},
{
  path: '/demo/buju/jiandan',
  component: () => import('../generated/demo/buju/jiandan/index.vue'),
  meta: {
    tags: ['布局'],
    name: '简单'
  },
  children: [
    
  ]
},
{
  path: '/demo/buju/xianxing',
  component: () => import('../generated/demo/buju/xianxing/index.vue'),
  meta: {
    tags: ['布局'],
    name: '线性'
  },
  children: [
    
  ]
}
  ]
}, {
  path: '/demo/texing',
  redirect: '/demo/texing/shijianchuli',
  component: RootComponent,
  meta: {
    tags: [],
    name: '特性'
  },
  children: [
    {
  path: '/demo/texing/shijianchuli',
  component: () => import('../generated/demo/texing/shijianchuli/index.vue'),
  meta: {
    tags: ['特性'],
    name: '事件处理'
  },
  children: [
    
  ]
},
{
  path: '/demo/texing/qiyongjinyong',
  component: () => import('../generated/demo/texing/qiyongjinyong/index.vue'),
  meta: {
    tags: ['特性'],
    name: '启用禁用'
  },
  children: [
    
  ]
},
{
  path: '/demo/texing/duixiangshuzu',
  component: () => import('../generated/demo/texing/duixiangshuzu/index.vue'),
  meta: {
    tags: ['特性'],
    name: '对象数组'
  },
  children: [
    
  ]
},
{
  path: '/demo/texing/anniu',
  component: () => import('../generated/demo/texing/anniu/index.vue'),
  meta: {
    tags: ['特性'],
    name: '按钮'
  },
  children: [
    
  ]
},
{
  path: '/demo/texing/zidingyizujian',
  component: () => import('../generated/demo/texing/zidingyizujian/index.vue'),
  meta: {
    tags: ['特性'],
    name: '自定义组件'
  },
  children: [
    
  ]
},
{
  path: '/demo/texing/biaodanxiaoyan',
  component: () => import('../generated/demo/texing/biaodanxiaoyan/index.vue'),
  meta: {
    tags: ['特性'],
    name: '表单校验'
  },
  children: [
    
  ]
},
{
  path: '/demo/texing/jiegoufuzhi',
  component: () => import('../generated/demo/texing/jiegoufuzhi/index.vue'),
  meta: {
    tags: ['特性'],
    name: '解构赋值'
  },
  children: [
    
  ]
},
{
  path: '/demo/texing/morenzhi',
  component: () => import('../generated/demo/texing/morenzhi/index.vue'),
  meta: {
    tags: ['特性'],
    name: '默认值'
  },
  children: [
    
  ]
}
  ]
}, {
  path: '/demo/zujian',
  redirect: '/demo/zujian/xialakuang',
  component: RootComponent,
  meta: {
    tags: [],
    name: '组件'
  },
  children: [
    {
  path: '/demo/zujian/xialakuang',
  component: () => import('../generated/demo/zujian/xialakuang/index.vue'),
  meta: {
    tags: ['组件'],
    name: '下拉框'
  },
  children: [
    
  ]
},
{
  path: '/demo/zujian/tupian',
  component: () => import('../generated/demo/zujian/tupian/index.vue'),
  meta: {
    tags: ['组件'],
    name: '图片'
  },
  children: [
    
  ]
},
{
  path: '/demo/zujian/fuxuankuang',
  component: () => import('../generated/demo/zujian/fuxuankuang/index.vue'),
  meta: {
    tags: ['组件'],
    name: '复选框'
  },
  children: [
    
  ]
},
{
  path: '/demo/zujian/anniu',
  component: () => import('../generated/demo/zujian/anniu/index.vue'),
  meta: {
    tags: ['组件'],
    name: '按钮'
  },
  children: [
    
  ]
},
{
  path: '/demo/zujian/wenjian',
  component: () => import('../generated/demo/zujian/wenjian/index.vue'),
  meta: {
    tags: ['组件'],
    name: '文件'
  },
  children: [
    
  ]
},
{
  path: '/demo/zujian/shijianxuanzeqi',
  component: () => import('../generated/demo/zujian/shijianxuanzeqi/index.vue'),
  meta: {
    tags: ['组件'],
    name: '时间选择器'
  },
  children: [
    
  ]
},
{
  path: '/demo/zujian/wangge',
  component: () => import('../generated/demo/zujian/wangge/index.vue'),
  meta: {
    tags: ['组件'],
    name: '网格'
  },
  children: [
    
  ]
},
{
  path: '/demo/zujian/biaodan',
  component: () => import('../generated/demo/zujian/biaodan/index.vue'),
  meta: {
    tags: ['组件'],
    name: '表单'
  },
  children: [
    
  ]
}
  ]
}] as RouteRecordRaw[];
