
<template>
  <div>
    <d-time-picker v-model:value="value"></d-time-picker>
    {{ value }}
  </div>
  <div>
    <d-time-range-picker v-model:value="rangeValue"></d-time-range-picker>
    {{ rangeValue }}
  </div>
  <div>
    {{ rangeValue3 }}
    <v-schema-form
        v-model:value="rangeValue3"
        :schema="schema"/>
  </div>
  <div>
    <d-time-range-picker
        v-model:value="rangeValue2"
        value-type="string"
        format="HH:mm"></d-time-range-picker>
    {{ rangeValue2 }}
  </div>
</template>
<script lang="ts">
  import {registerAntd} from '../../../../schema-form/antd';
  import {defineComponent, ref} from 'vue';
  import DTimePicker from '../../../../schema-form/antd/components/time-picker';
  import DTimeRangePicker from '../../../../schema-form/antd/components/time-picker/time-range-picker';

  registerAntd();
  export default defineComponent({
    name: 'Demo',
    components: {DTimePicker, DTimeRangePicker},
    setup() {
      const value = ref('');
      const rangeValue = ref([]);
      const rangeValue2 = ref(null);
      const rangeValue3 = ref({
        timerange: ["12:02-12:44", "13:44-15:44"]
      });
      return {
        value,
        rangeValue,
        rangeValue2,
        rangeValue3,
        schema: {
          fields: {
            timerange: {
              title: 'time',
              type: 'timerange',
              array: true,
              props: {
                format: 'HH:mm',
                valueType: 'string'
              }
            }
          }
        }
      };
    }
  });
</script>