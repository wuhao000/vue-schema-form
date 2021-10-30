<template>
  <div class="markdown-body">
    <pre><demo-wrapper>
<comp0></comp0>
<template #code><code-container>
  
&lt;template&gt;
  &lt;a-layout class="demo-wrapper"&gt;
    &lt;a-layout-content&gt;
      &lt;v-schema-form
          v-model:value="value"
          :schema="schema"
          class="demo-form"
          @ok="()=&gt;{}"
          @reset="()=&gt;{}"&gt;&lt;/v-schema-form&gt;
    &lt;/a-layout-content&gt;
  &lt;/a-layout&gt;
&lt;/template&gt;
&lt;script lang="ts"&gt;
import {registerAntd} from '../../../schema-form';
import {defineComponent, ref} from 'vue';

export default defineComponent({
  name: "Demo",
  setup() {
    registerAntd();
    return {
      schema: {
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
                  labelCol: {span: 4},
                  wrapperCol: {span: 12}
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
                      field3Num: {
                        type: 'number'
                      },
                      field3Date: {
                        'type': 'date'
                      }
                    }
                  },
                  gridLayout2: {
                    type: 'grid',
                    layout: [6, 16],
                    props: {
                      gutter: 10,
                      title: '对象字段'
                    },
                    fields: {
                      objNum: {
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
                      text1: {
                        type: 'number',
                        default: 10,
                        required: true
                      },
                      text2: {
                        type: 'number',
                        default: 20,
                        required: true
                      },
                      text3: {
                        type: 'number',
                        default: 30,
                        required: true
                      }
                    }
                  },
                  field4: {
                    type: 'string',
                    title: '字段4'
                  },
                  section: {
                    type: 'object',
                    props: {
                      title: '区块'
                    },
                    fields: {
                      field5: {
                        type: 'string',
                        title: '字段5'
                      },
                      field6: {
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
      },
      value: ref({})
    };
  }
});
&lt;/script&gt;
&lt;style lang="less"&gt;
.demo-form {
  .ant-card {
    margin-bottom: 24px;
  }
}
&lt;/style&gt;

</code-container></template>
</demo-wrapper></pre>
</div>
</template>
<script lang="ts" setup>
  import  comp0 from './comp0.vue';
</script>