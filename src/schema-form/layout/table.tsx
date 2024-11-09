import { baseLayoutProps } from './base-layout';
import { defineComponent, Prop } from 'vue';
import { FieldDefinition } from '../bean/field-definition';
import { LibComponents, resolveTitle } from '../utils/utils';
import './table.less';
import { useBaseFieldComponent } from '../internal/field-based-component';

const TableRow = defineComponent({
  name: 'TableRow',
  props: {
    arrayIndex: Number
  },
  setup(props, {emit}) {
    const {store} = useBaseFieldComponent(props, {emit});
    return {
      store
    };
  },
  render() {
    const DownIcon = LibComponents.icons[this.store.platform].down;
    const UpIcon = LibComponents.icons[this.store.platform].up;
    const DeleteIcon = LibComponents.icons[this.store.platform].delete;
    return (
      <tr>
        {
          this.$slots.default?.()
        }
        <td>
          <div class="circle-btn"
               onClick={() => {
                 // props.onMoveDown();
               }}>
            <DownIcon />
            <span class="op-name" />
          </div>
          {
            this.arrayIndex > 0 ? <td>
              <div class="circle-btn"
                   onClick={() => {
                     // props.onMoveDown();
                   }}>
                <UpIcon />
                <span class="op-name" />
              </div>
            </td> : undefined
          }
          {
            <div class="circle-btn text-danger"
                 onClick={() => {
                   // emit('remove');
                 }}>
              <DeleteIcon />
            </div>
          }
        </td>
      </tr>
    )
  }
})


export default defineComponent({
  name: 'TableLayout',
  props: {
    ...baseLayoutProps,
    definition: {
      type: Object
    } as Prop<FieldDefinition>
  },
  setup(props) {
    const renderTitleRow = () => {
      if (Array.isArray(props.definition.fields)) {
        return <tr>
          {
            props.definition.fields.map(it => resolveTitle(it, undefined, undefined))
              .map(it => <th>{it}</th>)
          }
          <th class={'operations-col'}>操作</th>
        </tr>;
      }
    };
    return {
      renderTitleRow
    };
  },
  render() {
    return <table class={'table-layout'}>
      <thead>
        {this.renderTitleRow()}
      </thead>
      <tbody>
        {this.$slots.default().map(it => {
          return <TableRow arrayIndex={it.props.arrayIndex} key={it.props.key}>{it}</TableRow>
        })}
      </tbody>
    </table>;
  }
});
