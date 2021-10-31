<template>
  <div class="markdown-body">
    <h1 id="表单列表">表单列表</h1>
<demo-wrapper>
<comp0></comp0>
<template #code><code-container>
  
&lt;template&gt;
  &lt;a-layout&gt;
    &lt;a-layout-content&gt;
      &lt;v-schema-form
          v-model:value="value"
          :schema="schema"
          class="demo-form"
          @ok="onOk"&gt;&lt;/v-schema-form&gt;
    &lt;/a-layout-content&gt;
  &lt;/a-layout&gt;
&lt;/template&gt;
&lt;script lang="ts"&gt;
  import {registerAntd} from '../../../schema-form';
  import {SchemaFormField} from '../../../../types';
  import {defineComponent, ref} from 'vue';

  registerAntd();
  export default defineComponent({
    name: 'Demo',
    setup() {
      const value = ref([{
        basic: {
          aa: '1234',
          cc: {
            cc: '11'
          }
        }
      }]);
      const value2 = ref([{
        a: '1',
        b: '2'
      }]);
      return {
        value2,
        tableSchema: {
          type: 'object',
          array: true,
          arrayComponent: 'table',
          fields: {
            a: {
              type: 'string',
              title: '字段1'
            },
            b: {
              type: 'string',
              title: '字段2'
            }
          }
        },
        schema: {
          props: {
            title: '对象列表',
            labelWidth: '120px',
            labelPosition: 'left'
          },
          type: 'object',
          array: true,
          arrayComponent: 'block',
          arrayProps: {
            addText: '这是定制的添加文案',
            removeText: '这是定制的删除文案',
            maxItems: 3
          },
          fields: {
            basic: {
              type: 'object',
              fields: {
                aa: {
                  type: 'string',
                  title: '字段1'
                },
                bb: {
                  type: 'string',
                  title: '字段2'
                },
                cc: {
                  type: 'object',
                  props: {
                    gutter: 10
                  },
                  fields: {
                    grid: {
                      type: 'grid',
                      layout: [[8, 8]],
                      title: '字段3',
                      props: {gutter: 10},
                      fields: {
                        cc: {
                          type: 'string'
                        },
                        dd: {
                          type: 'string'
                        }
                      }
                    },
                    ee: {
                      type: 'object',
                      array: true,
                      arrayComponent: 'block',
                      fields: {
                        aa: {
                          type: 'string',
                          title: '字段1'
                        },
                        bb: {
                          type: 'string',
                          title: '字段2'
                        },
                        cc: {
                          type: 'object',
                          props: {
                            gutter: 10
                          },
                          fields: {
                            grid: {
                              type: 'grid',
                              layout: [[8, 8]],
                              title: '字段3',
                              props: {gutter: 10},
                              fields: {
                                cc: {
                                  type: 'string'
                                },
                                dd: {
                                  type: 'string'
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        } as SchemaFormField,
        value,
        onOk() {
          console.log(value.value);
        }
      };
    }
  });
&lt;/script&gt;

</code-container></template>
</demo-wrapper>
</div>
</template>
<script lang="ts" setup>
  import  comp0 from './comp0.vue';
</script>