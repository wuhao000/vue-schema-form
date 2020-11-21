import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import _regeneratorRuntime from "/Users/wuhao/IdeaProjects/github/vue-schema-form/node_modules/@babel/runtime/regenerator";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import className from 'classname';
import { Subject } from 'rxjs';
import Vue from 'vue';
import { registerAntd } from "./antd/register";
import { registerElement } from "./element/register";
import { hasListener, renderField, SchemaFormEvents } from "./internal/utils";
import { registerAntdMobile } from "./mobile/register";
import { clone, isEqual } from "./uform/utils";
import runValidation from "./uform/validator";
import { appendPath as _appendPath, findFieldPath, isFuzzyPath, isPathMatchPatterns, match, replaceLastPath as _replaceLastPath, takePath as _takePath } from "./utils/path";
import { addComponent, register, registerDisplay, registerLayout, registerResponsiveComponent } from "./utils/register";
import { LibComponents } from "./utils/utils";
import { registerVant } from "./vant";
export var SCHEMA_FORM_STORE_INJECT_KEY = 'store';
export var SCHEMA_FIELD_INJECT_KEY = '_field';
export var SCHEMA_FIELD_FORM_VALUE_INJECT_KEY = '_form_value';
var Form = Vue.extend({
  props: {
    prefixCls: {
      type: String,
      default: 'schema-form'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    actions: {
      type: Array
    },
    platform: {
      type: String,
      default: 'desktop'
    },
    mode: {
      type: String
    },
    editable: {
      type: Boolean,
      default: true
    },
    effects: {
      type: Function
    },
    schema: {
      type: Object,
      required: true
    },
    value: {
      type: [Object, Array]
    },
    title: {
      type: [String, Object]
    },
    inline: {
      type: Boolean,
      default: false
    },
    sticky: {
      type: Boolean,
      default: false
    }
  },
  provide: function provide() {
    var _ref;

    var store = this.store;
    return _ref = {}, _ref[SCHEMA_FORM_STORE_INJECT_KEY] = Vue.observable(store), _ref;
  },
  data: function data() {
    return {
      currentValue: null,
      store: {
        fields: {},
        // @ts-ignore
        disabled: this.disabled,
        // @ts-ignore
        loading: this.loading,
        // @ts-ignore
        readonly: this.readonly,
        // @ts-ignore
        platform: this.platform,
        // @ts-ignore
        props: this.props,
        // @ts-ignore
        effects: this.effects,
        // @ts-ignore
        inline: this.inline,
        // @ts-ignore
        editable: this.editable,
        context: null,
        root: this
      }
    };
  },
  watch: {
    readonly: {
      immediate: true,
      handler: function handler(readonly) {
        this.store.readonly = readonly;
      }
    },
    disabled: {
      immediate: true,
      handler: function handler(disabled) {
        this.store.disabled = disabled;
      }
    },
    platform: function platform(_platform) {
      this.store.platform = _platform;
    },
    loading: {
      immediate: true,
      handler: function handler(loading) {
        this.store.loading = loading;
      }
    },
    value: {
      deep: true,
      handler: function handler() {
        this.setCurrentValue();
      }
    },
    currentValue: {
      deep: true,
      handler: function handler(v) {
        var cloneValue = clone(v);
        this.$emit('input', cloneValue);
        this.$emit('change', cloneValue);
      }
    }
  },
  mounted: function mounted() {
    if (this.effects) {
      this.effects(this.store.context);
    }
  },
  methods: {
    matchFields: function matchFields(paths) {
      var store = this.store;
      var matchedPaths = match(paths, store.fields);
      return matchedPaths.map(function (path) {
        return store.fields[path];
      }).filter(function (it) {
        return !!it;
      });
    },
    createContext: function createContext() {
      var _this = this;

      var store = this.store;

      var context = function context() {
        for (var _len = arguments.length, _paths = new Array(_len), _key = 0; _key < _len; _key++) {
          _paths[_key] = arguments[_key];
        }

        return {
          paths: function paths() {
            return context.apply(void 0, _paths).fields().map(function (it) {
              return it.plainPath;
            });
          },
          fields: function fields() {
            return _this.matchFields(_paths);
          },
          toggle: function toggle() {
            _this.matchFields(_paths).forEach(function (field) {
              field.visible = !field.visible;
            });

            return context.apply(void 0, _paths);
          },
          value: function (_value) {
            function value(_x) {
              return _value.apply(this, arguments);
            }

            value.toString = function () {
              return _value.toString();
            };

            return value;
          }(function (value) {
            var res = _this.matchFields(_paths).map(function (it) {
              return typeof value === 'function' ? it.setGetValue(value(it)) : it.setGetValue(value);
            });

            if (value === undefined) {
              if (_paths.length === 1 && !isFuzzyPath(_paths[0])) {
                return res[0];
              } else {
                return res;
              }
            }
          }),
          hide: function hide() {
            _this.matchFields(_paths).forEach(function (field) {
              field.visible = false;
            });

            return context.apply(void 0, _paths);
          },
          show: function show() {
            _this.matchFields(_paths).forEach(function (field) {
              field.visible = true;
            });

            return context.apply(void 0, _paths);
          },
          setEnum: function setEnum(options) {
            _this.matchFields(_paths).forEach(function (field) {
              if (typeof options === 'function') {
                field.enum = options(field);
              } else {
                field.enum = options;
              }
            });

            return context.apply(void 0, _paths);
          },
          setTitle: function setTitle(title) {
            _this.matchFields(_paths).forEach(function (field) {
              if (typeof title === 'function') {
                field.title = title(field);
              } else {
                field.title = title;
              }
            });

            return context.apply(void 0, _paths);
          },
          setFieldProps: function setFieldProps(props) {
            _this.matchFields(_paths).forEach(function (field) {
              if (typeof props === 'function') {
                field.props = _extends({}, field.props, props(field));
              } else {
                field.props = _extends({}, field.props, props);
              }
            });

            return context.apply(void 0, _paths);
          },
          onFieldCreate: function onFieldCreate(callback) {
            context.subscribe(SchemaFormEvents.fieldCreate, _paths, callback);
            return context.apply(void 0, _paths);
          },
          onFieldBlur: function onFieldBlur(callback) {
            context.subscribe(SchemaFormEvents.fieldBlur, _paths, callback);
            return context.apply(void 0, _paths);
          },
          setDisplayValue: function setDisplayValue(value) {
            _this.matchFields(_paths).forEach(function (field) {
              if (typeof value === 'function') {
                field.displayValue = value(field);
              } else {
                field.displayValue = value;
              }
            });

            return context.apply(void 0, _paths);
          },
          onFieldFocus: function onFieldFocus(callback) {
            context.subscribe(SchemaFormEvents.fieldFocus, _paths, callback);
            return context.apply(void 0, _paths);
          },
          onFieldCreateOrChange: function onFieldCreateOrChange(callback) {
            return context.apply(void 0, _paths).onFieldCreate(callback).onFieldChange(callback);
          },
          onFieldChange: function onFieldChange(callback) {
            context.subscribe(SchemaFormEvents.fieldChange, _paths, callback);
            return context.apply(void 0, _paths);
          },
          subscribe: function subscribe(event, callback) {
            context.subscribe(event, _paths, callback);
            return context.apply(void 0, _paths);
          },
          takePath: function takePath(number) {
            if (_paths.length === 0) {
              return context();
            } else {
              if (typeof _paths[0] === 'string') {
                return context.apply(void 0, _takePath(_paths, number));
              } else {
                return context.apply(void 0, _takePath(_paths.map(function (it) {
                  return findFieldPath(it, store.fields);
                }), number));
              }
            }
          },
          appendPath: function appendPath(suffix) {
            if (_paths.length === 0) {
              return context();
            } else {
              if (typeof _paths[0] === 'string') {
                return context.apply(void 0, _appendPath(_paths, suffix));
              } else {
                return context.apply(void 0, _appendPath(_paths.map(function (it) {
                  return findFieldPath(it, store.fields);
                }), suffix));
              }
            }
          },
          disable: function disable() {
            _this.matchFields(_paths).forEach(function (field) {
              field.disabled = true;
            });

            return context.apply(void 0, _paths);
          },
          enable: function enable() {
            _this.matchFields(_paths).forEach(function (field) {
              field.disabled = false;
            });

            return context.apply(void 0, _paths);
          },
          replaceLastPath: function replaceLastPath() {
            for (var _len2 = arguments.length, last = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              last[_key2] = arguments[_key2];
            }

            return context.apply(void 0, _replaceLastPath(_paths, last));
          }
        };
      };

      context.subscribe = function (e, pathsOrHandler, handler) {
        if (!context.subscribes[e]) {
          context.subscribes[e] = new Subject();
        }

        context.subscribes[e].subscribe({
          next: function next(v) {
            _this.$nextTick(function () {
              if (typeof pathsOrHandler === 'function') {
                pathsOrHandler(v);
              } else {
                var patterns = typeof pathsOrHandler === 'string' ? [pathsOrHandler] : Array.isArray(pathsOrHandler) ? pathsOrHandler.map(function (item) {
                  if (typeof item === 'string') {
                    return item;
                  } else {
                    return findFieldPath(item, store.fields);
                  }
                }) : [findFieldPath(pathsOrHandler, store.fields)];

                if (isPathMatchPatterns(v.field, patterns)) {
                  if (e === SchemaFormEvents.fieldChange || e === SchemaFormEvents.fieldCreate) {
                    handler(v.value, v.path, v.field);
                  } else if ([SchemaFormEvents.fieldFocus, SchemaFormEvents.fieldBlur].includes(e)) {
                    handler(v.path);
                  } else {
                    handler(v);
                  }
                }
              }
            });
          }
        });
      };

      context.submit = function (forceValidate, callback) {
        _this.onOk(forceValidate, callback);
      };

      context.validate = /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(handler) {
          var errors;
          return _regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return runValidation(_this.currentValue, store.fields, true);

                case 2:
                  errors = _context.sent;

                  if (!handler) {
                    _context.next = 7;
                    break;
                  }

                  handler(errors, context);
                  _context.next = 8;
                  break;

                case 7:
                  return _context.abrupt("return", errors);

                case 8:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function (_x2) {
          return _ref2.apply(this, arguments);
        };
      }();

      context.onValidate = function (handler) {
        context.subscribe(SchemaFormEvents.validate, handler);
      };

      context.subscribes = {};

      context.getValue = function () {
        return _this.currentValue;
      };

      context.trigger = function (event, value) {
        _this.$nextTick(function () {
          var subject = store.context.subscribes[event];

          if (subject) {
            subject.next(value);
          }
        });
      };

      return context;
    },
    renderButtons: function renderButtons() {
      var _this2 = this;

      var h = this.$createElement;
      var props = this.store.props;
      var actions = this.actions;

      if (props && this.store.editable) {
        if (this.$slots.btns) {
          return this.$slots.btns;
        }

        var buttons = [];

        if (actions) {
          actions.forEach(function (action) {
            if (typeof action === 'string') {
              switch (action) {
                case 'submit':
                  buttons.push(_this2.createSubmitButton());
                  break;

                case 'cancel':
                  buttons.push(_this2.createCancelButton());
                  break;

                case 'reset':
                  buttons.push(_this2.createResetButton());
                  break;
              }
            } else if (typeof action === 'object') {
              switch (action.name) {
                case 'submit':
                  buttons.push(_this2.createSubmitButton(action.text, action.props, action.action));
                  break;

                case 'cancel':
                  buttons.push(_this2.createCancelButton(action.text, action.props, action.action));
                  break;

                case 'reset':
                  buttons.push(_this2.createResetButton(action.text, action.props, action.action));
                  break;

                default:
                  var _props = action.props || {};

                  _props.disabled = _this2.disabled || _this2.loading;
                  buttons.push(_this2.createButton(action.text, action.action, _props, null));
                  break;
              }
            }
          });
        } else {
          buttons.push(this.createCancelButton());
          buttons.push(this.createSubmitButton());
          buttons.push(this.createResetButton());
        }

        return h("div", {
          "class": "action-btns"
        }, [buttons]);
      }
    },
    onOk: function () {
      var _onOk = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(forceValidate, callback) {
        var errors;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!hasListener(this, 'ok')) {
                  _context2.next = 9;
                  break;
                }

                if (!forceValidate) {
                  _context2.next = 8;
                  break;
                }

                _context2.next = 4;
                return this.validate();

              case 4:
                errors = _context2.sent;

                if (errors.length) {
                  console.warn('有错误', errors);
                  this.store.context.trigger(SchemaFormEvents.validate, errors);
                } else {
                  if (callback) {
                    callback(this.currentValue);
                  } else {
                    this.$emit('ok', this.currentValue);
                  }
                }

                _context2.next = 9;
                break;

              case 8:
                if (callback) {
                  callback(this.currentValue);
                } else {
                  this.$emit('ok', this.currentValue);
                }

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function onOk(_x3, _x4) {
        return _onOk.apply(this, arguments);
      }

      return onOk;
    }(),
    validate: function validate() {
      return runValidation(this.currentValue, this.store.fields, true);
    },
    createSubmitButton: function createSubmitButton(text, btnProps, action) {
      var _this3 = this;

      if (text === void 0) {
        text = '';
      }

      if (btnProps === void 0) {
        btnProps = null;
      }

      if (action === void 0) {
        action = null;
      }

      var hasOkHandler = hasListener(this, 'ok');

      if (!hasOkHandler) {
        return null;
      }

      var buttonProps = btnProps || this.schema.props && this.schema.props.okProps || {};

      if (!buttonProps.type) {
        buttonProps.type = 'primary';
      }

      buttonProps.disabled = this.disabled;
      buttonProps.loading = this.loading;
      return this.createButton(text || this.schema.props && this.schema.props.okText || '提交', action || function () {
        _this3.onOk(true);
      }, buttonProps, 'confirm-btn');
    },
    createButton: function createButton(text, action, attrs, classes) {
      var _this4 = this;

      var h = this.$createElement;
      var platform = this.platform;
      var ButtonComponent = platform === 'mobile' ? 'm-button' : LibComponents.button;
      var Button = h(ButtonComponent, _mergeJSXProps([{
        "class": classes
      }, {
        "props": attrs
      }, {
        "on": {
          "click": function click() {
            action(_this4.store.context);
          }
        }
      }]), [text]);

      if (platform === 'mobile') {
        return [h("m-white-space"), Button];
      }

      return Button;
    },
    createCancelButton: function createCancelButton(text, btnProps, action) {
      if (text === void 0) {
        text = '';
      }

      if (btnProps === void 0) {
        btnProps = null;
      }

      if (action === void 0) {
        action = null;
      }

      var hasCancelHandler = hasListener(this, 'cancel');

      if (!hasCancelHandler) {
        return null;
      }

      var props = this.schema.props;
      var buttonProps = btnProps || props && props.cancelProps || {};
      buttonProps.disabled = this.disabled || this.loading;
      return this.createButton(text || (props === null || props === void 0 ? void 0 : props.cancelText) || '取消', action || this.onCancel, buttonProps, 'cancel-btn');
    },
    createResetButton: function createResetButton(text, btnProps, action) {
      if (text === void 0) {
        text = '';
      }

      if (btnProps === void 0) {
        btnProps = null;
      }

      if (action === void 0) {
        action = null;
      }

      var hasResetHandler = hasListener(this, 'reset');

      if (!hasResetHandler) {
        return null;
      }

      var props = this.schema.props;
      var buttonProps = btnProps || props && props.cancelProps || {};
      buttonProps.disabled = this.disabled || this.loading;
      return this.createButton(text || props && props.cancelText || '重置', action || this.onReset, buttonProps, 'reset-btn');
    },
    onReset: function onReset() {
      this.$emit('reset');
    },
    onCancel: function onCancel() {
      this.$emit('cancel');
    },
    setCurrentValue: function setCurrentValue() {
      if (!(this.currentValue && isEqual(this.value, this.currentValue))) {
        if (this.value) {
          this.currentValue = clone(this.value);
        } else if (this.schema.array) {
          this.currentValue = [];
        } else {
          this.currentValue = {};
        }
      }
    }
  },
  created: function created() {
    var _this5 = this;

    this.setCurrentValue();
    var store = this.store;
    store.context = this.createContext();
    store.editable = this.mode !== undefined ? this.mode === 'edit' : this.editable;

    if (this.mode !== undefined) {
      console.warn('mode属性已经废弃，请使用editable属性代替');
    }

    this.$watch(function () {
      return _this5.editable;
    }, function (editable) {
      store.editable = editable;
    });
    this.$on('SchemaForm.addSchemaField', function (field) {
      if (field) {
        store.fields[field.plainPath] = field;
      }
    });
    this.$on('SchemaForm.removeSchemaField', function (field) {
      if (field) {
        delete store.fields[field.plainPath];
      }
    });
  },
  render: function render() {
    var _className;

    var h = arguments[0];
    var title = this.title,
        sticky = this.sticky,
        prefixCls = this.prefixCls,
        currentValue = this.currentValue,
        schema = this.schema;
    var store = this.store;

    var rootFieldDef = _extends({}, schema, {
      type: 'object',
      title: title,
      props: this.schema.props
    });

    var content = [this.$slots.header, renderField(null, store, rootFieldDef, currentValue, 0, false, this.$createElement, this)];
    var footer = [this.renderButtons(), this.$slots.footer];

    if (this.sticky) {
      content = h(LibComponents.content, [content]);
      footer = h(LibComponents.footer, [footer]);
    }

    var classes = className(prefixCls, (_className = {}, _className[prefixCls + "-sticky"] = sticky, _className), prefixCls + "-" + this.platform);
    return h("div", {
      "class": classes
    }, [content, footer]);
  }
});
Form.registerAntd = registerAntd;
Form.registerAntdMobile = registerAntdMobile;
Form.registerVant = registerVant;
Form.registerElement = registerElement;
Form.registerComponent = register;
Form.register = addComponent;
Form.registerResponsiveComponent = registerResponsiveComponent;
Form.registerLayout = registerLayout;
Form.registerDisplayComponent = registerDisplay;
export default Form;