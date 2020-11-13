import {VNode} from 'vue';
import Component from 'vue-class-component';
import {getFormItemComponent} from '../internal/utils';
import {LibComponents, MOBILE} from '../utils/utils';
import BaseLayout from './base-layout';


@Component({
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
          const col = <LibComponents.col span={span}>{groups[index]}</LibComponents.col>;
          if (wrapSingle) {
            return <LibComponents.row gutter={gutter}>{col}</LibComponents.row>;
          }
          return col;
        } else if (Array.isArray(span)) {
          return <LibComponents.row gutter={gutter}>
            {span.map((subspan, subindex) => {
              return <LibComponents.col span={subspan}>{groups[index][subindex]}</LibComponents.col>;
            })}
          </LibComponents.row>;
        }
      }
    });
    const FormItemComponent = getFormItemComponent(this.store.platform);
    if (this.title) {
      return <FormItemComponent title={this.title}
                                props={this.$attrs}
                                label={this.title}>
        {this.containsNumber ?
            <LibComponents.row gutter={this.gutter}>{layoutFields}</LibComponents.row> : layoutFields}
      </FormItemComponent>;
    }
    return this.containsNumber ? <LibComponents.row gutter={this.gutter}>{layoutFields}</LibComponents.row> :
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
