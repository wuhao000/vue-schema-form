import {IField} from '@/uform/types';
import flatten from 'lodash.flatten';

const CACHE = {};

export const PATH_SEPARATOR = '.';

export const splitPath = (path: string): string[] => {
  if (CACHE[path]) {
    return CACHE[path];
  } else {
    return path.split(PATH_SEPARATOR);
  }
};

export function match(paths: string[], fields: { [key: string]: IField }): string[] {
  return flatten(paths.map(it => matchSinglePath(it, fields)));
}

export function replaceLastPath(paths: string[], last: string) {
  return paths.map(it => {
    const splits = splitPath(it);
    splits[splits.length - 1] = last;
    return splits.join(PATH_SEPARATOR);
  });
}

export function appendPath(paths: string[], suffix: string): string[] {
  if (paths) {
    return paths.map(path => path + PATH_SEPARATOR + suffix);
  } else {
    return [suffix];
  }
}

export function takePath(paths: string[], to: number): string[] {
  return paths.map(path => splitPath(path).slice(0, to).join(PATH_SEPARATOR));
}

export function isPathMatchPatterns(origin: string, patterns: string[]): boolean {
  return patterns.some(it => isPathMatchPattern(origin, it));
}

export function isFuzzyPath(path: string) {
  return path.includes('*') || path.includes('?');
}

function isPathMatchPattern(origin: string, pattern: string) {
  if (isFuzzyPath(pattern)) {
    return matchPath(splitPath(pattern), splitPath(origin));
  } else {
    return origin === pattern;
  }
}

export function matchSinglePath(path: string, fields: { [key: string]: IField }): string[] {
  if (isFuzzyPath(path)) {
    if (path.startsWith('#')) {
      throw new Error('ID匹配不允许包含模糊匹配字符');
    }
    const sp = splitPath(path);
    return Object.keys(fields).filter(it => matchPath(sp, splitPath(it)));
  } else {
    if (path.startsWith('#')) {
      const id = path.substr(1);
      const fieldPath = Object.keys(fields).find(p => fields[p].id === id);
      if (fieldPath) {
        return [fieldPath];
      } else {
        return [];
      }
    }
    if (fields[path] !== undefined) {
      return [path];
    }
    return [];
  }
}

function matchPath(origin: string[], path: string[]): boolean {
  if (origin.length) {
    if (origin[0] === path[0] || (origin[0] === '?' && path[0] !== undefined)) {
      return matchPath(origin.slice(1), path.slice(1));
    } else {
      return origin.length === 1 && (origin[0] === '*' && path.length > 0);
    }
  } else if (origin.length === 0 && path.length === 0) {
    return true;
  }
  return false;
}
