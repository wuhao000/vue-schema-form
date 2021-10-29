<template>
  <v-schema-form
      v-model:value="localValue"
      :schema="schema"/>
</template>
<script lang="ts">
  import isequal from 'lodash.isequal';
  import {defineComponent, Ref, ref, watch} from 'vue';
  import {EffectsContext, SchemaFormField} from '../../../../../types';

  export const useLocalValue = (props, {emit}, name = 'value'): {
    localValue: Ref
  } => {
    const localValue = ref(props[name]);
    watch(() => props[name], value => {
      if (!isequal(value, localValue.value)) {
        localValue.value = value;
      }
    }, {deep: true});
    watch(() => localValue.value, (value: T) => {
      if (name) {
        emit(`update:${name}`, value);
      } else {
        emit('update', value);
      }
    }, {deep: true});
    return {
      localValue
    };
  };

  export default defineComponent({
    props: {
      value: Object
    },
    emits: ['update:value'],
    setup(props, {emit}) {
      const {localValue} = useLocalValue(props, {emit});
      const effects = ($: EffectsContext) => {
        $('*').show();
        $('selectMode').onFieldCreateOrChange(v => {
          if (v === 2) {
            $('optionsCountPerRow').show();
          } else {
            $('optionsCountPerRow').hide();
          }
        });
        $('optionsSource').onFieldCreateOrChange(v => {
          $('optionDataSetId', 'options',
              'externalOptionsUrl', 'externalOptionsProperties').hide();
          if (v === 1) {
            $('optionDataSetId').show();
          } else if (v === 2) {
            $('options').show();
          } else if (v === 3) {
            $('externalOptionsUrl',
                'externalOptionsProperties').show();
          }
        });
        $('externalOptionsUrl').onFieldBlur(async () => {
          const url = $('externalOptionsUrl').value();
          if (url) {

          }
        });
      };
      const schema: SchemaFormField = {
        fields: [
          {
            property: 'optionsSource',
            enum: [
              {label: '1', value: 1},
              {label: '2', value: 2}
            ],
            required: true,
            title: '选项来源',
            type: 'select'
          }, {
            property: 'externalOptionsUrl',
            required: true,
            title: '数据源地址',
            type: 'string'
          }, {
            property: 'externalOptionsProperties',
            required: true,
            slot: 'externalOptionsProperties',
            title: '字段配置',
            type: 'string'
          }, {
            property: 'optionDataSetId',
            enum: [],
            required: true,
            title: '数据字典',
            type: 'select'
          }, {
            property: 'options',
            slot: 'customOptions',
            title: '选项（最多20项，每项最多50字）',
            type: 'text'
          }, {
            property: 'selectMode',
            props: {options: [{label: '弹出（下拉）', value: 1}, {label: '展开', value: 2}]},
            title: '选择方式',
            type: 'select',
            visible: false
          }, {
            property: 'optionsCountPerRow',
            props: {
              options: [
                {label: '自动', value: 0},
                {label: '1个', value: 1},
                {label: '2个', value: 2},
                {label: '3个', value: 3},
                {label: '4个', value: 4}
              ]
            },
            title: '每行显示',
            type: 'select',
            visible: false
          }
        ]
      };
      return {
        effects,
        localValue,
        schema
      };
    }
  });


</script>