import {PlusOutlined} from '@ant-design/icons-vue';
import classNames from 'classnames';
import {computed, ComputedRef, defineComponent, inject, PropType, VNode} from 'vue';
import {BaseArrayComponentProps, SchemaFormStore} from '../../../types';
import {FieldDefinition} from '../internal/utils';
import {SchemaFormStoreKey} from '../utils/key';
import {
  getButtonComponent,
  getColComponent,
  getContentComponent,
  getLayoutComponent,
  getRowComponent,
  getSiderComponent,
  LibComponents,
  MOBILE
} from '../utils/utils';
import './style/array-wrapper.less';

export const baseArrayComponentProps: BaseArrayComponentProps = {
  maxLength: {type: Number, default: 0},
  showRemoveBtn: {type: Boolean, default: true},
  showAddBtn: {type: Boolean, default: true},
  disabled: {type: Boolean, default: false},
  fields: {type: [Array, Object]},
  addBtnText: {type: String},
  addBtnProps: {type: Object},
  deleteBtnProps: {type: Object}
};

export default defineComponent({
  name: 'ArrayWrapper',
  inheritAttrs: false,
  props: {
    field: {type: Object as PropType<FieldDefinition>, required: true},
    cellSpan: {type: Number, default: 24},
    gutter: {type: Number, default: 20},
    subForm: {type: Boolean, default: false},
    clsPrefix: {type: String, default: 'schema-form-array-wrapper'},
    ...baseArrayComponentProps
  },
emits: ['add', 'remove'],
  setup(props, {slots, emit}) {
    const field: ComputedRef<FieldDefinition> = computed(() => {
      return props.field as FieldDefinition;
    });
    const store: SchemaFormStore = inject(SchemaFormStoreKey);
    const editable = computed(() => {
      return store.editable && field.value.editable;
    });
    const renderAddButton = () => {
      if (!editable.value || !props.showAddBtn || (props.maxLength > 0 && slots.default
          && (props.fields as VNode[]).length >= props.maxLength)) {
        return null;
      }
      const ColComponent: any = getColComponent(store.platform);
      const ButtonComponent: any = getButtonComponent(store.platform);
      const buttonStyle: any = {};
      if ((props.addBtnProps as any)?.block) {
        buttonStyle.width = '100%';
      }
      const addButtonProps: any = Object.assign({
        icon: <PlusOutlined/>
      }, props.addBtnProps);
      addButtonProps.disabled = disabled.value || addButtonProps.disabled;
      if (!addButtonProps.icon) {
        const ButtonIcon = LibComponents.icons[store.platform].plus;
        addButtonProps.icon = <ButtonIcon/>;
      }
      const button = <ButtonComponent onClick={onAddClick}
                                      style={buttonStyle}
                                      {...addButtonProps}>{props.addBtnText || '添加'}</ButtonComponent>;
      if (props.subForm) {
        return <div style={{margin: '10px 15px'}}>{button}</div>;
      }
      return <ColComponent span={props.cellSpan}>{button}</ColComponent>;
    };
    const onAddClick = () => {
      emit('add');
    };
    const renderFields = () => {
      const ColComponent: any = getColComponent(store.platform);
      const LayoutComponent = getLayoutComponent(store.platform);
      const ASideComponent = getSiderComponent(store.platform);
      const ContentComponent = getContentComponent(store.platform);
      if (store.platform === MOBILE) {
        return (props.fields as VNode[]).map((it, index) => {
          return <div style={{position: 'relative'}}>{
            [renderDeleteBtn(index), it]
          }</div>;
        });
      }
      const fields = props.fields || [];
      if (Array.isArray(fields)) {
        return fields.map((it, index) => {
          return (
              <ColComponent span={props.cellSpan}>
                <LayoutComponent>
                  <ContentComponent style={{
                    overflow: 'hidden'
                  }}>{it}</ContentComponent>
                  <ASideComponent
                      width={props.deleteBtnProps?.['width'] ?? 'auto'}>{renderDeleteBtn(index)}</ASideComponent>
                </LayoutComponent>
              </ColComponent>
          );
        });
      }
      return undefined;
    };
    const disabled = computed(() => {
      return props.disabled || store.disabled || store.loading;
    });
    const renderDeleteBtn = (index: any) => {
      const DeleteIcon = LibComponents.icons[store.platform].delete;
      if (!editable.value || !props.showRemoveBtn) {
        return null;
      }
      const delBtnClass = classNames(props.clsPrefix + '-del-btn', {
        [props.clsPrefix + '-del-btn-disabled']: disabled.value
      });
      return <div class={props.clsPrefix + '-del-btn-wrapper'}>
        <a class={delBtnClass}
           onClick={() => {
             if (!disabled.value) {
               emit('remove', index);
             }
           }}>
          <DeleteIcon/>
          <span>删除</span>
        </a>
      </div>;
    };
    return {
      renderFields,
      renderAddButton,
      store
    };
  },
  render() {
    const {store} = this;
    const RowComponent: any = getRowComponent(store.platform);
    const content = [
      this.renderFields(),
      this.renderAddButton()
    ];
    if (this.subForm) {
      return <div class={this.clsPrefix}>{content}</div>;
    }

    if (this.$attrs.platform === 'mobile') {
      return content;
    } else {
      return <RowComponent gutter={this.gutter}
                           class={this.clsPrefix}
                           type="flex">
        {content}
      </RowComponent>;
    }
  }
});