import {defineComponent, inject, ref, watch} from 'vue';
import {SchemaFormStore} from '../../types';
import {SchemaFormStoreKey} from './utils/key';
import {ASchemaForm, getButtonComponent, getColComponent, getRowComponent, MOBILE} from './utils/utils';

export default defineComponent({
  name: 'BaseArrayComponent',
  props: {
    value: Array,
    cellSpan: {type: Number, default: 12},
    addBtnText: String,
    addBtnProps: Object,
    maxLength: {type: Number, default: 0},
    component: String,
    disabled: {type: Boolean, default: false}
  },
  emits: ['change', 'update:value'],
  setup(props, {emit}) {
    const current = ref(props.value ?? []);
    const store: SchemaFormStore = inject(SchemaFormStoreKey);
    const onAddClick = () => {
      (current.value as any[]).push(null);
    };
    watch(() => props.value, (value) => {
      current.value = value ?? [];
    });
    watch(() => current.value, () => {
      emit('update:value', current);
      emit('change', current);
    });
    const renderAddButton = () => {
      if (!store.editable) {
        return null;
      }
      const ColComponent: any = getColComponent(store.platform);
      let ButtonComponent: any = getButtonComponent(store.platform);
      if (props.maxLength > 0 && (current.value as any[]).length >= props.maxLength) {
        return null;
      }
      if (store.platform === MOBILE) {
        ButtonComponent = 'm-button';
      }
      const buttonStyle: any = {};
      if (props.addBtnProps?.block) {
        buttonStyle.width = '100%';
      }
      const button = <ButtonComponent onClick={onAddClick}
                                      disabled={props.disabled}
                                      style={buttonStyle}
                                      icon="plus"
                                      attrs={Object.assign({}, props.addBtnProps)}>{props.addBtnText || '添加'}</ButtonComponent>;
      if (props.component === ASchemaForm) {
        return <div style={{margin: '10px 15px'}}>{button}</div>;
      }
      return <ColComponent span={props.cellSpan}>{button}</ColComponent>;
    };

    return {
      validate: () => {
        return true;
      },
      renderAddButton,
      current, store
    };
  },
  render() {
    const {store, current} = this;
    const InputComponent: any = this.component;
    const RowComponent: any = getRowComponent(store.platform);
    const ColComponent: any = getColComponent(store.platform);
    const content = [
      (current as any[]).map((v, index) => {
        const input = <InputComponent
          attrs={Object.assign({arrayIndex: index}, this.$attrs)}
          onRemove={async (index) => {
            // todo
            // await this.$mconfirm('确定删除此项吗?', '提示');
            (current as any[]).splice(index, 1);
          }}
          vModel={this.current[index]}/>;
        if (this.component === ASchemaForm) {
          return input;
        }
        return <ColComponent span={this.cellSpan}>{input}</ColComponent>;
      }),
      this.renderAddButton()
    ];
    if (this.component === ASchemaForm) {
      return <div>{content}</div>;
    }
    if (this.store.platform === MOBILE) {
      return content;
    } else {
      return <RowComponent gutter={this.$attrs.gutter || 20}
                           type="flex">{content}</RowComponent>;
    }
  }
});

