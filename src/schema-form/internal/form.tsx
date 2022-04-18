import {PlusOutlined} from '@ant-design/icons-vue';
import {computed, defineComponent, PropType, provide, watch} from 'vue';
import {SchemaFormField} from '../../../types';
import {transformFormProps} from '../config';
import {isEqual} from '../uform/utils';
import {SchemaFormObjectStoreKey} from '../utils/key';
import {DESKTOP, getButtonComponent, getFormComponent, getRowComponent, MOBILE} from '../utils/utils';
import {baseFieldComponentProps, useBaseFieldComponent} from './field-based-component';
import {getComponentType, getRealFields} from './utils';

export default defineComponent({
  name: 'SchemaFormInternal',
  inheritAttrs: false,
  props: {
    title: [Object, String],
    arrayIndex: Number,
    pathPrefix: Array,
    index: {type: Boolean as PropType<boolean>, default: false},
    definition: {type: Object as PropType<SchemaFormField>, required: true},
    schemaPath: Array,
    inline: {type: Boolean, default: false},
    layoutType: [String, Object],
    layoutProps: Object,
    ...baseFieldComponentProps
  },
  emits: ['update:value', 'change'],
  setup(props, {emit, slots, attrs}) {
    const {currentValue, store, renderFormField} = useBaseFieldComponent(props, {emit});
    const isMobile = computed(() => store.platform === MOBILE);
    const isDesktop = computed(() => store.platform === DESKTOP);
    const isDisabled = computed(() => store.disabled);
    const isLoading = computed(() => store.loading);
    const isFormDisabled = computed(() => isDisabled.value || isLoading.value);
    watch(() => currentValue.value, (value) => {
      emit('update:value', value);
      emit('change', value);
    }, {deep: true});
    watch(() => props.value, (value) => {
      if (!isEqual(value, currentValue.value)) {
        if ((props.definition as SchemaFormField).array) {
          currentValue.value = value || [];
        } else {
          currentValue.value = value || {};
        }
      } else if (!value) {
        currentValue.value = {};
      }
    }, {immediate: true, deep: true});
    provide(SchemaFormObjectStoreKey as any, {
      index: props.index ?? store.props?.index
    });
    const renderTitle = () => {
      if (slots.title) {
        return slots.title();
      } else if (store.props && props.title) {
        return <h2 class="form-title">{props.title}</h2>;
      }
    };
    const groups = computed(() => {
      const array = [];
      const spanGroups = [];
      let lastHasSpan = false;
      getRealFields(props.definition).forEach((fieldDefinition, index) => {
        const vnode = renderFormField(fieldDefinition, currentValue.value, index, true);
        if (fieldDefinition.span) {
          if (lastHasSpan) {
            spanGroups[spanGroups.length - 1].push(fieldDefinition.span);
            array[array.length - 1].push(vnode);
          } else {
            spanGroups.push([fieldDefinition.span]);
            array.push([vnode]);
          }
          lastHasSpan = true;
        } else {
          lastHasSpan = false;
          spanGroups.push([]);
          array.push([vnode]);
        }
      });
      return array;
    });

    const renderSingleFields = () => {
      const FormComponent: any = getFormComponent(store.platform);
      const {definition, layoutProps, layoutType, inline} = props;
      const formProps: any = getFormProps();
      formProps.onSubmit = e => {
        e.preventDefault();
      };
      const path = [].concat(...props.pathPrefix as string[]);
      path.pop();
      const form = (
          <FormComponent {...formProps}>
            {(definition as SchemaFormField).array ? renderTitle() : null}
            {!(definition as SchemaFormField).array && isDesktop.value ? renderTitle() : null}
            {inline ? groups.value.reduce((a, b) => a.concat(b)) : groups.value.map(group => wrapGroup(group))}
          </FormComponent>
      );
      if (layoutType) {
        const LayoutComponentDef = getComponentType(store, {
          type: layoutType as string
        });
        const LayoutComponentDefComponent = LayoutComponentDef.component;
        return <LayoutComponentDefComponent {...layoutProps as any}>
          {form}
        </LayoutComponentDefComponent>;
      }
      return form;
    };

    const renderAddFormButton = () => {
      const {definition} = props;
      const ButtonComponent: any = getButtonComponent(store.platform);
      if ((definition as SchemaFormField).array && store.editable) {
        return <ButtonComponent
            {...{
              block: true,
              icon: <PlusOutlined/>,
              disabled: isDisabled.value,
              class: 'm-b',
              onClick: () => {
                addSubItem();
              }
            }}>新增一条</ButtonComponent>;
      }
    };
    const addSubItem = () => {
      currentValue.value.push({});
    };

    const wrapGroup = (group: any) => {
      const RowComponent: any = getRowComponent(store.platform);
      const {props: commonProps} = store;
      if (isMobile.value || group.length === 1) {
        return group;
      }
      return <RowComponent gutter={commonProps && commonProps.gutter || 0}>{group}</RowComponent>;
    };
    const getFormProps = () => {
      const obj: any = {
        inline: props.inline,
        labelCol: attrs.labelCol,
        title: slots.title?.() ?? props.title,
        wrapperCol: attrs.wrapperCol,
        disabled: isFormDisabled.value,
        ...store.props,
        ...attrs
      };
      if (attrs.labelWidth) {
        obj.labelWidth = attrs.labelWidth;
      }
      if (attrs.labelPosition) {
        obj.labelPosition = attrs.labelPosition;
      }
      return transformFormProps(obj, store.platform);
    };
    return {
      renderSingleFields,
      renderAddFormButton,
      currentValue
    };
  },
  render() {
    return <div class="schema-form-internal">
      {this.renderSingleFields()}
      {this.renderAddFormButton()}
    </div>;
  }
});
