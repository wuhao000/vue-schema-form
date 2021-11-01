import {computed, defineComponent, PropType, VNode} from 'vue';
import {getFormItemComponent} from '../internal/utils';
import {LibComponents, MOBILE} from '../utils/utils';
import {baseLayoutProps, useBaseLayout} from './base-layout';


function getColProps(span: number) {
  const colProps: any = {};
  if (typeof span === 'number') {
    colProps.span = span;
  } else if (typeof span === 'object') {
    Object.assign(colProps, span);
  }
  return colProps;
}

export default defineComponent({
  name: 'GridLayout',
  props: {
    ...baseLayoutProps,
    layout: {
      type: Array as PropType<any[]>,
      required: true
    },
    title: {
      type: [String, Object]
    },
    gutter: Number,
    wrapSingle: {
      type: Boolean,
      default: true
    },
    rowStyle: [Object, Function],
    rowClass: [Object, String, Function],
    colClass: [Object, String, Function],
    colStyle: [Object, Function]
  },
  setup(props) {
    const {store} = useBaseLayout();
    const containsArray = computed(() => props.layout.some(it => Array.isArray(it)));
    const isMixed = computed(() =>
      props.layout.some(it => typeof it === 'number' || (!Array.isArray(it) && typeof it === 'object')) && props.layout.some(it => Array.isArray(it)));
    const localFields = computed(() => props.fields);
    const getRowStyle = (index) => {
      if (typeof props.rowStyle === 'function') {
        return props.rowStyle(index);
      }
      return props.rowStyle ?? {};
    };
    const getColStyle = (index) => {
      if (typeof props.colStyle === 'function') {
        return props.colStyle(index);
      }
      return props.colStyle ?? {};
    };
    const getRowClass = (index) => {
      if (typeof props.rowClass === 'function') {
        return props.rowClass(index);
      }
      return props.rowClass ?? {};
    };
    const getColClass = (index) => {
      if (typeof props.colClass === 'function') {
        return props.colClass(index);
      }
      return props.colClass ?? {};
    };
    const normalizedLayout = computed<Array<number | number[]>>(() => {
      if (!containsArray.value) {
        return [props.layout as number[]];
      } else {
        return props.layout as number[];
      }
    });
    const toGroups = (fields: VNode[], layout: Array<number | number[]>) => {
      if (!containsArray.value) {
        return [fields];
      }
      const groups = [];
      const tmpFields = [].concat(fields);
      layout.forEach(span => {
        if (Array.isArray(span)) {
          const tmp = tmpFields.splice(0, span.length);
          groups.push(tmp.length ? tmp : null);
        } else {
          const tmp = tmpFields.splice(0, 1);
          groups.push(tmp.length ? tmp[0] : null);
        }
      });
      if (tmpFields.length) {
        tmpFields.forEach(field => groups.push(field));
      }
      return groups;
    }
    const layoutFields = computed(() => {
      const fields = localFields.value;
      const layout: Array<number | number[]> = props.layout;
      const groups = toGroups(fields, layout);
      const LibComponentsCol: any = LibComponents.col[store.platform];
      const LibComponentsRow: any = LibComponents.row[store.platform];

      return normalizedLayout.value.map((span, index) => {
        const group = groups[index];
        if (group) {
          if (Array.isArray(span)) {
            return <LibComponentsRow
              style={getRowStyle(index)}
              class={getRowClass(index)}
              gutter={props.gutter}>
              {
                span.map((subSpan, subindex) => {
                  return (
                    <LibComponentsCol
                      style={getColStyle(subindex)}
                      class={getColClass(subindex)}
                      {...getColProps(subSpan)}>
                      {group[subindex]}
                    </LibComponentsCol>
                  );
                })
              }
            </LibComponentsRow>;
          } else {

            const col = <LibComponentsCol
              style={getColStyle(index)}
              class={getColClass(index)}
              {...getColProps(span)}>{group}</LibComponentsCol>;
            if (props.wrapSingle) {
              return <LibComponentsRow
                style={getRowStyle(index)}
                class={getRowClass(index)}
                gutter={props.gutter}>{col}</LibComponentsRow>;
            }
            return col;
          }
        }
      });
    });
    return {
      localFields,
      layoutFields,
      isMixed,
      store
    };
  },
  render() {
    const {store} = this;
    const LibComponentsRow: any = LibComponents.row[store.platform];
    const {store: {platform}} = this;
    if (platform === MOBILE) {
      return <div>{this.localFields}</div>;
    }
    const FormItemComponent: any = getFormItemComponent(this.store.platform);
    if (this.title) {
      const componentProps = {...this.$attrs, title: this.title, label: this.title};
      return <FormItemComponent {...componentProps}>
        {this.isMixed ?
          <LibComponentsRow gutter={this.gutter}>{this.layoutFields}</LibComponentsRow> : this.layoutFields}
      </FormItemComponent>;
    }
    return this.isMixed ? <LibComponentsRow
        class={'grid-layout'}
        gutter={this.gutter}>{this.layoutFields}</LibComponentsRow> :
      <div class={'grid-layout'}>{this.layoutFields}</div>;
  }
});
