export function isMobilePlatform() {
  return navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
}
export const DESKTOP = 'desktop';
export const MOBILE = 'mobile';

export function getPlatform() {
  return isMobilePlatform() ? 'mobile' : 'desktop';
}


export const isNull = (value: any) => {
  return value === undefined || value === null;
};

export const isNotNull = (value: any) => {
  return !isNull(value);
};
