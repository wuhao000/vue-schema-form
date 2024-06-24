import {ref} from "vue";
import {EffectsContext} from "../../../types";

export const useDynamicForm = () => {
  const getDefaultBean = () => {
    return {
      name: '',
    };
  };
  const model = ref<any>(getDefaultBean());
  const quickAddMode = ref(false);
  const effects = ($: EffectsContext) => {
    if (!quickAddMode.value) {
      $('order', 'iconType', 'color', 'extras').show();
    }
    $('name').subscribe('fieldKeydown', (p) => {
      const e = p.event;
      if (e.key === 'Enter') {
        console.log('enter');
      }
    });
  };
  const schema = {
    props: {
      labelWidth: '150px',
      labelCol: {span: 4},
      wrapperCol: {span: 12},
      rules: {
        name: [{required: true, message: '请输入名称'}],
        code: [{required: true, message: '请输入编码'}]
      }
    },
    fields: [{
      type: 'string',
      property: 'name',
      title: '名称'
    }, {
      type: 'integer',
      property: 'age',
      title: '年龄'
    }, {
      type: 'button',
      title: '',
      events: {
        onClick: () => {
          loadData();
        }
      },
      props: {
        title: '加载数据并添加一个字段'
      }
    }]
  };

  const loadData = () => {
    model.value = {
      name: '前端开发工程师',
      age: 22
    };
    schema.fields.push({
      type: 'date',
      property: 'birthday',
      title: '生日'
    })
  };
  return {
    schema,
    getDefaultBean,
    quickAddMode,
    effects,
    loadData,
    model
  }
}