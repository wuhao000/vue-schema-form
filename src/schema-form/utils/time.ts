import moment from 'moment';

export const formatTime = (value: Date | number | string, fmt?: string, pretty: boolean = false): string => {
  let text = '';
  const format = 'YYYY-MM-DD HH:mm:ss';
  let date: Date;
  if (typeof value === 'string') {
    const reg1 = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/;
    if (reg1.test(value)) {
      date = moment(value, 'YYYY-MM-DDTHH:mm:ss.sZ').toDate();
      date.setHours(date.getHours() + 8);
    } else {
      text = value;
    }
  } else {
    date = new Date(value);
    if (!value) {
      text = '';
    } else {
      text = moment(value).format(format);
      if (fmt) {
        text = moment(value).format(fmt);
      }
    }
  }
  // @ts-ignore
  if (pretty && date) {
    const now = new Date();
    const nowTime = now.getTime();
    const difference: number = nowTime - date.getTime();
    if (difference > 0) {
      if (difference < 1000) {
        text = '刚刚';
      } else if (difference < 60 * 1000) {
        text = `${Math.floor(difference / 1000)}秒前`;
      } else if (difference < 60 * 1000 * 60) {
        text = `${Math.floor(difference / 1000 / 60)}分钟前`;
      } else if (now.getFullYear() === date.getFullYear()) {
        if (now.getMonth() === date.getMonth()
          && now.getDay() === date.getDay()) {
          text = moment(date).format('HH:mm:ss');
        } else {
          text = moment(date).format('MM-DD HH:mm:ss');
        }
      }
    } else if (now.getFullYear() === date.getFullYear()) {
      if (now.getMonth() === date.getMonth()
        && now.getDay() === date.getDay()) {
        text = moment(date).format('HH:mm:ss');
      } else {
        text = moment(date).format('MM-DD HH:mm:ss');
      }
    }
  }
  return text;
};
