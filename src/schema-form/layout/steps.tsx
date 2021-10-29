import {Steps} from 'ant-design-vue';
import {computed, defineComponent, PropType, ref, watch, watchEffect} from 'vue';
import {FieldDefinition, SchemaFormField} from '../../../types';
import {flat} from '../utils/array';
import {baseLayoutProps, useBaseLayout} from './base-layout';
import './steps.less';

export default defineComponent({
    name: 'StepsLayout',
    props: {
      layout: {type: Array as PropType<any[]>, required: true},
      titles: {
        type: [Array]
      },
      currentStep: Number,
      ...baseLayoutProps
    },
    setup(props) {
      const {store} = useBaseLayout();
      const current = ref(0);
      const iFields = computed(() => {
        return (props.fieldDefinitions as SchemaFormField[]).map(it => store.fields[it.property]);
      });
      const errors = computed(() => {
        return iFields.value.filter(it => it !== undefined).map(it => it.errors);
      });
      watch(() => props.currentStep, (value: number) => {
        if (value !== null && value !== undefined) {
          current.value = value;
        }
      }, {immediate: true});
      watchEffect(() => errors.value);
      return {
        current,
        store,
        getStatus: (index, fields: FieldDefinition[]) => {
          const fieldErrors = flat(fields.filter(it => it !== undefined).map(it => it.errors));
          if (fieldErrors.length) {
            return 'error';
          }
          if (current.value > index) {
            return 'finish';
          }
          if (current.value === index) {
            return 'process';
          }
          return 'wait';
        }
      };
    },
    render() {
      const iFields = this.fieldDefinitions.map(it => this.store.fields[it.property]) as FieldDefinition[];
      const fields = [...this.fields as any[]];
      const groups = (this.layout as number[]).map((n) => {
        return fields.splice(0, n);
      });
      const iFieldGroups = (this.layout as number[]).map((n) => {
        return iFields.splice(0, n);
      });
      return <div class="schema-form-steps-wrapper">
        <Steps
          class="schema-form-steps"
          v-model={[this.current, 'value']}>
          {
            (this.layout as number[]).map((n, index) => {
              return <Steps.Step
                status={
                  this.getStatus(index, iFieldGroups[index])
                }
                title={this.titles[index]}/>;
            })
          }
        </Steps>
        {
          groups.map((n, index) => {
            return <div style={{
              display: index === this.current ? 'block' : 'none'
            }}>
              {n}
            </div>;
          })
        }
        {
          <div class="schema-form-steps-operations">
            <a-button
              class="prev-step"
              disabled={this.current <= 0}
              onClick={() => {
                if (this.current > 0) {
                  this.current = this.current - 1;
                }
              }}>上一步
            </a-button>
            <a-button
              class="next-step"
              disabled={this.current >= this.layout.length - 1}
              onClick={() => {
                const fields = iFieldGroups[this.current];
                Promise.all(fields.map(it => it.validate())).then(data => {
                  if (!data.some(it => it && (it as string[]).length) && this.current < this.layout.length - 1) {
                    this.current = this.current + 1;
                  }
                });
              }}>下一步
            </a-button>
          </div>
        }
      </div>;
    }
  }
);
