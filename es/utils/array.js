export function isSame(first, second) {
  var ignoreOrder = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

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