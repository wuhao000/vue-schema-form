import {formatTime} from '../utils/time';

export default (props) => {
  const {value, definition} = props;
  let format = props.format || 'YYYY-MM-DD HH:mm:ss';
  if (definition.type === 'date') {
    format = 'YYYY-MM-DD';
  } else if (definition.type === 'month') {
    format = 'YYYY-MM';
  } else if (definition.type === 'year') {
    format = 'YYYY';
  } else if (definition.type === 'daterange') {
    format = 'YYYY-MM-DD';
  } else if (definition.type === 'time') {
    format = 'HH:mm:ss';
  }
  if (['daterange', 'timerange'].includes(definition.type) && value) {
    return (
        <span>
          <span>
            {formatTime(value[0], format)}
          </span>
          <span> - </span>
          <span>
            {formatTime(value[1], format)}
          </span>
        </span>
    );
  }
  return (
      <span>
        {formatTime(value, format)}
      </span>
  );
}
