export function isSame(first, second, ignoreOrder) {
  if (ignoreOrder === void 0) {
    ignoreOrder = true;
  }

  if (ignoreOrder) {
    return !(first.find(function (role) {
      return !second.includes(role);
    }) || second.find(function (role) {
      return !first.includes(role);
    }));
  } else if (first.length === second.length) {
    for (var i in first) {
      if (first[i] !== second[i]) {
        return false;
      }
    }

    return true;
  }

  return false;
}