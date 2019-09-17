import BaseLayout from './base-layout';
import Component from 'vue-class-component';
import './text-box.less';

@Component({
  name: 'TextBox'
})
export default class TextBox extends BaseLayout {

  public render() {
    let array = [];
    const fields = [].concat(this.fields);
    if (this.layout) {
      const split = this.layout.split('%s');
      split.forEach((item) => {
        if (item.length) {
          array.push(item);
        }
        array.push(fields.splice(0, 1));
      });
    }
    if (fields.length) {
      array = array.concat(fields);
    }
    return <div class="vf-layout-text-box">{array}</div>;
  }

}
