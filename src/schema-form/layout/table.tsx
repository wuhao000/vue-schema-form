import {baseLayoutProps} from './base-layout';
import {computed, defineComponent, PropType, provide, reactive} from 'vue';
import {FieldDefinition} from "../bean/field-definition";
import {isNull, LibComponents, resolveTitle} from "../utils/utils";
import {useBaseFieldComponent} from "../internal/field-based-component";
import {renderField} from "../internal/utils";

export const TableStoreKey = Symbol('TableStoreKey')

export default defineComponent({
  name: 'TableLayout',
  inheritAttrs: false,
  props: {
    ...baseLayoutProps,
    platform: String,
    field: {
      type: Object as PropType<FieldDefinition>,
      required: true
    }
  },
emits: ['add'],
  setup(props, {emit}) {
    const {currentValue, renderFormField} = useBaseFieldComponent(props, {emit});
    const tableStore = reactive({
      setValue: (v, index) => {
        if (isNull(currentValue.value)) {
          currentValue.value = [];
        }
        currentValue.value[index] = v;
      }
    });
    provide(TableStoreKey, tableStore);
    const columns = computed(() => {
      const array = [];
      const fields = props.field.fields;
      if (Array.isArray(fields)) {
        fields.forEach((field, index) => {
          array.push({
            title: resolveTitle(field),
            dataIndex: field.property,
            customRender: ({record}) => {
              return renderFormField(field, record, index, false)
            }
          })
        })
      } else if (typeof fields === 'object') {
        Object.keys(fields).forEach((p, index) => {
          array.push({
            title: resolveTitle(fields[p]),
            dataIndex: p,
            customRender: ({record}) => {
              return renderFormField(fields[p], record, index, false)
            }
          })
        });
      }
      return array;
    })
    const add = () => {
      emit('add');
    };
    return {
      columns,
      add,
      currentValue
    }
  },
  render() {
    const PlusIcon = LibComponents.icons[this.platform].plus
    const MinusIcon = LibComponents.icons[this.platform].minus;
    return <div>
      <a-table
          dataSource={this.currentValue}
          columns={this.columns}
          v-slots={{
            footer: () => (
                <div>
                  <PlusIcon onClick={() => {
                    this.add()
                  }}/>
                  <MinusIcon />
                </div>
            )
          }}
      />
      {this.$slots.default()}
    </div>;
  }
});
