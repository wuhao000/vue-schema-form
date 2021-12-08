import classNames from 'classnames';
import {defineComponent, inject, TransitionGroup} from 'vue';
import {SchemaFormStore} from '../../../types';
import {SchemaFormStoreKey} from '../utils/key';
import {LibComponents, uuid} from '../utils/utils';
import './form-block.less';

const FormBlockItem = defineComponent({
  name: 'FormBlockItem',
  props: {
    id: String,
    index: Number,
    total: Number,
    removeText: String,
    addText: String,
    maxItems: Number,
    onMoveUp: Function,
    onMoveDown: Function
  },
  emits: ['add', 'remove'],
  setup(props, {emit}) {
    const store: SchemaFormStore = inject(SchemaFormStoreKey);
    const renderAddBtn = (index: number) => {
      if (index !== props.total - 1) {
        return;
      }
      const PlusIcon = LibComponents.icons[store.platform].plus;
      if (props.maxItems && props.maxItems <= props.total) {
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
      return props.total > 1 ? [
        index !== props.total - 1
            ? <div class="circle-btn"
                   onClick={() => {
                     props.onMoveDown();
                   }}>
              <DownIcon/>
              <span class="op-name"/>
            </div> : null,
        index !== 0 ? <div class="circle-btn" onClick={() => {
          props.onMoveUp();
        }}>
          <UpIcon/>
          <span class="op-name"/>
        </div> : null
      ] : null;
    };
    return {
      store,
      renderOperations,
      renderAddBtn
    };
  },
  render() {
    const DeleteIcon = LibComponents.icons[this.store.platform].delete;
    return <div class="array-item"
                key={this.id}>
      <div class="array-index">
        <span>{this.index + 1}</span>
      </div>
      {this.$slots.title()}
      <div class="array-item-wrapper">{this.$slots.default()}</div>
      <div class="array-item-operator">
        <div class="circle-btn"
             onClick={() => {
               this.$emit('remove');
             }}>
          <DeleteIcon/>
          <span class="op-name">{this.removeText || '删除'}</span>
        </div>
        {this.renderOperations(this.index)}
      </div>
      {this.renderAddBtn(this.index)}
    </div>;
  }
});

export default defineComponent({
  name: 'FormBlock',
  inheritAttrs: false,
  props: {
    maxItems: Number,
    addText: String,
    title: {
      type: [String, Object]
    },
    class: [String, Object, Array],
    style: [Object, String],
    removeText: String
  },
  emits: ['add', 'move-down', 'move-up', 'remove'],
  setup(props, {emit, slots}) {
    const store: SchemaFormStore = inject(SchemaFormStoreKey);
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
      renderTitle,
      onAdd: () => {
        emit('add');
      }
    };
  },
  render() {
    const {store} = this;
    const PlusIcon = LibComponents.icons[store.platform].plus;
    const EmptyComponent = LibComponents.empty[store.platform];
    const fields = this.$slots.default();
    const props: any = {
      name: 'flip-list',
      class: classNames('schema-form-block', this.class),
      style: this.style,
      tag: 'div'
    };
    return <TransitionGroup {...props}>
      {
        fields.length ? fields.map((it, index) => {
          const key = it.props.value.__id__;
          return <FormBlockItem
              id={key}
              index={index}
              total={fields.length}
              maxItems={this.maxItems}
              key={key}
              removeText={this.removeText}
              addText={this.addText}
              onAdd={() => {
                this.$emit('add');
              }}
              onRemove={() => {
                this.$emit('remove', index);
              }}
              onMoveUp={() => {
                this.$emit('move-up', index);
              }}
              onMoveDown={() => {
                this.$emit('move-down', index);
              }}
              v-slots={{
                title: () => this.renderTitle(),
                default: () => it
              }}
          />;
        }) : <EmptyComponent description=""
                             onClick={this.onAdd}>
          <div class="array-empty">
            <PlusIcon/>
            <span>添加</span>
          </div>
        </EmptyComponent>
      }
    </TransitionGroup>;
  }
});
