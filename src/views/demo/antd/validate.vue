<template>
  <ae-layout class="demo-wrapper">
    <ae-layout-content>
      <ae-row>
        <ae-col :span="12">
          <a-schema-form v-model="value2"
                         class="demo-form"
                         :schema="definition"
                         :props="props"
                         @cancel="onCancel"
                         @ok="onOk"
                         @reset="onReset"></a-schema-form>
        </ae-col>
        <ae-col :span="12">
          <a-schema-form class="demo-form"
                         mode="display"
                         :schema="definition"
                         :props="props"
                         :value="value2"
                         @cancel="onCancel"
                         @ok="onOk"
                         @reset="onReset"></a-schema-form>
        </ae-col>
      </ae-row>
    </ae-layout-content>
  </ae-layout>
</template>
<script lang="tsx">
  import SchemaForm from '@/index';
  import Base from '@/views/demo/base';
  import Component from 'vue-class-component';
  import {Watch} from 'vue-property-decorator';

  SchemaForm.registerAntd();
  @Component({
    name: 'DesktopEdit'
  })
  export default class DesktopEdit extends Base {

    public value2 = {
      string: '1111111'
    };

    public created() {
      SchemaForm.registerAntd();
    }

  }
</script>
