import {isVNode} from 'vue';

export default (props) => {
  const {field, value} = props;
  const options = field.options;
  const valueProperty = field.props.valueProperty || 'value';
  const labelProperty = field.props.labelProperty || 'label';
  if (value) {
    let selected = [];
    if (field.array) {
      selected = options.filter(it => value.includes(it[valueProperty]) || value.includes(it));
    } else {
      selected = options.filter(it => value === it[valueProperty] || value === it);
    }
    const labels = selected.map(it => typeof it === 'object' ? it[labelProperty] : it)
    if (labels.some(it => isVNode(it))) {
      return <span>{labels}</span>;
    }
    return <span>{labels.join('、')}</span>;
  } else {
    return <span/>;
  }
}
