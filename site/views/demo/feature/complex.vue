<template>
  <div style="width: 600px"
       class="bg-white">
    <v-schema-form :schema="schema"
                   :effects="effects"
                   v-model="value"/>
    <a-mentions rows="3"
                placeholder="You can use @ to ref user here">
      <a-mentions-option value="afc163">
        afc163
      </a-mentions-option>
      <a-mentions-option value="zombieJ">
        zombieJ
      </a-mentions-option>
      <a-mentions-option value="yesmeck">
        yesmeck
      </a-mentions-option>
    </a-mentions>
  </div>
</template>
<script lang="ts">
import {EffectsContext} from '../../../../types';
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      value: null,
      users: [],
      showUserList: false,
      schema: {
        'props': {
          'labelWidth': '120px', 'props': {
            'labelWidth': '120px',
            'fields': [{
              'array': false,
              'dataType': 'text',
              'name': '出差事由',
              'path': 'reason',
              'readonly': false,
              'validateRules': {'required': true, 'unique': false}
            }, {
              'array': false,
              'basicDataCode': 'transportation',
              'dataType': 'basic-data',
              'name': '交通方式',
              'path': 'vehicleId',
              'readonly': false,
              'validateRules': {'required': true, 'unique': false}
            }, {
              'array': false,
              'dataType': 'area',
              'name': '出发城市',
              'path': 'fromCityId',
              'readonly': false,
              'validateRules': {'required': true, 'unique': false}
            }, {
              'array': false,
              'dataType': 'area',
              'name': '目的地',
              'path': 'destinationCityId',
              'readonly': false,
              'validateRules': {'required': true, 'unique': false}
            }, {
              'array': false,
              'dataType': 'date',
              'name': '开始时间',
              'path': 'begin',
              'readonly': false,
              'validateRules': {'required': true, 'unique': false}
            }, {
              'array': false,
              'dataType': 'date',
              'name': '结束时间',
              'path': 'end',
              'readonly': false,
              'validateRules': {'required': true, 'unique': false}
            }, {
              'array': false,
              'dataType': 'calculate',
              'displayScript': 'if (value) {\n value\n} else {\n if (entity && entity.begin && entity.end\n && entity.begin instanceof Date\n && entity.end instanceof Date) {\n\t\tconst begin = entity.begin;\n\t\tconst end = entity.end;\n\t\tbegin.setHours(0, 0, 0, 0);\n\t\tend.setHours(0, 0, 0, 0);\n\t\t(end.getTime() - begin.getTime()) / 24 / 3600 / 1000;\n }\n}',
              'name': '出差天数',
              'path': 'travelDays',
              'readonly': true,
              'validateRules': {'required': false, 'unique': false}
            }]
          }
        },
        'fields': [{
          'property': 'data.label',
          'type': 'string',
          'default': '出差套件',
          'visible': false,
          'id': 'eee802e8-5187-4de4-801e-60fb7f6f8ca0'
        }, {
          'property': 'data.fieldType',
          'type': 'string',
          'default': 'TravelSuit',
          'visible': false,
          'id': 'e5296e06-82cd-4d4d-8763-e0647733b4cf'
        }, {
          'property': 'data.displayValue',
          'type': 'string',
          'default': null,
          'visible': false,
          'id': '0a0c16f2-6e35-4d8c-bab6-2ad6179e160d'
        }, {
          'id': 'data',
          'property': 'data.value',
          'array': false,
          'type': 'object',
          'props': {
            'fields': [{
              'array': false,
              'dataType': 'text',
              'name': '出差事由',
              'path': 'reason',
              'readonly': false,
              'validateRules': {'required': true, 'unique': false}
            }, {
              'array': false,
              'basicDataCode': 'transportation',
              'dataType': 'basic-data',
              'name': '交通方式',
              'path': 'vehicleId',
              'readonly': false,
              'validateRules': {'required': true, 'unique': false}
            }, {
              'array': false,
              'dataType': 'area',
              'name': '出发城市',
              'path': 'fromCityId',
              'readonly': false,
              'validateRules': {'required': true, 'unique': false}
            }, {
              'array': false,
              'dataType': 'area',
              'name': '目的地',
              'path': 'destinationCityId',
              'readonly': false,
              'validateRules': {'required': true, 'unique': false}
            }, {
              'array': false,
              'dataType': 'date',
              'name': '开始时间',
              'path': 'begin',
              'readonly': false,
              'validateRules': {'required': true, 'unique': false}
            }, {
              'array': false,
              'dataType': 'date',
              'name': '结束时间',
              'path': 'end',
              'readonly': false,
              'validateRules': {'required': true, 'unique': false}
            }, {
              'array': false,
              'dataType': 'calculate',
              'displayScript': 'if (value) {\n value\n} else {\n if (entity && entity.begin && entity.end\n && entity.begin instanceof Date\n && entity.end instanceof Date) {\n\t\tconst begin = entity.begin;\n\t\tconst end = entity.end;\n\t\tbegin.setHours(0, 0, 0, 0);\n\t\tend.setHours(0, 0, 0, 0);\n\t\t(end.getTime() - begin.getTime()) / 24 / 3600 / 1000;\n }\n}',
              'name': '出差天数',
              'path': 'travelDays',
              'readonly': true,
              'validateRules': {'required': false, 'unique': false}
            }], 'props': {
              'labelWidth': '120px',
              'fields': [{
                'array': false,
                'dataType': 'text',
                'name': '出差事由',
                'path': 'reason',
                'readonly': false,
                'validateRules': {'required': true, 'unique': false}
              }, {
                'array': false,
                'basicDataCode': 'transportation',
                'dataType': 'basic-data',
                'name': '交通方式',
                'path': 'vehicleId',
                'readonly': false,
                'validateRules': {'required': true, 'unique': false}
              }, {
                'array': false,
                'dataType': 'area',
                'name': '出发城市',
                'path': 'fromCityId',
                'readonly': false,
                'validateRules': {'required': true, 'unique': false}
              }, {
                'array': false,
                'dataType': 'area',
                'name': '目的地',
                'path': 'destinationCityId',
                'readonly': false,
                'validateRules': {'required': true, 'unique': false}
              }, {
                'array': false,
                'dataType': 'date',
                'name': '开始时间',
                'path': 'begin',
                'readonly': false,
                'validateRules': {'required': true, 'unique': false}
              }, {
                'array': false,
                'dataType': 'date',
                'name': '结束时间',
                'path': 'end',
                'readonly': false,
                'validateRules': {'required': true, 'unique': false}
              }, {
                'array': false,
                'dataType': 'calculate',
                'displayScript': 'if (value) {\n value\n} else {\n if (entity && entity.begin && entity.end\n && entity.begin instanceof Date\n && entity.end instanceof Date) {\n\t\tconst begin = entity.begin;\n\t\tconst end = entity.end;\n\t\tbegin.setHours(0, 0, 0, 0);\n\t\tend.setHours(0, 0, 0, 0);\n\t\t(end.getTime() - begin.getTime()) / 24 / 3600 / 1000;\n }\n}',
                'name': '出差天数',
                'path': 'travelDays',
                'readonly': true,
                'validateRules': {'required': false, 'unique': false}
              }]
            }
          },
          'required': false,
          'default': null,
          'arrayComponent': 'block',
          'wrapperProps': {'showTitle': false},
          'fields': [{
            'title': '出差事由',
            'property': 'reason',
            'array': false,
            'required': true,
            'type': 'text',
            'props': {},
            'id': '0ddb9d05-1d4b-4126-a41c-c61e4dc19ce4'
          }, {
            'title': '交通方式',
            'property': 'vehicleId',
            'array': false,
            'required': true,
            'type': 'basic-data',
            'props': {'type': 'transportation'},
            'id': 'e9238c7c-5ea9-47fe-914f-e092c1d1c6ff'
          }, {
            'title': '出发城市',
            'property': 'fromCityId',
            'array': false,
            'required': true,
            'type': 'area',
            'props': {},
            'id': '45375732-ff1a-4267-bec2-ae2ebe62ec94'
          }, {
            'title': '目的地',
            'property': 'destinationCityId',
            'array': false,
            'required': true,
            'type': 'area',
            'props': {},
            'id': '400943be-c1b0-4eaa-9d32-77f9e82cc76f'
          }, {
            'title': '开始时间',
            'property': 'begin',
            'array': false,
            'required': true,
            'type': 'date',
            'props': {},
            'id': 'ed46793f-3656-4d0d-b949-50c7d4863f06'
          }, {
            'title': '结束时间',
            'property': 'end',
            'array': false,
            'required': true,
            'type': 'date',
            'props': {},
            'id': '63491d3e-3337-4bba-95ea-38c751c6e2a9'
          }, {
            'title': '出差天数',
            'property': 'travelDays',
            'array': false,
            'required': false,
            'type': 'plain',
            'props': {'script': 'if (value) {\n value\n} else {\n if (entity && entity.begin && entity.end\n && entity.begin instanceof Date\n && entity.end instanceof Date) {\n\t\tconst begin = entity.begin;\n\t\tconst end = entity.end;\n\t\tbegin.setHours(0, 0, 0, 0);\n\t\tend.setHours(0, 0, 0, 0);\n\t\t(end.getTime() - begin.getTime()) / 24 / 3600 / 1000;\n }\n}'},
            'id': '2a2784e6-91dd-4f5a-9d62-9cf82f8c3b89'
          }]
        }]
      }
    };
  },
  computed: {
    align() {
      return {
        offset: [-200, 0]
      };
    }
  },
  methods: {
    effects($: EffectsContext) {
      $('obj.name.value').value('abc');
      $('*').onFieldCreateOrChange(() => {
        $('data.value.travelDays').value(5);
      });
    },
    onInput(e) {
      console.log(e);
      if (e.data === '@') {
        this.showUserList = true;
      }
    }
  },
  created() {
    window.SchemaForm.registerAntd();
  }
});
</script>
<style lang="less">
.flow-steps {
  .flow-step {
    .am-steps-item-tail, .am-steps-item-icon {
      margin-top: 15px;
    }

    .flow-step-title {
    }

    .flow-step-subtitle {
      color: gray;
      font-size: 80%;
    }
  }
}
</style>
