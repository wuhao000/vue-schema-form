<template>
  <a-layout>
    <a-layout-content>
      <a-button @click="loadData">加载</a-button>
      {{selValue}}
      <v-schema-form v-model="model"
                     :effects="effects"
                     :schema="formDefinition"
                     @ok="submit">
        <d-form-item label="aaa"
                     slot="select">
          <el-ext-select :options="[{label: 1, value: 1}, {label: 2, value: 2}]"
                         :value="selValue"
                         @change="onChange"></el-ext-select>
        </d-form-item>
      </v-schema-form>
      <show-value :value="model"/>
    </a-layout-content>
  </a-layout>
</template>
<script lang="tsx">
  import {DESKTOP} from '../../../utils/util';
  import {EffectsContext, SchemaFormField} from '../../../../types';
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import {Prop, Watch} from 'vue-property-decorator';
  import ShowValue from '../show-value';
  import User from './visible-scope-input.vue';

  window.SchemaForm.registerComponent(User, DESKTOP, 'User', null, (def) => {
    return {maxUsers: def.array ? 0 : 1};
  });
  export const transform = (extraDefinitions: any[]): SchemaFormField[] => {
    const fields: SchemaFormField[] = [];
    extraDefinitions.forEach(def => {
      fields.push({
        type: def.type,
        property: 'extras.' + def.name,
        title: def.displayName,
        required: def.required,
        placeholder: def.placeholder,
        array: def.array,
        props: {
          extra: def.extra
        }
      });
    });
    return fields;
  };

  @Component({
    name: 'BasicDataItemEdit',
    components: {ShowValue}
  })
  export default class BasicDataItemEdit extends Vue {
    @Prop(Object)
    public definition: any;
    @Prop(String)
    public id: string;
    @Prop({type: Boolean, default: false})
    public quickAddMode: boolean;
    @Prop(String)
    public title: string;
    @Prop({type: Boolean, default: false})
    public value: boolean;
    public formDefinition: SchemaFormField = {
      props: {
        labelWidth: '150px',
        rules: {
          name: [{required: true, message: '请输入名称'}],
          code: [{required: true, message: '请输入编码'}]
        }
      },
      fields: [{
        title: 'aaa',
        slot: 'select',
        type: 'select'
      }, {
        type: 'string',
        property: 'name',
        title: '名称'
      }, {
        type: 'button',
        title: 'abc',
        props: {
          action: this.onAbc
        }
      }]
    };

    public iconTypeOptions = [{
      label: '未设置', value: null
    }, {
      label: 'Ant', value: 'Antd'
    }, {
      label: 'Font Awesome', value: 'FontAwesome'
    }];

    private loading: boolean = false;

    public model: any = this.getDefaultBean();
    public formDefinition2: SchemaFormField = {
      fields: [{
        type: 'string',
        property: 'name',
        title: '名称'
      }, {
        type: 'string',
        property: 'code',
        title: '编码',
        props: {disabled: !!(this.model && this.model.id), span: 12}
      }, {
        type: 'integer',
        property: 'order',
        title: '序号',
        visible: false,
        props: {span: 12}
      }, {
        type: 'select',
        property: 'iconType',
        title: '图标类型',
        props: {options: this.iconTypeOptions, span: 12}
      }, {
        type: 'select',
        property: 'icon',
        title: '图标',
        props: {
          span: 12, filter: this.filterIcon
        }
      }, {
        type: 'color',
        property: 'color',
        title: '颜色'
      }]
    };

    public selValue = 1;
    public type: string = 'aaa';

    @Watch('id')
    public async idChanged(id: string) {
      if (id) {
        setTimeout(() => {
        }, 1000);
      }
    }

    @Watch('value')
    public async valueChanged(value: boolean) {
      if (value && !this.id) {
        this.model = this.getDefaultBean();
      } else {

      }
    }

    public async created() {
      window.SchemaForm.registerElement();
      window.SchemaForm.registerAntd();
      setTimeout(() => {
        const definitions = [{
          'name': 'userToChooseResume',
          'displayName': '简历筛选人员',
          'type': 'User',
          'array': true,
          'tag': 'Post',
          'id': 20,
          'orderNo': 0
        }, {
          'name': 'usersToInterview',
          'displayName': '面试人员',
          'type': 'User',
          'array': true,
          'tag': 'Post',
          'id': 21,
          'orderNo': 0
        }, {
          'name': 'requirements',
          'displayName': '任职要求',
          'type': 'text',
          'array': false,
          'tag': 'post',
          'id': 32,
          'orderNo': 0
        }];
        definitions.forEach(it => {
          it['span'] = 12;
        });
        (this.formDefinition.fields as SchemaFormField[]).push(...transform(definitions));
      }, 3000000);
    }

    public effects($: EffectsContext) {
      if (!this.quickAddMode) {
        $('order', 'iconType', 'color', 'extras').show();
      }
      $('name').subscribe('fieldKeydown', (p) => {
        const e = p.event;
        if (e.key === 'Enter') {
          console.log('enter');
        }
      });
    }

    public filterIcon(input: string, option: any) {
      if (input) {
        return option.value.includes(input);
      }
      return true;
    }

    public getDefaultBean() {
      return {
        id: '',
        name: '',
        type: this.id,
        extras: {
          requirements: ''
        }
      };
    }

    public hideAndSendEvent(event: string) {
      const model = this.model;
      this.model = this.getDefaultBean();
      this.$emit('input', false);
      this.$emit(event, event === 'success' ? model : null);
    }

    public loadData() {
      this.model = {
        id: 'd3cfdf4426eb4fb59bc1db906365e0f2',
        name: '前端开发工程师',
        type: 'post',
        code: '002',
        order: 0,
        color: '',
        extras: {
          usersToInterview: [],
          userToChooseResume: [],
          requirements: 'aaaaaaaaaaaa'
        }
      };
    }

    public onAbc() {
      console.log(this.selValue);
      this.selValue = 2;
      console.log(this.selValue);
    }

    public onCancel() {
      this.hideAndSendEvent('cancel');
    }

    public onChange(v) {
      console.log('changed: ' + v);
      this.selValue = v;
    }

    public onSelValueChanged(v) {
      console.log(v);
    }

    public async saveData() {
    }

    public submit(v) {
    }
  }
</script>
