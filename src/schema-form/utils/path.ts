const CACHE = {};

export const splitPath = (path: string): string[] => {
  if (CACHE[path]) {
    return CACHE[path];
  } else {
    return path.split('.');
  }
};
