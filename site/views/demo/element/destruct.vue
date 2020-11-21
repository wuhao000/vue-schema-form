<template>
  <a-layout>
    <a-layout-content>
      <v-schema-form v-model="value"
                     :effects="effects"
                     :schema="schema"
                     @ok="showValue"></v-schema-form>
      <show-value :value="value"/>
    </a-layout-content>
  </a-layout>
</template>
<script lang="ts">
  import {EffectsContext} from '../../../../types';
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import ShowValue from '../show-value';

  @Component({
    name: 'ElementDestruct',
    components: {ShowValue}
  })
  export default class ElementDestruct extends Vue {

    public schema = {
      props: {
        inline: true,
        labelPosition: 'top'
      },
      fields: {
        $grid: {
          type: 'grid',
          layout: [[6, 6, 6, 6, 6, 6, 6]],
          props: {
            gutter: 58
          },
          fields: {
            callerName: {
              type: 'string',
              title: '来电人',
              nativeEvents: {
                keydown: ($, e) => {
                  console.log($);
                  console.log(e);
                }
              }
            },
            phoneMark: {
              type: 'select',
              title: '来电类型'
            },
            partyName: {
              type: 'string',
              title: '当事人'
            },
            caseNumber: {
              type: 'string',
              title: '案号'
            },
            '[startTime, endTime]': {
              type: 'datetimerange',
              title: '来电时间',
              props: {
                'default-time': ['00:00:00', '23:59:59']
              }
            },
            status: {
              type: 'select',
              title: '当前状态',
              enum: [],
              props: {labelProperty: 'name'}
            }
          }
        }
      }
    };
    public value = {};

    public created() {
      window.SchemaForm.registerElement();
    }

    public effects($: EffectsContext) {
      $('callerName').subscribe('onFieldKeydown', () => {

      });
    }

    public showValue() {
      console.log(this.value);
    }

  }
</script>
