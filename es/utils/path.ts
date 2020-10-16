import {IField, Paths, SchemaFormField} from 'v-schema-form-types';

const CACHE = {};

export const PATH_SEPARATOR = '.';

export const splitPath = (path: string): string[] => {
  if (CACHE[path]) {
    return CACHE[path];
  } else {
    return path.split(PATH_SEPARATOR);
  }
};

export function match(paths: Paths, fields: { [key: string]: IField }): string[] {
  return paths.map(it => {
    if (typeof it === 'string') {
      return matchSinglePath(it, fields);
    } else {
      const field = findFieldPath(it, fields);
      return field ? [field] : [];
    }
  }).flat();
}

export function findFieldPath(def: SchemaFormField, fields: { [key: string]: IField }): string {
  const field = Object.values(fields).find(it => it.id === def.id);
  return field && field.plainPath;
}

export function replaceLastPath(paths: string[], last: string[]): string[] {
  return paths.map(it => {
    const splits = splitPath(it);
    splits.splice(splits.length - last.length, last.length, ...last);
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

export function isPathMatchPatterns(field: IField, patterns: string[]): boolean {
  return patterns.some(it => isPathMatchPattern(field, it));
}

export function isFuzzyPath(path: string | SchemaFormField) {
  return typeof path === 'string' && (path.includes('*') || path.includes('?'));
}

function isPathMatchPattern(origin: IField, pattern: string) {
  if (isFuzzyPath(pattern)) {
    return matchPath(splitPath(pattern), splitPath(origin.plainPath));
  } else {
    if (pattern.startsWith('#')) {
      const id = pattern.substr(1);
      return origin.id === id;
    } else {
      return origin.plainPath === pattern;
    }
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
      return Object.keys(fields).filter(p => fields[p].id === id);
    }
    if (!!fields[path]) {
      return [path];
    }
    return [];
  }
}

function matchPath(origin: string[], path: string[]): boolean {
  if (origin.length) {
    if (origin[0] === path[0] || (origin[0] === '?' && !!path[0])) {
      return matchPath(origin.slice(1), path.slice(1));
    } else {
      return origin.length === 1 && (origin[0] === '*' && path.length > 0);
    }
  } else if (origin.length === 0 && path.length === 0) {
    return true;
  }
  return false;
}
