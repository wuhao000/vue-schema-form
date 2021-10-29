import {resolveOptions} from '../utils/utils';

export default (props) => {
  const {field, value} = props;
  const options = resolveOptions(field);
  const valueProperty = field.props.valueProperty || 'value';

  const labelProperty = field.props.labelProperty || 'label';

  if (value) {
    let selected = [];
    if (field.array) {
      selected = options.filter(it => value.includes(it[valueProperty]) || value.includes(it));
    } else {
      selected = options.filter(it => value === it[valueProperty] || value === it);
    }
    return <span>{selected.map(it => typeof it === 'object' ? it[labelProperty] : it).join('、')}</span>;
  } else {
    return <span/>;
  }
}
