<template>
  <ae-layout>
    <ae-layout-content>
      <v-schema-form v-model="model"
                     :effects="effects"
                     :props="formProps"
                     :schema="formDefinition">
      </v-schema-form>
      <show-value :value="model"/>
    </ae-layout-content>
  </ae-layout>
</template>
<script lang="tsx">
  import SchemaForm from '@/schema-form';
  import {DESKTOP} from '@/schema-form/utils/utils';
  import {EffectsContext, SchemaFormField} from 'v-schema-form-types';
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import {Prop, Watch} from 'vue-property-decorator';
  import ShowValue from '../show-value';
  import User from './visible-scope-input.vue';

  SchemaForm.registerComponent(User, DESKTOP, 'User', null, (def) => {
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
    public iconTypeOptions = [{
      label: '未设置', value: null
    }, {
      label: 'Ant', value: 'Antd'
    }, {
      label: 'Font Awesome', value: 'FontAwesome'
    }];
    private loading: boolean = false;

    public model: any = this.getDefaultBean();
    public formDefinition: SchemaFormField = {
      fields: [{
        type: 'string',
        property: 'name',
        title: '名称',
        props: {required: true}
      }, {
        type: 'string',
        property: 'code',
        title: '编码',
        props: {required: true, disabled: !!(this.model && this.model.id), span: 12}
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
    public type: string = 'aaa';

    get formProps() {
      return {
        labelWidth: '150px',
        model: this.model,
        rules: {
          name: [{required: true, message: '请输入名称'}],
          code: [{required: true, message: '请输入编码'}]
        }
      };
    }

    @Watch('id')
    public async idChanged(id: string) {
      if (id) {
        setTimeout(() => {
          this.model = {
            id: '2',
            extras: {}
          };
        }, 1000);
      }
    }

    @Watch('value')
    public async valueChanged(value: boolean) {
      if (value && !this.id) {
        this.model = this.getDefaultBean();
      } else {
        setTimeout(() => {
          this.model = {
            id: '2',
            extras: {}
          };
        }, 1000);
      }
    }

    public async created() {
      SchemaForm.registerAntd();
      setTimeout(() => {
        const definitions = [{
          'name': 'userToChooseResume',
          'displayName': '简历筛选人员',
          'type': 'User',
          'array': true,
          'tag': 'Post',
          'required': true,
          'id': 20,
          'orderNo': 0
        }, {
          'name': 'usersToInterview',
          'displayName': '面试人员',
          'type': 'User',
          'array': true,
          'tag': 'Post',
          'required': true,
          'id': 21,
          'orderNo': 0
        }, {
          'name': 'requirements',
          'displayName': '任职要求',
          'type': 'text',
          'array': false,
          'tag': 'post',
          'required': false,
          'id': 32,
          'orderNo': 0
        }];
        definitions.forEach(it => {
          it['span'] = 12;
        });
        (this.formDefinition.fields as SchemaFormField[]).push(...transform(definitions));
      }, 0);
    }

    public effects($: EffectsContext) {
      if (!this.quickAddMode) {
        $('order', 'iconType', 'color', 'extras').show();
      }
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
        extras: {}
      };
    }

    public hideAndSendEvent(event: string) {
      const model = this.model;
      this.model = this.getDefaultBean();
      this.$emit('input', false);
      this.$emit(event, event === 'success' ? model : null);
    }

    public onCancel() {
      this.hideAndSendEvent('cancel');
    }

    public async saveData() {
    }

  }
</script>
