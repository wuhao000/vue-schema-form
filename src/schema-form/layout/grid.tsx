import {VNode} from 'vue';
import {Options, Vue} from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import {getFormItemComponent} from '../internal/utils';
import {LibComponents, MOBILE} from '../utils/utils';
import BaseLayout from './base-layout';

const LibComponentsRow = LibComponents.row;
const LibComponentsCol = LibComponents.col;
@Options({
  name: 'GridLayout'
})
export default class GridLayout extends BaseLayout {

  @Prop({type: Array, required: true})
  public layout: Array<number | number[]>;
  @Prop()
  public title: any;
  @Prop(Number)
  public gutter: number;
  @Prop({type: Boolean, default: true})
  public wrapSingle: boolean;

  get containsArray() {
    return this.layout.some(it => Array.isArray(it));
  }

  get containsNumber() {
    return this.layout.some(it => typeof it === 'number');
  }

  public render() {
    const {layout, fields, wrapSingle, gutter, store: {platform}} = this;
    if (platform === MOBILE) {
      return <div>{this.$slots.default}</div>;
    }
    const groups = this.toGroups(fields, layout);
    const normalizedLayout = this.getNormalizedLayout();
    const layoutFields = normalizedLayout.map((span, index) => {
      if (groups[index]) {
        if (typeof span === 'number') {
          const col = <LibComponentsCol span={span}>{groups[index]}</LibComponentsCol>;
          if (wrapSingle) {
            return <LibComponentsRow gutter={gutter}>{col}</LibComponentsRow>;
          }
          return col;
        } else if (Array.isArray(span)) {
          return <LibComponentsRow gutter={gutter}>
            {span.map((subspan, subindex) => {
              return <LibComponentsCol span={subspan}>{groups[index][subindex]}</LibComponentsCol>;
            })}
          </LibComponentsRow>;
        }
      }
    });
    const FormItemComponent = getFormItemComponent(this.store.platform);
    if (this.title) {
      return <FormItemComponent title={this.title}
                                props={this.$attrs}
                                label={this.title}>
        {this.containsNumber ?
            <LibComponentsRow gutter={this.gutter}>{layoutFields}</LibComponentsRow> : layoutFields}
      </FormItemComponent>;
    }
    return this.containsNumber ? <LibComponentsRow gutter={this.gutter}>{layoutFields}</LibComponentsRow> :
        <div>{layoutFields}</div>;
  }

  public toGroups(fields: VNode[], layout: Array<number | number[]>) {
    if (!this.containsArray) {
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

  private getNormalizedLayout(): Array<number | number[]> {
    if (!this.containsArray) {
      return [this.layout as number[]];
    } else {
      return this.layout;
    }
  }
}
