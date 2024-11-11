import { baseLayoutProps } from './base-layout';
import { defineComponent, inject, Prop, PropType, ref, TransitionGroup } from 'vue';
import { FieldDefinition } from '../bean/field-definition';
import { LibComponents, resolveTitle } from '../utils/utils';
import './table.less';
import { useBaseFieldComponent } from '../internal/field-based-component';
import { PlusCircleFilled, PlusCircleTwoTone } from '@ant-design/icons-vue';
import classNames from 'classnames';
import { ClassType, SchemaFormStore } from '../../../types';
import { SchemaFormStoreKey } from '../utils/key';

const TableRow = defineComponent({
  name: 'TableRow',
  props: {
    arrayIndex: Number,
    showMoveUp: Boolean,
    showMoveDown: Boolean
  },
  emits: ['add', 'remove', 'move-up', 'move-down', 'show-add', 'hide-add'],
  setup(props, {emit}) {
    const {store} = useBaseFieldComponent(props, {emit});
    const renderMoveUp = () => {
      const UpIcon = LibComponents.icons[store.platform].up;
      return props.showMoveUp ?
        <div class="circle-btn"
             onClick={() => {
               emit('move-up');
             }}>
          <UpIcon />
          <span class="op-name" />
        </div> : undefined;
    };
    const renderMoveDown = () => {
      if (!props.showMoveDown) {
        return undefined;
      }
      const DownIcon = LibComponents.icons[store.platform].down;
      return <div class="circle-btn"
                  onClick={() => {
                    emit('move-down');
                  }}>
        <DownIcon />
        <span class="op-name" />
      </div>;
    };
    const renderRemove = () => {
      const DeleteIcon = LibComponents.icons[store.platform].delete;
      return <div class="circle-btn text-danger"
                  onClick={() => {
                    emit('remove');
                  }}>
        <DeleteIcon />
      </div>;
    };
    return {
      renderMoveDown,
      renderMoveUp,
      renderRemove,
      store
    };
  },
  render() {
    return <div
      onMouseenter={() => {
        this.$emit('show-add', this.$el);
      }}
      onMouseleave={() => {
        this.$emit('hide-add');
      }}
      class={'table-row'}>
      {this.$slots.default?.()}
      <div class={'table-cell'}>
        {this.renderMoveDown()}
        {this.renderMoveUp()}
        {this.renderRemove()}
      </div>
    </div>;
  }
});

export default defineComponent({
  name: 'TableLayout',
  props: {
    ...baseLayoutProps,
    addText: String,
    title: {
      type: [String, Object]
    },
    showAdd: {
      type: Boolean,
      default: true
    },
    showRemove: {
      type: Boolean,
      default: true
    },
    definition: {
      type: Object
    } as Prop<FieldDefinition>,
    class: [String, Object, Array] as PropType<string | string[] | Record<string, unknown>>,
    style: [Object, String]
  },
  emits: ['add', 'remove', 'move-up', 'move-down'],
  setup(props) {
    const store: SchemaFormStore = inject(SchemaFormStoreKey);
    const FormItem = LibComponents.formItem[store.platform];
    const renderTitleRow = () => {
      if (Array.isArray(props.definition.fields)) {
        return <div class={'table-row table-header-row'}>
          {
            props.definition.fields
              .map(it => <div class={'table-cell'}>
                <FormItem
                  label={resolveTitle(it, undefined, undefined)}
                  required={it.required}
                  tip={it.description}
                />
              </div>)
          }
          <div class={'operations-col table-cell'}>操作</div>
        </div>;
      }
    };
    const addOffset = ref(0);
    const addVisible = ref(false);
    return {
      renderTitleRow,
      store,
      addOffset,
      addVisible
    };
  },
  render() {
    const props = {
      name: 'flip-list',
      class: classNames('table-layout-body table-layout-body-' + this.store.platform, this.class as ClassType),
      style: this.style,
      tag: 'div'
    };
    const rows = this.$slots.default();
    const FormItem = LibComponents.formItem[this.store.platform];
    return (
      <FormItem label={this.title}>
        <div class={'table-layout-wrapper'}>
          <div
            class={'table-layout'}>
            {this.renderTitleRow()}
            <TransitionGroup {...props}>
              {rows.map((it, index) => {
                return <TableRow
                  showMoveDown={index !== rows.length - 1}
                  showRemove={this.showRemove}
                  showMoveUp={it.props.arrayIndex !== 0}
                  onAdd={() => {
                    this.$emit('add', it.props.arrayIndex + 1);
                  }}
                  onMoveUp={() => {
                    this.$emit('move-up', it.props.arrayIndex);
                  }}
                  onMoveDown={() => {
                    this.$emit('move-down', it.props.arrayIndex);
                  }}
                  onRemove={() => {
                    this.$emit('remove', it.props.arrayIndex);
                    this.addVisible = false;
                  }}
                  onShowAdd={(el: HTMLDivElement) => {
                    if (index !== rows.length - 1) {
                      this.addOffset = el.offsetTop + el.offsetHeight;
                      this.addVisible = true;
                    }
                  }}
                  onHideAdd={() => {
                    this.addVisible = false;
                  }}
                  arrayIndex={it.props.arrayIndex}
                  key={it.props.key}>{it}</TableRow>;
              })}
            </TransitionGroup>
            <div
              onMouseenter={() => {
                this.addVisible = true;
              }}
              onMouseleave={() => {
                this.addVisible = false;
              }}
              style={{
                top: `${this.addOffset}px`
              }}
              class={{
                'add-row': true,
                'add-row-visible': this.addVisible
              }}>
              <div class={'table-cell'}>
                <div class="add-row-btn" onClick={() => {
                  this.$emit('add');
                }}>
                  <PlusCircleFilled />
                </div>
              </div>
            </div>
          </div>
          {
            this.showAdd ? <div class={'table-row table-row-default-add'}>
              <div onClick={() => {
                this.$emit('add')
              }}>
                <PlusCircleTwoTone />
                {this.addText ? <span>{this.addText}</span> : undefined}
              </div>
            </div> : undefined
          }
        </div>
      </FormItem>
    );
  }
});
