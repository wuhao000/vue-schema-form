import classNames from 'classnames';
import {defineComponent, inject, TransitionGroup} from 'vue';
import {SchemaFormStore} from '../../../types';
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
    display: Boolean,
    platform: String
  },
  emits: ['add', 'remove'],
  setup(props, {emit}) {
    const store: SchemaFormStore = inject(SchemaFormStoreKey);
    const renderAddBtn = (index: number) => {
      if (index !== props.total - 1 || props.display) {
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
    const {renderOperations, renderAddBtn} = this;
    const DeleteIcon = LibComponents.icons[this.store.platform].delete;
    return <div class="array-item"
                key={this.id}>
      {
        this.platform === 'desktop' ? <div class="array-index">
          <span>{this.index + 1}</span>
        </div> : undefined
      }
      {this.$slots.title()}
      <div class="array-item-wrapper">{this.$slots.default()}</div>
      {this.display || this.platform === 'mobile' ? undefined : <div class="array-item-operator">
        <div class="circle-btn"
             onClick={() => {
               this.$emit('remove');
             }}>
          <DeleteIcon/>
          <span class="op-name">{this.removeText || '删除'}</span>
        </div>
        {renderOperations(this.index)}
      </div>}
      {renderAddBtn(this.index)}
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
    removeText: String,
    display: Boolean,
    platform: String
  },
  emits: ['add', 'move-down', 'move-up', 'remove'],
  setup(props, {emit, slots}) {
    const store: SchemaFormStore = inject(SchemaFormStoreKey);
    const renderTitle = (index: number) => {
      const DeleteIcon = LibComponents.icons[props.platform].delete;
      if (!props.title) {
        return;
      }
      return <div class="schema-form-block-header">
        <div class="schema-form-block-main">
          <div class="schema-form-block-title">
            {props.title}
            {props.platform === 'mobile' ? <span> ({index + 1}) </span> : undefined}
            {
              !props.display && props.platform === 'mobile' ? <label class="circle-btn remove-btn pull-right"
                                                                     onClick={() => {
                                                                       emit('remove', index);
                                                                     }}>
                <DeleteIcon/>
                <span class="op-name">{props.removeText || '删除'}</span>
              </label> : undefined
            }
          </div>
        </div>
      </div>;
    };
    const onAdd = () => {
      emit('add');
    };
    const renderEmpty = () => {
      const PlusIcon = LibComponents.icons[store.platform].plus;
      const EmptyComponent = LibComponents.empty[store.platform];
      if (store.platform === 'mobile') {
        return <m-list
          class="form-block form-block-mobile"
          title={props.title}>
          {!props.display ? <div class="array-item"><div class="array-item-addition">
            <div class="form-block-add-btn"
                 onClick={onAdd}>
              <PlusIcon/>
              <span>添加</span>
            </div>
          </div></div> : undefined}
        </m-list>;
      }
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
    const {store} = this;
    const fields = this.$slots.default();
    const props: any = {
      name: 'flip-list',
      class: classNames('schema-form-block schema-form-block-' + this.platform, this.class),
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
            platform={this.platform}
            total={fields.length}
            maxItems={this.maxItems}
            key={key}
            display={this.display}
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
              title: () => this.renderTitle(index),
              default: () => it
            }}
          />;
        }) : this.renderEmpty()
      }
    </TransitionGroup>;
  }
});
