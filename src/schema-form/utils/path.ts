const CACHE = {};

export const PATH_SEPARATOR = '.';

export const splitPath = (path: string): string[] => {
  if (CACHE[path]) {
    return CACHE[path];
  } else {
    return path.split(PATH_SEPARATOR);
  }
};

export function match(paths: string[], fieldPaths: string[]): string[] {
  return paths.map(it => matchSinglePath(it, fieldPaths)).flat();
}

export function appendPath(paths, suffix) {
  if (paths) {
    if (typeof paths === 'string') {
      return paths + PATH_SEPARATOR + suffix;
    } else {
      return paths.map(path => appendPath(path, suffix));
    }
  } else {
    return suffix;
  }
}

export function takePath(paths: string | string[], to: number) {
  if (typeof paths === 'string') {
    return splitPath(paths).slice(0, to).join(PATH_SEPARATOR);
  } else {
    return paths.map(path => takePath(path, to));
  }
}

export function isPathMatchPatterns(origin: string, patterns: string[]): boolean {
  return patterns.some(it => isPathMatchPattern(origin, it));
}

function isPathMatchPattern(origin: string, pattern: string) {
  if (pattern.includes('*') || pattern.includes('?')) {
    return matchPath(splitPath(pattern), splitPath(origin));
  } else {
    return origin === pattern;
  }
}

export function matchSinglePath(path: string, fieldPaths: string[]): string[] {
  if (path.includes('?') || path.includes('*')) {
    const sp = splitPath(path);
    return fieldPaths.filter(it => matchPath(sp, splitPath(it)));
  } else {
    return [path];
  }
}

function matchPath(origin: string[], path: string[]): boolean {
  if (origin.length) {
    if (origin[0] === path[0] || origin[0] === '?') {
      return matchPath(origin.slice(1), path.slice(1));
    } else {
      return origin.length === 1 && origin[0] === '*';
    }
  } else if (origin.length === 0 && path.length === 0) {
    return true;
  }
  return false;
}
