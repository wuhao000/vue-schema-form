export function isSame(first: any[], second: any[], ignoreOrder: boolean = true): boolean {
  if (ignoreOrder) {
    return !(first.find(role => !second.includes(role))
      || second.find(role => !first.includes(role)));
  } else if (first.length === second.length) {
    for (const i in first) {
      if (first[i] !== second[i]) {
        return false;
      }
    }
    return true;
  }
  return false;
}
