export var defer = function defer() {
  var internalResolve;
  var internalReject;
  var promise = new Promise(function (resolve, reject) {
    internalResolve = resolve;
    internalReject = reject;
  });
  return {
    promise: promise,
    resolve: internalResolve,
    reject: internalReject
  };
};