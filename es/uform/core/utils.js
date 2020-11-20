import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { isArr, isStr, getPathSegments, toArr, clone, isFn, globalThisPolyfill } from '../utils';
export * from '../utils';
var self = globalThisPolyfill;

var compactScheduler = function compactScheduler(_ref, fresh) {
  var _ref2 = _slicedToArray(_ref, 3),
      raf = _ref2[0],
      caf = _ref2[1],
      priority = _ref2[2];

  return [fresh ? function (callback) {
    return raf(priority, callback);
  } : raf, caf];
};

var getScheduler = function getScheduler() {
  if (!self.requestAnimationFrame) {
    return [self.setTimeout, self.clearTimeout];
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    var scheduler = require('scheduler');

    return compactScheduler([scheduler.scheduleCallback || scheduler.unstable_scheduleCallback, scheduler.cancelCallback || scheduler.unstable_cancelCallback, scheduler.NormalPriority || scheduler.unstable_NormalPriority], !!scheduler.unstable_requestPaint);
  } catch (err) {
    return [self.requestAnimationFrame, self.cancelAnimationFrame];
  }
};

var _getScheduler = getScheduler(),
    _getScheduler2 = _slicedToArray(_getScheduler, 2),
    raf = _getScheduler2[0],
    caf = _getScheduler2[1];

export { raf, caf };
export var resolveFieldPath = function resolveFieldPath(path) {
  if (!isArr(path)) {
    return isStr(path) ? resolveFieldPath(getPathSegments(path)) : undefined;
  }

  return path.reduce(function (buf, key) {
    return buf.concat(getPathSegments(key));
  }, []);
};
export var isChildField = function isChildField(field, parent) {
  if ((field === null || field === void 0 ? void 0 : field.path) && (parent === null || parent === void 0 ? void 0 : parent.path)) {
    for (var i = 0; i < parent.path.length; i++) {
      if (field.path[i] !== parent.path[i]) {
        return false;
      }
    }

    return parent.path.length < field.path.length;
  }

  return false;
};
export var hasRequired = function hasRequired(rules) {
  return toArr(rules).some(function (rule) {
    return rule === null || rule === void 0 ? void 0 : rule.required;
  });
};
export var publishFormState = function publishFormState(state) {
  var values = state.values,
      valid = state.valid,
      invalid = state.invalid,
      initialValues = state.initialValues,
      errors = state.errors,
      pristine = state.pristine,
      dirty = state.dirty;
  return {
    values: clone(values),
    valid: valid,
    invalid: invalid,
    errors: errors,
    pristine: pristine,
    dirty: dirty,
    initialValues: clone(initialValues)
  };
};
export var publishFieldState = function publishFieldState(state) {
  var value = state.value,
      valid = state.valid,
      invalid = state.invalid,
      errors = state.errors,
      visible = state.visible,
      display = state.display,
      editable = state.editable,
      initialValue = state.initialValue,
      name = state.name,
      path = state.path,
      props = state.props,
      effectErrors = state.effectErrors,
      loading = state.loading,
      pristine = state.pristine,
      required = state.required,
      rules = state.rules;
  return {
    value: clone(value),
    valid: valid,
    invalid: invalid,
    editable: editable,
    visible: visible,
    display: display,
    loading: loading,
    errors: errors.concat(effectErrors),
    pristine: pristine,
    initialValue: clone(initialValue),
    name: name,
    path: path,
    props: props,
    required: required,
    rules: rules
  };
};
export var BufferList =
/*#__PURE__*/
function () {
  function BufferList() {
    _classCallCheck(this, BufferList);

    this.data = [];
    this.indexes = {};
  }

  _createClass(BufferList, [{
    key: "push",
    value: function push(key, value, extra) {
      if (!this.indexes[key]) {
        var index = this.data.length;
        this.data.push(_objectSpread({}, extra, {
          key: key,
          values: [value]
        }));
        this.indexes[key] = index;
      } else {
        var item = this.data[this.indexes[key]];

        if (item.values.indexOf(value) === -1) {
          item.values.push(value);
        }
      }
    }
  }, {
    key: "forEach",
    value: function forEach(callback) {
      for (var i = 0; i < this.data.length; i++) {
        if (isFn(callback)) {
          callback(this.data[i], this.data[i].key);
        }
      }
    }
  }, {
    key: "remove",
    value: function remove(key, value) {
      var _this = this;

      this.data = this.data.reduce(function (buf, item, index) {
        if (item.key === key) {
          delete _this.indexes[key];
          return buf;
        } else {
          _this.indexes[key] = buf.length;
          return buf.concat(item);
        }
      }, []);
    }
  }]);

  return BufferList;
}();