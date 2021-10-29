import {globalThisPolyfill} from './globalThis';

type Filter = (value: any, key: string) => boolean;

const NATIVE_KEYS = [
  ['Map', (map: any) => new Map(map)],
  ['WeakMap', (map: any) => new WeakMap(map)],
  ['WeakSet', (set: any) => new WeakSet(set)],
  ['Set', (set: any) => new Set(set)],
  ['Date', (date: any) => new Date(date)],
  'FileList',
  'File',
  'URL',
  'RegExp',
  [
    'Promise',
    (promise: Promise<any>) =>
      new Promise((resolve, reject) => promise.then(resolve, reject))
  ]
];

const isNativeObject = (values: any): any => {
  for (let i = 0; i < NATIVE_KEYS.length; i++) {
    const item = NATIVE_KEYS[i];
    if (Array.isArray(item) && item[0]) {
      if (
        globalThisPolyfill[item[0] as string] &&
        values instanceof globalThisPolyfill[item[0] as string]
      ) {
        return item[1] ? item[1] : item[0];
      }
    } else {
      if (
        globalThisPolyfill[item as string] &&
        values instanceof globalThisPolyfill[item as string]
      ) {
        return item;
      }
    }
  }
};
