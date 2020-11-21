import _mergeJSXProps4 from "@vue/babel-helper-vue-jsx-merge-props";
import _mergeJSXProps3 from "@vue/babel-helper-vue-jsx-merge-props";
import _mergeJSXProps2 from "@vue/babel-helper-vue-jsx-merge-props";
import _regeneratorRuntime from "/Users/wuhao/IdeaProjects/github/vue-schema-form/node_modules/@babel/runtime/regenerator";
import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _temp;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

import AsyncValidator from 'async-validator';
import Component, { mixins } from 'vue-class-component';
import { Inject, Prop, Watch } from 'vue-property-decorator';
import Emitter from "../mixins/emitter";
import { isEqual } from "../uform/utils";
import ArrayWrapper from "../array-wrapper";
import { createSimpleMobileFieldComponent } from "../compatible";
import { SCHEMA_FIELD_FORM_VALUE_INJECT_KEY, SCHEMA_FIELD_INJECT_KEY, SCHEMA_FORM_STORE_INJECT_KEY } from "../form";
import { addRule, DESKTOP, getColComponent, getConfirmFunction, getDefaultValue, getOptions, isNull, LibComponents, MOBILE, swap, TYPES } from "../utils/utils";
import { getComponentType, getCurrentValue, getFormItemComponent, getRealFields, matchCondition, renderField as _renderField, SchemaFormEvents } from "./utils";
var FormField = (_dec = Component({
  name: 'FormField',
  provide: function provide() {
    var _ref;

    return _ref = {}, _ref[SCHEMA_FIELD_INJECT_KEY] = this['field'], _ref[SCHEMA_FIELD_FORM_VALUE_INJECT_KEY] = this['formValue'], _ref;
  }
}), _dec2 = Prop(Object), _dec3 = Prop([Object, Array]), _dec4 = Prop({
  type: Boolean,
  default: true
}), _dec5 = Prop(), _dec6 = Prop(), _dec7 = Prop({
  type: Boolean,
  default: false
}), _dec8 = Prop(Array), _dec9 = Prop(Array), _dec10 = Prop({
  required: true
}), _dec11 = Prop(Array), _dec12 = Inject(SCHEMA_FORM_STORE_INJECT_KEY), _dec13 = Watch('currentValue', {
  deep: true,
  immediate: true
}), _dec14 = Watch('formValue', {
  deep: true
}), _dec15 = Watch('value', {
  immediate: true
}), _dec16 = Watch('field', {
  immediate: true
}), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_mixins) {
  _inheritsLoose(FormField, _mixins);

  function FormField() {
    var _this$definition;

    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _mixins.call.apply(_mixins, [this].concat(args)) || this;

    _initializerDefineProperty(_assertThisInitialized(_this), "definition", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_assertThisInitialized(_this), "formValue", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_assertThisInitialized(_this), "wrap", _descriptor3, _assertThisInitialized(_this));

    _initializerDefineProperty(_assertThisInitialized(_this), "value", _descriptor4, _assertThisInitialized(_this));

    _initializerDefineProperty(_assertThisInitialized(_this), "content", _descriptor5, _assertThisInitialized(_this));

    _initializerDefineProperty(_assertThisInitialized(_this), "disabled", _descriptor6, _assertThisInitialized(_this));

    _initializerDefineProperty(_assertThisInitialized(_this), "path", _descriptor7, _assertThisInitialized(_this));

    _initializerDefineProperty(_assertThisInitialized(_this), "schemaPath", _descriptor8, _assertThisInitialized(_this));

    _initializerDefineProperty(_assertThisInitialized(_this), "field", _descriptor9, _assertThisInitialized(_this));

    _initializerDefineProperty(_assertThisInitialized(_this), "pathPrefix", _descriptor10, _assertThisInitialized(_this));

    _initializerDefineProperty(_assertThisInitialized(_this), "store", _descriptor11, _assertThisInitialized(_this));

    _defineProperty(_assertThisInitialized(_this), "currentValue", getCurrentValue(_this.value, (_this$definition = _this.definition) === null || _this$definition === void 0 ? void 0 : _this$definition.default));

    return _this;
  }

  var _proto = FormField.prototype;

  _proto.renderField = function renderField(field, currentValue, index, wrap) {
    return _renderField(this.pathPrefix, this.store, field, currentValue, index, wrap, this.$createElement, this);
  };

  _proto.currentValueChanged = function currentValueChanged(currentValue, old) {
    if (!isEqual(currentValue, this.value)) {
      this.field.value = this.currentValue;

      if (this.store.editable && this.field.editable) {
        this.$emit('input', currentValue);
        this.$emit('change', currentValue);
      }

      this.store.context.trigger(SchemaFormEvents.fieldChange, {
        path: this.field.plainPath,
        value: currentValue,
        field: this.field
      });
    }
  };

  _proto.formValueChanged = function formValueChanged(val) {
    var definition = this.definition;

    if (definition.depends) {
      if (typeof definition.depends === 'function') {
        this.field.visible = definition.depends(val);
      } else {
        return !definition.depends.map(function (condition) {
          return matchCondition(val, condition);
        }).some(function (it) {
          return !it;
        });
      }
    }
  };

  _proto.valueChanged = function valueChanged(value) {
    if (!isEqual(this.currentValue, value)) {
      this.currentValue = getCurrentValue(value, this.definition.default);
    }
  };

  _proto.created = function created() {
    var _this2 = this;

    var field = this.field,
        store = this.store;

    if (this.currentValue === undefined || this.currentValue === null) {
      this.currentValue = getDefaultValue(field);
    }

    field.validate = this.validate;
    field.value = this.currentValue;
    field.focus = this.focus;

    field.setGetValue = function (value) {
      if (value !== undefined) {
        _this2.currentValue = getCurrentValue(value, _this2.definition.default);
      } else {
        return _this2.currentValue;
      }
    };

    store.context.trigger(SchemaFormEvents.fieldCreate, {
      path: field.plainPath,
      value: this.currentValue,
      field: this.field
    });
  };

  _proto.focus = function focus() {
    if (this.$el.focus) {
      this.$el.focus({
        preventScroll: false
      });
      this.$el.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  _proto.fieldChanged = function fieldChanged(field) {
    this.dispatch('ASchemaForm', 'SchemaForm.addSchemaField', [field]);
  };

  _proto.beforeDestroy = function beforeDestroy() {
    this.dispatch('ASchemaForm', 'SchemaForm.removeSchemaField', [this.field]);
  };

  _proto.renderInputComponent = function renderInputComponent() {
    var _this3 = this;

    var h = this.$createElement;
    var props = this.props,
        content = this.content,
        onInput = this.onInput,
        currentValue = this.currentValue,
        platform = this.store.platform,
        isDisabled = this.isDisabled,
        definition = this.definition,
        field = this.field;

    if (definition.slot) {
      if (this.store.root.$slots && this.store.root.$slots[definition.slot]) {
        return this.store.root.$slots[definition.slot];
      }

      if (this.store.root.$scopedSlots && this.store.root.$scopedSlots[definition.slot]) {
        return this.store.root.$scopedSlots[definition.slot](currentValue);
      }

      return;
    }

    var inputFieldDef = this.component;
    var InputFieldComponent = inputFieldDef.component;

    if (content) {
      return content;
    }

    if ((!this.store.editable || !this.field.editable) && field.displayValue) {
      var displayValue = '';

      if (typeof field.displayValue === 'function') {
        displayValue = field.displayValue(currentValue, this.formValue, this.field);
      } else {
        displayValue = field.displayValue;
      }

      if (typeof displayValue === 'object') {
        return displayValue;
      } else {
        return h("span", [displayValue]);
      }
    }

    var style = _extends({}, props.style || {});

    if (inputFieldDef.layout) {
      props.layout = definition.layout;
      var noWrap = isNull(this.field.title);
      props.fields = getRealFields(definition.fields).map(function (field, index) {
        return _this3.renderField(field, currentValue, index, !noWrap);
      });
    }

    if (field.array && inputFieldDef.forArray === false) {
      return this.createArrayInputComponent(InputFieldComponent);
    }

    props.disabled = isDisabled;
    props.value = currentValue;
    props.title = props.title || (platform === 'mobile' ? field.title : null);

    if (definition.type === TYPES.object && definition.props) {
      if (!definition.props.props) {
        definition.props.props = {};
      }

      Object.keys(definition.props).forEach(function (key) {
        if (key !== 'props') {
          definition.props.props[key] = definition.props[key];
        }
      });
    }

    var className = props.className;
    delete props.className;
    delete props.style;
    var nativeEvents = {};
    var events = {};

    if (this.definition.events) {
      Object.keys(this.definition.events).forEach(function (eventName) {
        events[eventName] = function () {
          var _this3$definition$eve;

          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          (_this3$definition$eve = _this3.definition.events)[eventName].apply(_this3$definition$eve, [_this3.store.context].concat(args));
        };
      });
    }

    if (this.definition.nativeEvents) {
      Object.keys(this.definition.nativeEvents).forEach(function (eventName) {
        nativeEvents[eventName] = function () {
          var _this3$definition$nat;

          for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
          }

          (_this3$definition$nat = _this3.definition.nativeEvents)[eventName].apply(_this3$definition$nat, [_this3.store.context].concat(args));
        };
      });
    }

    var slots = {};
    var scopedSlots = {};

    if (this.definition.slots) {
      var slotsDef = this.definition.slots;
      Object.keys(slotsDef).forEach(function (slotName) {
        if (typeof slotsDef[slotName] === 'string') {
          if (_this3.store.root.$slots && _this3.store.root.$slots[slotsDef[slotName]]) {
            slots[slotName] = _this3.store.root.$slots[slotsDef[slotName]];
          }
        } else {
          slots[slotName] = slotsDef[slotName];
        }
      });
    }

    if (this.definition.scopedSlots) {
      var _slotsDef = this.definition.scopedSlots;
      Object.keys(_slotsDef).forEach(function (slotName) {
        if (typeof _slotsDef[slotName] === 'string') {
          if (_this3.store.root.$scopedSlots && _this3.store.root.$scopedSlots[_slotsDef[slotName]]) {
            scopedSlots[slotName] = _this3.store.root.$scopedSlots[_slotsDef[slotName]];
          }
        } else {
          scopedSlots[slotName] = _slotsDef[slotName];
        }
      });
    } // @ts-ignore


    return h(InputFieldComponent, _mergeJSXProps([{}, {
      "props": props
    }, {
      "scopedSlots": scopedSlots,
      "attrs": {
        "value": currentValue
      },
      "class": className
    }, {
      "attrs": props
    }, {
      "style": style
    }, {
      "nativeOn": nativeEvents
    }, {}, {
      "on": _extends({
        blur: this.onBlur,
        focus: this.onFocus,
        keydown: this.onKeydown,
        keyup: this.onKeyup,
        input: onInput,
        change: this.onChange,
        compositionend: function compositionend(e) {
          _this3.onInput(e.target.value);
        }
      }, events)
    }, {
      "key": field.plainPath,
      "ref": "input"
    }]), [Object.keys(slots).map(function (slotKey) {
      return h("template", {
        "slot": slotKey
      }, [slots[slotKey]]);
    })]);
  };

  _proto.createArrayInputComponent = function createArrayInputComponent(InputFieldComponent) {
    var _this4 = this;

    var h = this.$createElement;
    var platform = this.store.platform;
    var onArrayItemInput = this.onArrayItemInput,
        props = this.props,
        currentValue = this.currentValue,
        isDisabled = this.isDisabled,
        field = this.field,
        definition = this.definition;
    var ArrayComponent = ArrayWrapper;

    if (typeof definition.arrayComponent === 'string') {
      // @ts-ignore
      var componentDef = getComponentType(this.store, {
        type: definition.arrayComponent,
        props: definition.arrayProps
      });

      if (componentDef.component !== 'empty') {
        ArrayComponent = componentDef.component;
      }
    } else if (['function', 'object'].includes(typeof definition.arrayComponent)) {
      ArrayComponent = definition.arrayComponent;
    }

    var arrayProps = _extends({}, this.props, definition.arrayProps);

    var arrayClass = arrayProps.className;
    var arrayStyle = arrayProps.style;
    delete arrayProps.className;
    delete arrayProps.style; // @ts-ignore

    return h(ArrayComponent, _mergeJSXProps3([{}, {
      "props": arrayProps
    }, {
      "class": arrayClass,
      "style": arrayStyle,
      "attrs": {
        "disabled": isDisabled,
        "subForm": field.type === TYPES.object,
        "addBtnText": props.addBtnText,
        "platform": platform,
        "addBtnProps": props.addBtnProps,
        "cellSpan": props.cellSpan
      },
      "ref": "array",
      "key": field.plainPath,
      "on": {
        "remove": /*#__PURE__*/function () {
          var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(index) {
            var confirmFunc;
            return _regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.prev = 0;
                    confirmFunc = getConfirmFunction(platform);
                    _context.next = 4;
                    return confirmFunc('确定删除该条吗？', '提示');

                  case 4:
                    _this4.removeArrayItem(index);

                    _context.next = 10;
                    break;

                  case 7:
                    _context.prev = 7;
                    _context.t0 = _context["catch"](0);
                    console.error(_context.t0);

                  case 10:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, null, [[0, 7]]);
          }));

          return function (_x) {
            return _ref2.apply(this, arguments);
          };
        }(),
        "moveDown": function moveDown(index) {
          if (index <= currentValue.length - 1) {
            swap(currentValue, index, index + 1);
          }
        },
        "moveUp": function moveUp(index) {
          if (index > 0) {
            swap(currentValue, index, index - 1);
          }
        },
        "add": function add() {
          _this4.addArrayItem();
        }
      }
    }]), [currentValue ? currentValue.map(function (v, index) {
      var itemProps = _extends({}, props, {
        pathPrefix: _this4.path.concat(index),
        schemaPath: _this4.path
      });

      if (field.type === TYPES.object) {
        itemProps.definition = _extends({}, itemProps.definition);
        delete itemProps.definition.array;
      }

      var className = itemProps.className;
      var style = itemProps.style;
      delete itemProps.className;
      delete itemProps.style; // @ts-ignore

      return h(InputFieldComponent, _mergeJSXProps2([{}, {
        "attrs": itemProps
      }, {
        "class": className,
        "style": style,
        "attrs": {
          "arrayIndex": index,
          "disabled": isDisabled,
          "value": v,
          "title": platform === 'mobile' ? field.title : null
        },
        "key": field.plainPath + '-' + index,
        "on": {
          "blur": _this4.onBlur,
          "focus": _this4.onFocus,
          "input": function input(val) {
            onArrayItemInput(val, index);
          }
        }
      }]));
    }) : null]);
  };

  _proto.onBlur = function onBlur(event) {
    if (!this.field.valid) {
      this.validate();
    } else {
      this.validate('blur');
    }

    this.store.context.trigger(SchemaFormEvents.fieldBlur, this.getEventMetadata(event));
  };

  _proto.getEventMetadata = function getEventMetadata(event) {
    return {
      event: event,
      path: this.field.plainPath,
      field: this.field
    };
  };

  _proto.onFocus = function onFocus(event) {
    this.store.context.trigger(SchemaFormEvents.fieldFocus, this.getEventMetadata(event));
  };

  _proto.onKeydown = function onKeydown(event) {
    this.store.context.trigger(SchemaFormEvents.fieldKeydown, this.getEventMetadata(event));
  };

  _proto.onKeyup = function onKeyup(event) {
    this.store.context.trigger(SchemaFormEvents.fieldKeyup, this.getEventMetadata(event));
  };

  _proto.render = function render() {
    var props = this.props,
        field = this.field,
        definition = this.definition,
        editable = this.editable,
        platform = this.store.platform;

    if (!editable) {
      props.definition = definition;
      props.field = field;
    }

    var inputComponent = this.renderInputComponent();
    var item = null;
    var FormItemComponent = getFormItemComponent(platform);
    var ColComponent = getColComponent();

    if (platform === DESKTOP) {
      item = this.renderDesktopComponent(inputComponent, FormItemComponent, item, ColComponent);
    } else if (platform === MOBILE) {
      if (!editable) {
        item = createSimpleMobileFieldComponent(field.title, inputComponent, field, this.$createElement);
      } else {
        item = inputComponent;
      }
    }

    var style = {};

    if (!field.visible) {
      style.display = 'none';
    }

    if (item) {
      if (item.data) {
        item.data.staticStyle = style;
      } else {
        item.data = {
          staticStyle: style
        };
      }
    }

    return item;
  };

  _proto.renderDesktopComponent = function renderDesktopComponent(inputComponent, FormItemComponent, item, ColComponent) {
    var _definition$wrapperPr;

    var h = this.$createElement;
    var definition = this.definition,
        field = this.field;
    var formItemProps = this.getFormItemProps();
    var style = formItemProps.style;
    var className = formItemProps.className;
    delete formItemProps.style;
    delete formItemProps.className;
    var noWrap = isNull(field.title);
    var formItem = noWrap ? inputComponent : h(FormItemComponent, _mergeJSXProps4([{}, {
      "attrs": _extends({}, formItemProps, {
        label: null
      })
    }, {
      "class": className,
      "style": style
    }]), [(definition === null || definition === void 0 ? void 0 : (_definition$wrapperPr = definition.wrapperProps) === null || _definition$wrapperPr === void 0 ? void 0 : _definition$wrapperPr.noTitle) || !formItemProps.label ? '' : h("span", {
      "slot": "label"
    }, [formItemProps.label]), inputComponent, definition.description ? h("div", [definition.description]) : null]);

    if (definition.span) {
      item = h(ColComponent, {
        "attrs": {
          "span": definition.span
        }
      }, [formItem]);
    } else {
      item = formItem;
    }

    return item;
  };

  _proto.getRules = function getRules(type) {
    var definition = this.definition,
        field = this.field;
    var rules = field.rules || [];

    if (rules.length === 0) {
      if (field.required) {
        addRule(rules, field, {
          required: true,
          message: field.title + "\u4E3A\u5FC5\u586B\u9879"
        });
      }

      if (typeof definition.min === 'number') {
        addRule(rules, field, {
          min: definition.min,
          message: field.title + "\u4E0D\u80FD\u5C0F\u4E8E" + definition.min
        });
      }

      if (typeof definition.max === 'number') {
        addRule(rules, field, {
          max: definition.max,
          message: field.title + "\u4E0D\u80FD\u5927\u4E8E" + definition.max
        });
      }
    }

    if (type) {
      return rules.filter(function (it) {
        return it.trigger === type;
      });
    }

    return rules;
  };

  _proto.onInput = function onInput(value) {
    if (!isEqual(this.currentValue, value)) {
      this.currentValue = getCurrentValue(value, this.definition.default);
      this.validate('change');
    }
  };

  _proto.onChange = function onChange(value) {
    if (this.component.modelEvent === 'change') {
      this.onInput(value);
    } else {
      this.$emit('change', value);
    }
  };

  _proto.getFormItemProps = function getFormItemProps() {
    var h = this.$createElement;
    var definition = this.definition,
        field = this.field,
        _this$store = this.store,
        platform = _this$store.platform,
        editable = _this$store.editable;
    var component = getFormItemComponent(platform);
    var props = {
      required: editable ? definition.required : null,
      title: field.title,
      label: field.title
    };

    if (platform === DESKTOP) {
      if (definition.tip) {
        var popover = LibComponents.popover;
        props.label = h(LibComponents.popover, {
          "attrs": {
            "content": definition.tip,
            "trigger": "hover"
          }
        }, [h("span", {
          "slot": popover === 'el-popover' ? 'reference' : 'default'
        }, [field.title, h(LibComponents.icon, {
          "style": {
            marginLeft: '5px',
            color: '#247dc5'
          },
          "attrs": {
            "type": LibComponents.icons.info
          }
        })])]);
      } else {
        props.label = field.title;
      }
    }

    if (definition.wrapperProps) {
      _extends(props, definition.wrapperProps);

      if (definition.wrapperProps.noTitle) {
        props.title = null;
        props.label = null;
      }
    }

    if (component === 'd-form-item' || component === 'a-form-item') {
      props.help = field.errors.join('、');

      if (props.help) {
        props.hasFeedback = true;
        props.validateStatus = 'error';
      }
    } else if (component === 'el-form-item') {
      props.error = field.errors.join('、');
    }

    return props;
  };

  _proto.validate = function validate(type) {
    var _this5 = this;

    if (this.component.layout) {
      return true;
    }

    var field = this.field;

    if (this.type === TYPES.object && this.$refs.array) {
      var array = this.$refs.array;
      var validateFields = array.$children.filter(function (it) {
        return it.validate;
      });
      return new Promise(function (resolve) {
        Promise.all(validateFields.map(function (it) {
          return it.validate();
        })).then(function (values) {
          resolve(values.filter(function (it) {
            return !!it;
          }).flat());
        });
      });
    }

    var rules = this.getRules(type);

    if (rules.length) {
      var _AsyncValidator, _model;

      var validator = new AsyncValidator((_AsyncValidator = {}, _AsyncValidator[field.plainPath] = rules, _AsyncValidator));
      var value = this.currentValue;

      if ([TYPES.integer, TYPES.double, TYPES.number].includes(this.type)) {
        value = parseFloat(value);
      }

      var model = (_model = {}, _model[field.plainPath] = value, _model);
      return new Promise(function (resolve) {
        validator.validate(model, {
          firstFields: true
        }, function (errors) {
          if (errors) {
            field.valid = false;
            field.errors = errors.map(function (error) {
              return error.message;
            });
          } else {
            field.valid = true;
            field.errors = [];
          }

          if (errors) {
            resolve(errors.map(function (it) {
              return {
                message: it.message,
                path: _this5.field.plainPath
              };
            }));
          } else {
            resolve(null);
          }
        });
      });
    }

    return true;
  };

  _proto.removeArrayItem = function removeArrayItem(index) {
    this.currentValue.splice(index, 1);
  };

  _proto.addArrayItem = function addArrayItem() {
    if (this.currentValue) {
      if (this.type === TYPES.object) {
        this.currentValue.push({});
      } else {
        this.currentValue.push(null);
      }
    } else {
      if (this.type === TYPES.object) {
        this.currentValue = [{}];
      } else {
        this.currentValue = [null];
      }
    }
  };

  _proto.onArrayItemInput = function onArrayItemInput(val, index) {
    this.currentValue.splice(index, 1, val);
    this.onInput(this.currentValue);
  };

  _createClass(FormField, [{
    key: "options",
    get: function get() {
      return getOptions(this.field);
    }
  }, {
    key: "component",
    get: function get() {
      return this.field.component;
    }
  }, {
    key: "props",
    get: function get() {
      var field = this.field,
          definition = this.definition,
          component = this.component,
          path = this.path,
          schemaPath = this.schemaPath,
          platform = this.store.platform;

      var props = _extends({}, component.getProps(field));

      var type = field.type;

      if (type === TYPES.object) {
        props.platform = platform;
        props.editable = this.store.editable;
        props.pathPrefix = path;
        props.schemaPath = schemaPath;
        props.layoutType = definition.layoutType;
        props.layoutProps = definition.layoutProps;
      }

      if (definition.placeholder) {
        props.placeholder = definition.placeholder;
      }

      props.required = field.required;

      if (!this.store.editable || platform === DESKTOP) {
        delete props.required;
      }

      return props;
    }
  }, {
    key: "input",
    get: function get() {
      return this.$refs.input;
    }
  }, {
    key: "isDisabled",
    get: function get() {
      return this.disabled || this.field.disabled || this.field.props && this.field.props.disabled;
    }
  }, {
    key: "type",
    get: function get() {
      return this.field.type;
    }
  }, {
    key: "editable",
    get: function get() {
      return this.store.editable && this.field.editable;
    }
  }, {
    key: "error",
    get: function get() {
      return this.field.errors.join('、');
    }
  }]);

  return FormField;
}(mixins(Emitter)), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "definition", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "formValue", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "wrap", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "value", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "content", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "disabled", [_dec7], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "path", [_dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "schemaPath", [_dec9], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "field", [_dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "pathPrefix", [_dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "store", [_dec12], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class2.prototype, "currentValueChanged", [_dec13], Object.getOwnPropertyDescriptor(_class2.prototype, "currentValueChanged"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "formValueChanged", [_dec14], Object.getOwnPropertyDescriptor(_class2.prototype, "formValueChanged"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "valueChanged", [_dec15], Object.getOwnPropertyDescriptor(_class2.prototype, "valueChanged"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "fieldChanged", [_dec16], Object.getOwnPropertyDescriptor(_class2.prototype, "fieldChanged"), _class2.prototype)), _class2)) || _class);
export { FormField as default };