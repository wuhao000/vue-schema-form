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

export function matchSinglePath(path: string, fieldPaths: string[]): string[] {
  if (isFuzzyPath(path)) {
    const sp = splitPath(path);
    return fieldPaths.filter(it => matchPath(sp, splitPath(it)));
  } else {
    return [path];
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
