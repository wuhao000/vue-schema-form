import classNames from 'classnames';
import {defineComponent, inject, TransitionGroup} from 'vue';
import {ClassType, SchemaFormStore} from '../../../types';
import {SchemaFormStoreKey} from '../utils/key';
import {LibComponents} from '../utils/utils';
import './form-block.less';

const FormBlockItem = defineComponent({
  name: 'MFormBlockItem',
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
  setup(props, {slots}) {
    const store: SchemaFormStore = inject(SchemaFormStoreKey);
    const renderAddBtn = () => {
      if (props.display || (props.maxItems && props.maxItems <= props.total)) {
        return;
      }
      return slots.addButton();
    };
    return {
      store,
      renderAddBtn
    };
  },
  render() {
    const {renderAddBtn} = this;
    return <div class="array-item"
                key={this.id}>
      {this.$slots.title()}
      <div class="array-item-wrapper">{this.$slots.default()}</div>
      {renderAddBtn()}
    </div>;
  }
});

export default defineComponent({
  name: 'MFormBlock',
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
            <span> ({index + 1}) </span>
            {
              !props.display ? <label class="circle-btn remove-btn"
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
    const onAdd = (index?: number) => {
      emit('add', index);
    };
    const renderAddBtn = (index: number) => {
      const PlusIcon = LibComponents.icons[store.platform].plus;
      return <div class="array-item-addition">
        <div class="form-block-add-btn"
             onClick={() => {
               onAdd(index);
             }}>
          <PlusIcon/>
          <span>添加</span>
        </div>
      </div>;
    };
    const renderEmpty = () => {
      return <m-list
          class={'form-block form-block-mobile'}
          title={props.title}>
        {!props.display ? <div class="array-item">
          {renderAddBtn(0)}
        </div> : undefined}
      </m-list>;
    };
    return {
      store,
      renderTitle,
      renderEmpty,
      renderAddBtn,
      onAdd
    };
  },
  render() {
    const {renderTitle, renderAddBtn} = this;
    const fields = this.$slots.default();
    const props: any = {
      name: 'flip-list',
      class: classNames('schema-form-block schema-form-block-' + this.platform, this.class as ClassType),
      style: this.style,
      tag: 'div'
    };
    return <div class="schema-form-block-wrap schema-form-block-wrap-mobile">
      <TransitionGroup {...props}>
        {
          fields.length ? fields.filter(it => it.type?.toString() !== 'Symbol(Comment)').map((it, index) => {
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
                  title: () => renderTitle(index),
                  addButton: () => renderAddBtn(index + 1),
                  default: () => it
                }}
            />;
          }) : this.renderEmpty()
        }
      </TransitionGroup>
    </div>;
  }
});
