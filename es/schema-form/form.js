import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
import _regeneratorRuntime from "/Users/wuhao/IdeaProjects/github/vue-schema-form/node_modules/@babel/runtime/regenerator";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _class3, _temp;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

import className from 'classname';
import { Subject } from 'rxjs';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Provide, Watch } from 'vue-property-decorator';
import { clone, isEqual } from "./uform/utils";
import runValidation from "./uform/validator";
import { registerAntd } from "./antd/register";
import { registerElement } from "./element/register";
import { hasListener, renderField, SchemaFormEvents } from "./internal/utils";
import { registerLayout } from "./layout/register";
import { registerAntdMobile } from "./mobile/register";
import { appendPath as _appendPath, findFieldPath, isFuzzyPath, isPathMatchPatterns, match, replaceLastPath as _replaceLastPath, takePath as _takePath } from "./utils/path";
import { register, addComponent, registerResponsiveComponent, registerDisplay } from "./utils/register";
import { ASchemaForm, LibComponents } from "./utils/utils";
import { registerVant } from "./vant";
export var SCHEMA_FORM_STORE_INJECT_KEY = 'store';
export var SCHEMA_FIELD_INJECT_KEY = '_field';
export var SCHEMA_FIELD_FORM_VALUE_INJECT_KEY = '_form_value';
var SchemaForm = (_dec = Component({
  name: ASchemaForm
}), _dec2 = Prop({
  type: String,
  default: 'schema-form'
}), _dec3 = Prop({
  type: Boolean,
  default: false
}), _dec4 = Prop({
  type: Boolean,
  default: false
}), _dec5 = Prop({
  type: Boolean,
  default: false
}), _dec6 = Prop({
  type: Array
}), _dec7 = Prop({
  type: String,
  default: 'desktop'
}), _dec8 = Prop({
  type: String
}), _dec9 = Prop({
  type: Boolean,
  default: true
}), _dec10 = Prop(Function), _dec11 = Prop({
  type: Object,
  required: true
}), _dec12 = Prop({
  type: Object,
  default: function _default() {
    return {};
  }
}), _dec13 = Prop([Object, Array]), _dec14 = Prop([String, Object]), _dec15 = Prop({
  type: Boolean,
  default: false
}), _dec16 = Prop({
  type: Boolean,
  default: false
}), _dec17 = Provide(SCHEMA_FORM_STORE_INJECT_KEY), _dec18 = Watch('readonly', {
  immediate: true
}), _dec19 = Watch('disabled', {
  immediate: true
}), _dec20 = Watch('platform'), _dec21 = Watch('props', {
  immediate: true,
  deep: true
}), _dec22 = Watch('mode'), _dec23 = Watch('loading', {
  immediate: true
}), _dec24 = Watch('value', {
  deep: true
}), _dec25 = Watch('currentValue', {
  deep: true
}), _dec(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_Vue) {
  _inherits(SchemaForm, _Vue);

  var _super = _createSuper(SchemaForm);

  function SchemaForm() {
    var _this;

    _classCallCheck(this, SchemaForm);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _initializerDefineProperty(_this, "prefixCls", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "disabled", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "readonly", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "loading", _descriptor4, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "actions", _descriptor5, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "platform", _descriptor6, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "mode", _descriptor7, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "editable", _descriptor8, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "effects", _descriptor9, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "schema", _descriptor10, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "props", _descriptor11, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "value", _descriptor12, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "title", _descriptor13, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "inline", _descriptor14, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "sticky", _descriptor15, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "store", _descriptor16, _assertThisInitialized(_this));

    _this.currentValue = null;
    return _this;
  }

  _createClass(SchemaForm, [{
    key: "readonlyChanged",
    value: function readonlyChanged(readonly) {
      this.store.readonly = readonly;
    }
  }, {
    key: "disabledChanged",
    value: function disabledChanged(disabled) {
      this.store.disabled = disabled;
    }
  }, {
    key: "platformChanged",
    value: function platformChanged(platform) {
      this.store.platform = platform;
    }
  }, {
    key: "propsChanged",
    value: function propsChanged(props) {
      this.store.props = props;
    }
  }, {
    key: "modeChanged",
    value: function modeChanged(mode) {
      this.store.editable = mode === 'edit';
    }
  }, {
    key: "loadingChanged",
    value: function loadingChanged(loading) {
      this.store.loading = loading;
    }
  }, {
    key: "mounted",
    value: function mounted() {
      if (this.effects) {
        this.effects(this.store.context);
      }
    }
  }, {
    key: "matchFields",
    value: function matchFields(paths) {
      var _this2 = this;

      var matchedPaths = match(paths, this.store.fields);
      return matchedPaths.map(function (path) {
        return _this2.store.fields[path];
      }).filter(function (it) {
        return !!it;
      });
    }
  }, {
    key: "createContext",
    value: function createContext() {
      var _this3 = this;

      var context = function context() {
        for (var _len2 = arguments.length, _paths = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          _paths[_key2] = arguments[_key2];
        }

        return {
          paths: function paths() {
            return context.apply(void 0, _paths).fields().map(function (it) {
              return it.plainPath;
            });
          },
          fields: function fields() {
            return _this3.matchFields(_paths);
          },
          toggle: function toggle() {
            _this3.matchFields(_paths).forEach(function (field) {
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
            var res = _this3.matchFields(_paths).map(function (it) {
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
            _this3.matchFields(_paths).forEach(function (field) {
              field.visible = false;
            });

            return context.apply(void 0, _paths);
          },
          show: function show() {
            _this3.matchFields(_paths).forEach(function (field) {
              field.visible = true;
            });

            return context.apply(void 0, _paths);
          },
          setEnum: function setEnum(options) {
            _this3.matchFields(_paths).forEach(function (field) {
              if (typeof options === 'function') {
                field.enum = options(field);
              } else {
                field.enum = options;
              }
            });

            return context.apply(void 0, _paths);
          },
          setTitle: function setTitle(title) {
            _this3.matchFields(_paths).forEach(function (field) {
              if (typeof title === 'function') {
                field.title = title(field);
              } else {
                field.title = title;
              }
            });

            return context.apply(void 0, _paths);
          },
          setFieldProps: function setFieldProps(props) {
            _this3.matchFields(_paths).forEach(function (field) {
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
            _this3.matchFields(_paths).forEach(function (field) {
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
                return context.apply(void 0, _toConsumableArray(_takePath(_paths, number)));
              } else {
                return context.apply(void 0, _toConsumableArray(_takePath(_paths.map(function (it) {
                  return findFieldPath(it, _this3.store.fields);
                }), number)));
              }
            }
          },
          appendPath: function appendPath(suffix) {
            if (_paths.length === 0) {
              return context();
            } else {
              if (typeof _paths[0] === 'string') {
                return context.apply(void 0, _toConsumableArray(_appendPath(_paths, suffix)));
              } else {
                return context.apply(void 0, _toConsumableArray(_appendPath(_paths.map(function (it) {
                  return findFieldPath(it, _this3.store.fields);
                }), suffix)));
              }
            }
          },
          disable: function disable() {
            _this3.matchFields(_paths).forEach(function (field) {
              field.disabled = true;
            });

            return context.apply(void 0, _paths);
          },
          enable: function enable() {
            _this3.matchFields(_paths).forEach(function (field) {
              field.disabled = false;
            });

            return context.apply(void 0, _paths);
          },
          replaceLastPath: function replaceLastPath() {
            for (var _len3 = arguments.length, last = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
              last[_key3] = arguments[_key3];
            }

            return context.apply(void 0, _toConsumableArray(_replaceLastPath(_paths, last)));
          }
        };
      };

      context.subscribe = function (e, pathsOrHandler, handler) {
        if (!context.subscribes[e]) {
          context.subscribes[e] = new Subject();
        }

        context.subscribes[e].subscribe({
          next: function next(v) {
            _this3.$nextTick(function () {
              if (typeof pathsOrHandler === 'function') {
                pathsOrHandler(v);
              } else {
                var patterns = typeof pathsOrHandler === 'string' ? [pathsOrHandler] : Array.isArray(pathsOrHandler) ? pathsOrHandler.map(function (item) {
                  if (typeof item === 'string') {
                    return item;
                  } else {
                    return findFieldPath(item, _this3.store.fields);
                  }
                }) : [findFieldPath(pathsOrHandler, _this3.store.fields)];

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
        _this3.onOk(forceValidate, callback);
      };

      context.validate = /*#__PURE__*/function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(handler) {
          var errors;
          return _regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return runValidation(_this3.currentValue, _this3.store.fields, true);

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
          return _ref.apply(this, arguments);
        };
      }();

      context.onValidate = function (handler) {
        context.subscribe(SchemaFormEvents.validate, handler);
      };

      context.subscribes = {};

      context.getValue = function () {
        return _this3.currentValue;
      };

      context.trigger = function (event, value) {
        _this3.$nextTick(function () {
          var subject = _this3.store.context.subscribes[event];

          if (subject) {
            subject.next(value);
          }
        });
      };

      return context;
    }
  }, {
    key: "valueChanged",
    value: function valueChanged() {
      this.setCurrentValue();
    }
  }, {
    key: "created",
    value: function created() {
      var _this4 = this;

      this.setCurrentValue();
      this.store.context = this.createContext();
      this.store.editable = this.mode !== undefined ? this.mode === 'edit' : this.editable;

      if (this.mode !== undefined) {
        console.warn('mode属性已经废弃，请使用editable属性代替');
      }

      this.$watch(function () {
        return _this4.editable;
      }, function (editable) {
        _this4.store.editable = editable;
      });
      this.$on('SchemaForm.addSchemaField', function (field) {
        if (field) {
          _this4.store.fields[field.plainPath] = field;
        }
      });
      this.$on('SchemaForm.removeSchemaField', function (field) {
        if (field) {
          delete _this4.store.fields[field.plainPath];
        }
      });
    }
  }, {
    key: "currentValueChanged",
    value: function currentValueChanged(v) {
      var cloneValue = clone(v);
      this.$emit('input', cloneValue);
      this.$emit('change', cloneValue);
    }
  }, {
    key: "render",
    value: function render() {
      var h = arguments[0];
      var title = this.title,
          sticky = this.sticky,
          prefixCls = this.prefixCls,
          store = this.store,
          currentValue = this.currentValue,
          schema = this.schema;

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

      var classes = className(prefixCls, _defineProperty({}, "".concat(prefixCls, "-sticky"), sticky), "".concat(prefixCls, "-").concat(this.platform));
      return h("div", {
        "class": classes
      }, [content, footer]);
    }
  }, {
    key: "renderButtons",
    value: function renderButtons() {
      var _this5 = this;

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
                  buttons.push(_this5.createSubmitButton());
                  break;

                case 'cancel':
                  buttons.push(_this5.createCancelButton());
                  break;

                case 'reset':
                  buttons.push(_this5.createResetButton());
                  break;
              }
            } else if (_typeof(action) === 'object') {
              switch (action.name) {
                case 'submit':
                  buttons.push(_this5.createSubmitButton(action.text, action.props, action.action));
                  break;

                case 'cancel':
                  buttons.push(_this5.createCancelButton(action.text, action.props, action.action));
                  break;

                case 'reset':
                  buttons.push(_this5.createResetButton(action.text, action.props, action.action));
                  break;

                default:
                  var _props = action.props || {};

                  _props.disabled = _this5.disabled || _this5.loading;
                  buttons.push(_this5.createButton(action.text, action.action, _props, null));
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
    }
  }, {
    key: "onOk",
    value: function () {
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
    }()
  }, {
    key: "validate",
    value: function validate() {
      return runValidation(this.currentValue, this.store.fields, true);
    }
  }, {
    key: "createSubmitButton",
    value: function createSubmitButton() {
      var _this6 = this;

      var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var btnProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var action = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var hasOkHandler = hasListener(this, 'ok');

      if (!hasOkHandler) {
        return null;
      }

      var props = this.props;
      var buttonProps = btnProps || props && props.okProps || {};

      if (!buttonProps.type) {
        buttonProps.type = 'primary';
      }

      buttonProps.disabled = this.disabled;
      buttonProps.loading = this.loading;
      return this.createButton(text || props && props.okText || '提交', action || function () {
        _this6.onOk(true);
      }, buttonProps, 'confirm-btn');
    }
  }, {
    key: "createButton",
    value: function createButton(text, action, attrs, classes) {
      var _this7 = this;

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
            action(_this7.store.context);
          }
        }
      }]), [text]);

      if (platform === 'mobile') {
        return [h("m-white-space"), Button];
      }

      return Button;
    }
  }, {
    key: "createCancelButton",
    value: function createCancelButton() {
      var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var btnProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var action = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var hasCancelHandler = hasListener(this, 'cancel');

      if (!hasCancelHandler) {
        return null;
      }

      var props = this.props;
      var buttonProps = btnProps || props && props.cancelProps || {};
      buttonProps.disabled = this.disabled || this.loading;
      return this.createButton(text || (props === null || props === void 0 ? void 0 : props.cancelText) || '取消', action || this.onCancel, buttonProps, 'cancel-btn');
    }
  }, {
    key: "createResetButton",
    value: function createResetButton() {
      var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var btnProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var action = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var hasResetHandler = hasListener(this, 'reset');

      if (!hasResetHandler) {
        return null;
      }

      var props = this.props;
      var buttonProps = btnProps || props && props.cancelProps || {};
      buttonProps.disabled = this.disabled || this.loading;
      return this.createButton(text || props && props.cancelText || '重置', action || this.onReset, buttonProps, 'reset-btn');
    }
  }, {
    key: "onReset",
    value: function onReset() {
      this.$emit('reset');
    }
  }, {
    key: "onCancel",
    value: function onCancel() {
      this.$emit('cancel');
    }
  }, {
    key: "setCurrentValue",
    value: function setCurrentValue() {
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
  }]);

  return SchemaForm;
}(Vue), _class3.Field = void 0, _class3.install = void 0, _class3.registerAntd = registerAntd, _class3.registerAntdMobile = registerAntdMobile, _class3.registerVant = registerVant, _class3.registerElement = registerElement, _class3.registerComponent = register, _class3.register = addComponent, _class3.registerResponsiveComponent = registerResponsiveComponent, _class3.registerLayout = registerLayout, _class3.registerDisplayComponent = registerDisplay, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "prefixCls", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "disabled", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "readonly", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "loading", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "actions", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "platform", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "mode", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "editable", [_dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "effects", [_dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "schema", [_dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "props", [_dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "value", [_dec13], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "title", [_dec14], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "inline", [_dec15], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "sticky", [_dec16], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "store", [_dec17], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return Vue.observable({
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
    });
  }
}), _applyDecoratedDescriptor(_class2.prototype, "readonlyChanged", [_dec18], Object.getOwnPropertyDescriptor(_class2.prototype, "readonlyChanged"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "disabledChanged", [_dec19], Object.getOwnPropertyDescriptor(_class2.prototype, "disabledChanged"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "platformChanged", [_dec20], Object.getOwnPropertyDescriptor(_class2.prototype, "platformChanged"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "propsChanged", [_dec21], Object.getOwnPropertyDescriptor(_class2.prototype, "propsChanged"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "modeChanged", [_dec22], Object.getOwnPropertyDescriptor(_class2.prototype, "modeChanged"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "loadingChanged", [_dec23], Object.getOwnPropertyDescriptor(_class2.prototype, "loadingChanged"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "valueChanged", [_dec24], Object.getOwnPropertyDescriptor(_class2.prototype, "valueChanged"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "currentValueChanged", [_dec25], Object.getOwnPropertyDescriptor(_class2.prototype, "currentValueChanged"), _class2.prototype)), _class2)) || _class);
export { SchemaForm as default };