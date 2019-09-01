import BaseLayout from '@/schema-form/layout/base-layout';
import Vue, {VNode} from 'vue';
import Component from 'vue-class-component';
import {Prop} from 'vue-property-decorator';

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

  public render() {
    const {layout, fields} = this;
    const groups = toGroups(fields, layout);
    const layoutFields = layout.map((span, index) => {
      if (groups[index]) {
        if (typeof span === 'number') {
          return <ae-col span={span}>{groups[index]}</ae-col>;
        } else if (Array.isArray(span)) {
          return <ae-row>
            {span.map((subspan, subindex) => {
              return <ae-col span={subspan}>{groups[index][subindex]}</ae-col>;
            })}
          </ae-row>;
        }
      }
    });
    return <ae-row>{layoutFields}</ae-row>;
  }
}
