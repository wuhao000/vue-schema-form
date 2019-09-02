import {getFormItemComponent} from '@/schema-form/internal/utils';
import BaseLayout from '@/schema-form/layout/base-layout';
import {VNode} from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';
import { LibComponents } from '../utils/utils';

function toGroups(fields: VNode[], layout: Array<number | number[]>) {
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

  public render() {
    const {layout, fields} = this;
    const groups = toGroups(fields, layout);
    const layoutFields = layout.map((span, index) => {
      if (groups[index]) {
        if (typeof span === 'number') {
          return <LibComponents.col span={span}>{groups[index]}</LibComponents.col>;
        } else if (Array.isArray(span)) {
          return <LibComponents.row gutter={this.gutter}>
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
        <LibComponents.row gutter={this.gutter}>{layoutFields}</LibComponents.row>
      </FormItemComponent>;
    }
    return <LibComponents.row gutter={this.gutter}>{layoutFields}</LibComponents.row>;
  }
}
