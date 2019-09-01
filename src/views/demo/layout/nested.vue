<template>
  <ae-layout class="demo-wrapper">
    <ae-layout-content>
      <a-schema-form v-model="value"
                     class="demo-form"
                     :definition="schema"
                     :props="props"
                     @ok="()=>{}"
                     @reset="()=>{}"></a-schema-form>
      <d-button @click="showData">查看数据</d-button>
      <ae-modal v-model="dialogVisible">
        <pre>
        </pre>
      </ae-modal>
    </ae-layout-content>
  </ae-layout>
</template>
<script lang="ts">
  import SchemaForm from '@/schema-form';
  import Vue from 'vue';
  import Component from 'vue-class-component';

  @Component({
    name: 'LayoutNested'
  })
  export default class LayoutNested extends Vue {

    public dialogVisible = false;
    public props = {
      labelCol: 8,
      wrapperCol: 6
    };
    public schema = {
      fields: {
        card: {
          type: 'card',
          props: {
            title: '基本信息'
          },
          fields: {
            basic: {
              type: 'object',
              fields: {
                str: {
                  type: 'string',
                  title: '字段1'
                },
                num: {
                  type: 'number',
                  title: '字段2'
                },
                date: {
                  type: 'date',
                  title: '字段3'
                }
              }
            }
          }
        },
        detailCard: {
          type: 'card',
          props: {
            'title': '详细信息'
          },
          fields: {
            detail: {
              type: 'object',
              props: {
                labelCol: 8,
                wrapperCol: 12
              },
              fields: {
                gridLayout: {
                  type: 'grid',
                  layout: [6, 11],
                  props: {
                    gutter: 10,
                    title: '字段3'
                  },
                  fields: {
                    ddd: {
                      type: 'number'
                    },
                    eee: {
                      'type': 'date'
                    }
                  }
                },
                gridLayout2: {
                  type: 'grid',
                  layout: [6, 11],
                  props: {
                    gutter: 10,
                    title: '对象字段'
                  },
                  fields: {
                    ddd1: {
                      type: 'number'
                    },
                    '[startDate,endDate]': {
                      type: 'daterange'
                    }
                  }
                },
                textbox: {
                  type: 'text-box',
                  title: '文本串联',
                  layout: '订%s元/票 退%s元/票 改%s元/票',
                  fields: {
                    aa1: {
                      'type': 'number',
                      'default': 10,
                      'required': true
                    },
                    aa2: {
                      'type': 'number',
                      'default': 20,
                      'required': true
                    },
                    aa3: {
                      'type': 'number',
                      'default': 30,
                      'required': true
                    }
                  }
                },
                aas: {
                  type: 'string',
                  title: '字段4'
                },
                section: {
                  type: 'object',
                  props: {
                    title: '区块'
                  },
                  fields: {
                    ddd2: {
                      type: 'string',
                      title: '字段5'
                    },
                    eee2: {
                      type: 'string',
                      title: '字段6'
                    }
                  }
                }
              }
            }
          }
        }
      }
    };
    public value = {};

    public created() {
      SchemaForm.registerAntd();
    }

    public showData() {
      console.log(this.value);
    }

  }
</script>
