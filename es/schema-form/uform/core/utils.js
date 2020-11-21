function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { isArr, isStr, getPathSegments, toArr, clone, isFn, globalThisPolyfill } from "../utils";
export * from "../utils";
var self = globalThisPolyfill;

var compactScheduler = function compactScheduler(_ref, fresh) {
  var raf = _ref[0],
      caf = _ref[1],
      priority = _ref[2];
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
    raf = _getScheduler[0],
    caf = _getScheduler[1];

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
export var BufferList = /*#__PURE__*/function () {
  function BufferList() {
    _defineProperty(this, "data", []);

    _defineProperty(this, "indexes", {});
  }

  var _proto = BufferList.prototype;

  _proto.push = function push(key, value, extra) {
    if (!this.indexes[key]) {
      var index = this.data.length;
      this.data.push(_extends({}, extra, {
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
  };

  _proto.forEach = function forEach(callback) {
    for (var i = 0; i < this.data.length; i++) {
      if (isFn(callback)) {
        callback(this.data[i], this.data[i].key);
      }
    }
  };

  _proto.remove = function remove(key, value) {
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
  };

  return BufferList;
}();