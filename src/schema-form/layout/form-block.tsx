import {computed, defineComponent, inject} from 'vue';
import {SchemaFormStore} from '../../../types';
import {SchemaFormStoreKey} from '../utils/key';
import {LibComponents} from '../utils/utils';
import {baseLayoutProps} from './base-layout';
import './form-block.less';


export default defineComponent({
  name: 'FormBlock',
  props: {
    maxItems: Number,
    addText: String,
    title: {
      type: [String, Object]
    },
    removeText: String,
    fields: baseLayoutProps.fields
  },
  emits: ['add', 'move-down', 'move-up', 'remove'],
  setup(props, {emit}) {
    const store: SchemaFormStore = inject(SchemaFormStoreKey);
    const localFields = computed(() => props.fields as any[]);
    const renderAddBtn = (index: number) => {
      if (index !== localFields.value.length - 1) {
        return;
      }
      const PlusIcon = LibComponents.icons[store.platform].plus;
      if (props.maxItems && props.maxItems <= localFields.value.length) {
        return;
      }
      return <div class="array-item-addition">
        <div class="form-block-add-btn"
             onClick={() => {
               emit('add');
             }}>
          <PlusIcon/>
          {props.addText || '添加'}
        </div>
      </div>;
    };
    const renderOperations = (index: number) => {
      const DownIcon = LibComponents.icons[store.platform].down;
      const UpIcon = LibComponents.icons[store.platform].up;
      return localFields.value.length > 1 ? [
        index !== localFields.value.length - 1
          ? <div class="circle-btn"
                 onClick={() => {
                   emit('move-down', index);
                 }}>
            <DownIcon/>
            <span class="op-name"/>
          </div> : null,
        index !== 0 ? <div class="circle-btn" onClick={() => {
          emit('move-up', index);
        }}>
          <UpIcon/>
          <span class="op-name"/>
        </div> : null
      ] : null;
    };
    const renderTitle = () => {
      if (!props.title) {
        return;
      }
      return <div class="schema-form-block-header">
        <div class="schema-form-block-main">
          <div class="schema-form-block-title">{props.title}</div>
        </div>
      </div>;
    };
    return {
      store,
      renderAddBtn,
      renderTitle,
      onRemove(index: number) {
        emit('remove', index);
      },
      localFields,
      renderOperations,
      onAdd: () => {
        emit('add');
      }
    };
  },
  render() {
    const {store} = this;
    const DeleteIcon = LibComponents.icons[store.platform].delete;
    const PlusIcon = LibComponents.icons[store.platform].plus;
    const EmptyComponent = LibComponents.empty[store.platform];

    return <div class="schema-form-block">
      {
        this.localFields.length ? this.localFields.map((it, index) => {
          return <div class="array-item" key={'item-' + index}>
            <div class="array-index">
              <span>{index + 1}</span>
            </div>
            {
              this.renderTitle()
            }
            <div class="array-item-wrapper">{it}</div>
            <div class="array-item-operator">
              <div class="circle-btn"
                   onClick={() => {
                     this.onRemove(index);
                   }}>
                <DeleteIcon/>
                <span class="op-name">{this.removeText || '删除'}</span>
              </div>
              {this.renderOperations(index)}
            </div>
            {this.renderAddBtn(index)}
          </div>;
        }) : <EmptyComponent description=""
                             onClick={this.onAdd}>
          <div class="array-empty">
            <PlusIcon/>
            <span>添加</span>
          </div>
        </EmptyComponent>
      }
    </div>;
  }
});
