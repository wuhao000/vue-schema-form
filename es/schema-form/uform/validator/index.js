import _regeneratorRuntime from "/Users/wuhao/IdeaProjects/github/vue-schema-form/node_modules/@babel/runtime/regenerator";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import { clone, each, format, isArr, isEmpty, isEqual, isFn, reduce, toArr } from "./utils";
import { validate } from "./validators";
export * from "./message";

var flatArr = function flatArr(arr) {
  return reduce(arr, function (buf, item) {
    return isArr(item) ? buf.concat(flatArr(item)) : item ? buf.concat(item) : buf;
  }, []);
};

export { format };
export var runValidation = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(values, fieldMap, forceUpdate, callback) {
    var queue;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            queue = [];

            if (isFn(forceUpdate)) {
              callback = forceUpdate;
              forceUpdate = false;
            }

            each(fieldMap, function (field, name) {
              var value = field.value;

              if (field.visible === false || field.display === false || field.editable === false) {
                return;
              }

              if (!forceUpdate) {
                if (isEmpty(field.lastValidateValue) && isEmpty(value)) {
                  return;
                }

                if (isEqual(field.lastValidateValue, value)) {
                  return;
                }
              }

              var title = field.definition.props?.title;
              var rafId = setTimeout(function () {
                field.loading = true;
                field.dirty = true;

                if (field.notify) {
                  field.notify();
                }
              }, 100);
              queue.push(Promise.all(field.rules.map(function (rule) {
                return validate(value, rule, values, title || name);
              })).then(function (errors) {
                clearTimeout(rafId);
                var lastFieldErrors = toArr(field.errors);
                var lastValid = field.valid;
                var lastLoading = field.loading;
                var newErrors = flatArr(toArr(errors));
                var effectErrors = flatArr(toArr(field.effectErrors));
                field.loading = false;
                field.errors = newErrors;
                field.effectErrors = effectErrors;

                if (forceUpdate) {
                  if (newErrors.length || effectErrors.length) {
                    field.valid = false;
                    field.invalid = true;
                  } else {
                    field.valid = true;
                    field.invalid = false;
                  }

                  field.dirty = true;
                } else {
                  if (!field.pristine) {
                    if (newErrors.length || effectErrors.length) {
                      field.valid = false;
                      field.invalid = true;
                    } else {
                      field.valid = true;
                      field.invalid = false;
                    }

                    if (!isEqual(lastValid, field.valid) || !isEqual(lastFieldErrors, field.errors)) {
                      field.dirty = true;
                    }
                  }
                }

                if (field.loading !== lastLoading) {
                  field.dirty = true;
                }

                if (field.dirty && field.notify) {
                  field.notify();
                }

                field.lastValidateValue = clone(value);
                return {
                  name: name,
                  value: value,
                  field: field,
                  invalid: field.invalid,
                  valid: field.valid,
                  errors: newErrors.concat(effectErrors)
                };
              }));
            });
            return _context.abrupt("return", Promise.all(queue).then(function (response) {
              var errors = response.filter(function (it) {
                return it.invalid;
              });

              if (isFn(callback)) {
                callback(errors);
              }

              return errors;
            }));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function runValidation(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();
export default runValidation;