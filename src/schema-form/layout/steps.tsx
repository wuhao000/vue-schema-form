import {computed, defineComponent, PropType, ref, watch, watchEffect} from 'vue';
import {SchemaFormField} from '../../../types';
import {FieldDefinition} from '../bean/field-definition';
import {flat} from '../utils/array';
import {baseLayoutProps, useBaseLayout} from './base-layout';
import './steps.less';

export default defineComponent({
    name: 'StepsLayout',
    props: {
      ...baseLayoutProps,
      layout: {type: Array as PropType<number[]>},
      titles: {
        type: [Array]
      },
      currentStep: Number,
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
      const fields = this.$slots.default();
      const getGroups = () => {
        if (this.layout) {
          return (this.layout as number[]).map((n) => {
            return fields.splice(0, n);
          });
        }
        return fields;
      };
      const getStepsCount = () => {
        if (this.layout) {
          return this.layout.length;
        }
        return fields.length;
      };
      const getFieldDefGroups = () => {
        if (this.layout) {
          return (this.layout as number[]).map((n) => {
            return iFields.splice(0, n);
          });
        }
        return iFields.map(it => [it]);
      };
      const fieldDefGroups = getFieldDefGroups();
      const groups = getGroups();
      const stepsCount = getStepsCount();
      return <div class="schema-form-steps-wrapper">
        <a-steps
          class="schema-form-steps"
          v-model={[this.current, 'value']}>
          {
            groups.map((n, index) => {
              return <a-step
                status={
                  this.getStatus(index, fieldDefGroups[index])
                }
                title={this.titles[index]}>
              </a-step>;
            })
          }
        </a-steps>
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
              disabled={this.current >= stepsCount - 1}
              onClick={() => {
                const fields = fieldDefGroups[this.current];
                Promise.all(fields.map(it => it.validate())).then(data => {
                  const errors = flat(data).filter(it => it !== undefined);
                  if (errors.length === 0 && this.current < stepsCount - 1) {
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
