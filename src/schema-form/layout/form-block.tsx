import classNames from 'classnames';
import {defineComponent, inject, isVNode, PropType, TransitionGroup} from 'vue';
import {ClassType, SchemaFormStore} from '../../../types';
import {SchemaFormStoreKey} from '../utils/key';
import {LibComponents} from '../utils/utils';
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
    onMoveDown: Function,
    onRemove: Function,
    display: Boolean,
    platform: String
  },
  emits: ['add', 'remove'],
  setup(props, {emit, attrs}) {
    const store: SchemaFormStore = inject(SchemaFormStoreKey);
    const renderAddBtn = () => {
      const index = props.index;
      if (props.display) {
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
    return {
      store,
      renderOperations,
      renderAddBtn
    };
  },
  render() {
    const {renderOperations, renderAddBtn} = this;
    const DeleteIcon = LibComponents.icons[this.store.platform].delete;
    return <div class="array-item"
                key={this.id}>
      <div class="array-index">
        <span>{this.index + 1}</span>
      </div>
      <div class="array-item-wrapper">{this.$slots.default()}</div>
      {this.display ? undefined : <div class="array-item-operator">
        {renderOperations(this.index)}
        <div class="circle-btn text-danger"
             onClick={() => {
               this.$emit('remove');
             }}>
          <DeleteIcon/>
        </div>
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
    maxItems: Number,
    addText: String,
    title: {
      type: [String, Object]
    },
    class: [String, Object, Array] as PropType<string | string[] | Record<string, unknown>>,
    style: [Object, String],
    removeText: String,
    display: Boolean,
    platform: String
  },
  emits: ['add', 'move-down', 'move-up', 'remove'],
  setup(props, {emit}) {
    const store: SchemaFormStore = inject(SchemaFormStoreKey);
    const renderTitle = (index?: number) => {
      const DeleteIcon = LibComponents.icons[props.platform].delete;
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
      emit('add', index);
    };
    const renderEmpty = () => {
      const PlusIcon = LibComponents.icons[store.platform].plus;
      const EmptyComponent = LibComponents.empty[store.platform];
      return <EmptyComponent description=""
                             onClick={onAdd}>
        {!props.display ? <div class="array-empty">
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
    const {renderTitle} = this;
    const fields = this.$slots.default();
    const props: any = {
      name: 'flip-list',
      class: classNames('schema-form-block schema-form-block-' + this.platform, this.class as ClassType),
      style: this.style,
      tag: 'div'
    };
    return <div class="schema-form-block-wrap schema-form-block-wrap-desktop">
      {renderTitle()}
      {fields.length ? <TransitionGroup {...props}>
        {
          fields.filter(it => it.type?.toString() !== 'Symbol(Comment)').map((it, index) => {
            const key = it.props.value?.__id__;
            return <FormBlockItem
                id={key}
                index={index}
                platform={this.platform}
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
