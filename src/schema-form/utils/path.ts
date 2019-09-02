const CACHE = {};

export const splitPath = (path: string): string[] => {
  if (CACHE[path]) {
    return CACHE[path];
  } else {
    return path.split('.');
  }
};

export function match(paths: string[], fieldPaths: string[]): string[] {
  return paths.map(it => matchSinglePath(it, fieldPaths)).flat();
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
