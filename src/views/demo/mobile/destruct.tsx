import SchemaForm from '@/schema-form';
import DestructSchema from '@/views/demo/schema/mobile-destruct.json';
import ShowValue from '@/views/demo/show-value';
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  name: 'Destruct'
})
export default class Destruct extends Vue {

  public value = {};

  public created() {
    SchemaForm.registerAntdMobile();
  }

  public render() {
    const a = DestructSchema;
    return <div>
      <v-schema-form
        vModel={this.value}
        platform="mobile"
        schema={{
          fields: {
            str: {
              type: 'string',
              title: '文本字段1'
            },
            str2: {
              type: 'string',
              title: '文本字段2',
              editable: false,
              default: '124'
            },
            file: {
              type: 'file',
              title: '文件',
              props: {
                action: 'https://yapi.aegis-info.com/mock/126/upload',
                accept: '*'
              }
            }
          }
        }}>
      </v-schema-form>
      <ShowValue value={this.value}/>
    </div>;
  }
}
