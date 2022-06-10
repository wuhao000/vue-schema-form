import {isVNode} from 'vue';
import {getOptionProperty} from '../utils/utils';

export default (props) => {
  const {field, value} = props;
  const options = props.options || field.options;
  const valueProperty = field.props.valueProperty || 'value';
  const labelProperty = field.props.labelProperty || 'label';
  if (value && options) {
    let selected = [];
    if (field.array) {
      selected = options.filter(it => value.includes(getOptionProperty(it, valueProperty)) || value.includes(it));
    } else {
      selected = options.filter(it => value === getOptionProperty(it, valueProperty) || value === it);
    }
    const labels = selected.map(it => getOptionProperty(it, labelProperty))
    if (labels.some(it => isVNode(it))) {
      return <span>{labels}</span>;
    }
    return <span>{labels.join('、')}</span>;
  } else {
    return <span/>;
  }
}
