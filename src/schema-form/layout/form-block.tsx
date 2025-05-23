import classNames from 'classnames';
import {defineComponent, inject, TransitionGroup} from 'vue';
import {ClassType, SchemaFormStore} from '../../../types';
import {SchemaFormStoreKey} from '../utils/key';
import {LibComponents} from '../utils/utils';
import './form-block.less';
import {FORM_BLOCK_PROPS} from './utils';

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
    onMoveDown: Function,
    onRemove: Function,
    display: Boolean,
    showAdd: Boolean,
    showRemove: Boolean
  },
  emits: ['add', 'remove'],
  setup(props, {emit}) {
    const store: SchemaFormStore = inject(SchemaFormStoreKey);
    const renderAddBtn = () => {
      const index = props.index;
      if (props.display || !props.showAdd) {
        return;
      }
      const PlusIcon = LibComponents.icons[store.platform].plus;
      if (props.maxItems && props.maxItems <= props.total) {
        return;
      }
      return (
          <div class="circle-btn"
               onClick={() => {
                 emit('add', index);
               }}>
            <PlusIcon/>
          </div>
      );
    };
    const renderOperations = (index: number) => {
      const DownIcon = LibComponents.icons[store.platform].down;
      const UpIcon = LibComponents.icons[store.platform].up;
      return [
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
      ];
    };
    const renderRemoveBtn = () => {
      if (props.display || !props.showRemove) {
        return;
      }
      const DeleteIcon = LibComponents.icons[store.platform].delete;
      return (
          <div class="circle-btn text-danger"
               onClick={() => {
                 emit('remove');
               }}>
            <DeleteIcon/>
          </div>
      )
    }
    return {
      store,
      renderOperations,
      renderRemoveBtn,
      renderAddBtn
    };
  },
  render() {
    const {renderOperations, renderRemoveBtn, renderAddBtn, store} = this;
    return <div class="array-item"
                key={this.id}>
      <div class="array-index">
        <span>{this.index + 1}</span>
      </div>
      <div class="array-item-wrapper">{this.$slots.default()}</div>
      {this.display ? undefined : <div class="array-item-operator">
        {renderOperations(this.index)}
        {renderRemoveBtn()}
        {renderAddBtn()}
      </div>
      }
    </div>;
  }
});

export default defineComponent({
  name: 'FormBlock',
  inheritAttrs: false,
  props: {
    ...FORM_BLOCK_PROPS
  },
  emits: ['add', 'move-down', 'move-up', 'remove'],
  setup(props, {emit}) {
    const store: SchemaFormStore = inject(SchemaFormStoreKey);
    const renderTitle = (index?: number) => {
      if (!props.title) {
        return;
      }
      return <div class="schema-form-block-header">
        <div class="schema-form-block-main">
          <div class="schema-form-block-title">
            {props.title}
          </div>
        </div>
      </div>;
    };
    const onAdd = (index?: number) => {
      if (!props.showAdd || props.display) {
        return;
      }
      emit('add', index);
    };
    const renderEmpty = () => {
      const PlusIcon = LibComponents.icons[store.platform].plus;
      const EmptyComponent = LibComponents.empty[store.platform];
      return <EmptyComponent description=""
                             onClick={onAdd}>
        {!props.display && props.showAdd ? <div class="array-empty">
          <PlusIcon/>
          <span>添加</span>
        </div> : undefined}
      </EmptyComponent>;
    };
    return {
      store,
      renderTitle,
      renderEmpty,
      onAdd
    };
  },
  render() {
    const {renderTitle, store} = this;
    const fields = this.$slots.default();
    const props: any = {
      name: 'flip-list',
      class: classNames('schema-form-block schema-form-block-' + store.platform, this.class as ClassType),
      style: this.style,
      tag: 'div'
    };
    return <div class="schema-form-block-wrap schema-form-block-wrap-desktop">
      {renderTitle()}
      {fields.length ? <TransitionGroup {...props}>
        {
          fields.filter(field => field.type?.toString() !== 'Symbol(Comment)' && field.props).map((it, index) => {
            const key = it.props.value?.__id__;
            return <FormBlockItem
                id={key}
                index={index}
                showAdd={this.showAdd}
                showRemove={this.showRemove}
                total={fields.length}
                maxItems={this.maxItems}
                key={key}
                display={this.display}
                removeText={this.removeText}
                addText={this.addText}
                onAdd={(index) => {
                  this.$emit('add', index + 1);
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
                  title: () => this.renderTitle(index),
                  default: () => it
                }}
            />;
          })
        }
      </TransitionGroup> : this.renderEmpty()}
    </div>;
  }
});
