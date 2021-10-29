```vue
<template>
  <div>
    <v-schema-form
        v-model:value="editForm"
        :schema="editSchema"
        :effects="editFormEffects">
    </v-schema-form>
    <a-button @click="edit">编辑</a-button>
    <v-schema-form
        v-model:value="value"
        :effects="effects"
        :schema="schema"/>
    <pre>{{ value }}</pre>
  </div>
</template>
<script lang="ts">
  import {defineComponent, reactive, ref} from 'vue';
  import {SchemaFormField} from '../../../../types';
  import {FieldTypes, registerAntd} from '../../../schema-form';

  export const familyInfoFields: SchemaFormField[] = [{
    property: 'name',
    type: 'string',
    title: '姓名',
    default: '张三'
  }, {
    property: 'age',
    title: '年龄',
    type: 'integer',
    default: 18,
    visible: false
  }, {
    property: 'sex',
    type: 'select',
    title: '性别',
    default: 1,
    enum: [{label: '男', value: 1}, {label: '女', value: 2}]
  }, {
    property: 'detail',
    type: 'object',
    fields: [{
      property: 'favorite.value',
      default: 'aa',
      type: 'string',
      title: '爱好'
    }, {
      property: 'favorite.fieldType',
      default: 'bb',
      type: 'string',
      visible: false
    }]
  }];

  function getDefaultValue() {
    return {
      id: null,
      name: null,
      region: null,
      modelName: null,
      dataCollect: null,
      caseType: null,
      workMode: null,
      xiaofaId: null,
      sendSms: null,
      workTime: null,
      location: null,
      infoTypes: null,
      skillNo: null,
      newCaseQuery: null
    };
  }

  registerAntd();
  export default defineComponent({
    name: 'Demo',
    setup() {
      const editSchema = {
        props: {
          labelWidth: 140
        },
        fields: {
          name: {
            type: FieldTypes.String,
            title: '名称',
            tip: '必须以func_开头'
          },
          zhName: {
            type: FieldTypes.String,
            title: '中文名称'
          },
          namespace: {
            type: FieldTypes.Select,
            title: '命名空间',
            props: {
              searchable: true
            }
          },
          bindingEntityId: {
            type: FieldTypes.Select,
            title: '绑定的实体对象',
            props: {
              searchable: true
            }
          },
          returnType: {
            type: FieldTypes.Select,
            title: '返回值类型',
            enum: [
              {label: '日期时间', value: 'Date'},
              {label: '字符串', value: 'String'},
              {label: '小数', value: 'Double'},
              {label: '整数', value: 'Int'},
              {label: '布尔', value: 'Boolean'}
            ]
          },
          content: {
            type: 'code',
            title: '内容',
            props: {
              lang: 'javascript'
            }
          },
          description: {
            type: FieldTypes.Text,
            title: '描述'
          },
          $card: {
            type: 'card',
            title: '参数列表',
            fields: {
              parameters: {
                type: 'object',
                array: true,
                fields: {
                  name: {
                    type: FieldTypes.String,
                    title: '参数名称'
                  },
                  zhName: {
                    type: FieldTypes.String,
                    title: '中文名称'
                  },
                  type: {
                    type: FieldTypes.Select,
                    title: '参数类型',
                    enum: [
                      {label: '日期时间', value: 'Date'},
                      {label: '字符串', value: 'String'},
                      {label: '小数', value: 'Double'},
                      {label: '整数', value: 'Int'},
                      {label: '布尔', value: 'Boolean'}
                    ]
                  }
                }
              }
            }
          }
        }
      };
      const editForm: any = ref({
        'content': 'const date = new Date();\ndate.setDate(date.getDate() - n);\nreturn date;',
        'description': '获取当前时间n天前的时间点',
        'id': '60ba7c8e571fe832151accc5',
        'name': 'func_dateBefore',
        'parameters': [{'name': 'n', 'type': 'Int', 'zhName': '天数'}],
        'returnType': 'Date',
        'zhName': 'n天前'
      });
      const value = reactive({
        age: null,
        note: ''
      });
      const schema = reactive({
        props: {'labelWidth': '120px'},
        fields: [{
          property: 'note',
          title: '提示文字',
          type: 'string',
          default: '1'
        }, {
          type: 'grid',
          layout: [[12, 12, 12]],
          fields: [{
            property: 'number',
            title: '数值输入框',
            type: 'number',
            placeholder: '',
            props: {'extra': '个'},
            default: 0
          }, {
            property: 'select',
            title: '多选框',
            array: true,
            type: 'select',
            placeholder: '',
            default: []
          }]
        }]
      });


      const effects = ($) => {
        $('p1.fieldType').onFieldCreateOrChange((v) => {
          console.log(v);
        });
      };
      const edit = () => {
        editForm.value = {
          'code': '',
          'id': 121,
          'name': '宁夏回族自治区高级人民法院',
          'contactPhone': '0951—5915227',
          'servicePhone': null,
          'postCode': '750001',
          'address': '银川市兴庆区北京东路149号',
          'other': null,
          'skillNo': null,
          'transportLine': null,
          'workingTime': '4月1日-9月30日周一至周五上午08:30-12:00下午14:30-18:00；10月1日-3月31日 周一至周五上午08:30-12:00下午14:00-17:30',
          'customerConfigId': 'nxgy'
        };
      };
      const editFormEffects = async ($) => {
        $('test').hide();
        const customerField = $('customerConfigId');
        try {
          customerField.setFieldProps({loading: true});
          // const data = await api.ivm.customerConfig.simpleAll.r();
          customerField.setEnum([{label: '宁夏高院', value: 'nxgy'}, {label: '最高院', value: 'zgy'}]);
        } catch (e) {
          console.error(e);
        } finally {
          customerField.setFieldProps({loading: false});
        }
      };
      registerAntd();

      return {
        editSchema,
        editForm,
        value,
        editFormEffects,
        schema,
        effects,
        edit
      };
    }
  });
</script>
```
