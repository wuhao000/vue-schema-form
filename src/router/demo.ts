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
  path: '/demo/AntDesignVue/morenzhi',
  component: () => import('../generated/demo/AntDesignVue/morenzhi/index.vue'),
  meta: {
    tags: ['Ant Design Vue'],
    name: '默认值'
  },
  children: [
    
  ]
}
  ]
}, {
  path: '/demo/AntDesignVueMobile',
  redirect: '/demo/AntDesignVueMobile/jiandanbuju',
  component: RootComponent,
  meta: {
    tags: [],
    name: 'Ant Design Vue Mobile'
  },
  children: [
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
  path: '/demo/AntDesignVueMobile/xiangqingmoshi',
  component: () => import('../generated/demo/AntDesignVueMobile/xiangqingmoshi/index.vue'),
  meta: {
    tags: ['Ant Design Vue Mobile'],
    name: '详情模式'
  },
  children: [
    
  ]
},
{
  path: '/demo/AntDesignVueMobile/shujuxiaoyan',
  component: () => import('../generated/demo/AntDesignVueMobile/shujuxiaoyan/index.vue'),
  meta: {
    tags: ['Ant Design Vue Mobile'],
    name: '数据校验'
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
  path: '/demo/AntDesignVueMobile/duixiangliebiao',
  component: () => import('../generated/demo/AntDesignVueMobile/duixiangliebiao/index.vue'),
  meta: {
    tags: ['Ant Design Vue Mobile'],
    name: '对象列表'
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
  path: '/demo/Vant',
  redirect: '/demo/Vant/jiandanbuju',
  component: RootComponent,
  meta: {
    tags: [],
    name: 'Vant'
  },
  children: [
    {
  path: '/demo/Vant/jiandanbuju',
  component: () => import('../generated/demo/Vant/jiandanbuju/index.vue'),
  meta: {
    tags: ['Vant'],
    name: '简单布局'
  },
  children: [
    
  ]
},
{
  path: '/demo/Vant/xiangqingmoshi',
  component: () => import('../generated/demo/Vant/xiangqingmoshi/index.vue'),
  meta: {
    tags: ['Vant'],
    name: '详情模式'
  },
  children: [
    
  ]
},
{
  path: '/demo/Vant/shujuxiaoyan',
  component: () => import('../generated/demo/Vant/shujuxiaoyan/index.vue'),
  meta: {
    tags: ['Vant'],
    name: '数据校验'
  },
  children: [
    
  ]
},
{
  path: '/demo/Vant/fuzuoyonghanshu',
  component: () => import('../generated/demo/Vant/fuzuoyonghanshu/index.vue'),
  meta: {
    tags: ['Vant'],
    name: '副作用函数'
  },
  children: [
    
  ]
},
{
  path: '/demo/Vant/dongtaibiaodan',
  component: () => import('../generated/demo/Vant/dongtaibiaodan/index.vue'),
  meta: {
    tags: ['Vant'],
    name: '动态表单'
  },
  children: [
    
  ]
},
{
  path: '/demo/Vant/jiegoufuzhi',
  component: () => import('../generated/demo/Vant/jiegoufuzhi/index.vue'),
  meta: {
    tags: ['Vant'],
    name: '解构赋值'
  },
  children: [
    
  ]
},
{
  path: '/demo/Vant/duixiangliebiao',
  component: () => import('../generated/demo/Vant/duixiangliebiao/index.vue'),
  meta: {
    tags: ['Vant'],
    name: '对象列表'
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
  path: '/demo/buju/xianxing',
  component: () => import('../generated/demo/buju/xianxing/index.vue'),
  meta: {
    tags: ['布局'],
    name: '线性'
  },
  children: [
    
  ]
},
{
  path: '/demo/buju/biaoge',
  component: () => import('../generated/demo/buju/biaoge/index.vue'),
  meta: {
    tags: ['布局'],
    name: '表格'
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
  path: '/demo/texing/shuzu',
  component: () => import('../generated/demo/texing/shuzu/index.vue'),
  meta: {
    tags: ['特性'],
    name: '数组'
  },
  children: [
    
  ]
},
{
  path: '/demo/texing/luojikongzhi',
  component: () => import('../generated/demo/texing/luojikongzhi/index.vue'),
  meta: {
    tags: ['特性'],
    name: '逻辑控制'
  },
  children: [
    
  ]
},
{
  path: '/demo/texing/zhongzhi',
  component: () => import('../generated/demo/texing/zhongzhi/index.vue'),
  meta: {
    tags: ['特性'],
    name: '重置'
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
  path: '/demo/texing/xiangqingmoshi',
  component: () => import('../generated/demo/texing/xiangqingmoshi/index.vue'),
  meta: {
    tags: ['特性'],
    name: '详情模式'
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
  path: '/demo/texing/yibujiazaixuanxiang',
  component: () => import('../generated/demo/texing/yibujiazaixuanxiang/index.vue'),
  meta: {
    tags: ['特性'],
    name: '异步加载选项'
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
},
{
  path: '/demo/texing/xuhao',
  component: () => import('../generated/demo/texing/xuhao/index.vue'),
  meta: {
    tags: ['特性'],
    name: '序号'
  },
  children: [
    
  ]
}
  ]
}] as RouteRecordRaw[];
