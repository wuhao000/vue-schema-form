"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var utils_1 = require("@/schema-form/internal/utils");
var path_1 = require("@/schema-form/utils/path");
var register_1 = require("@/schema-form/utils/register");
var utils_2 = require("@/schema-form/utils/utils");
var validator_1 = require("@/uform/validator");
var classname_1 = require("classname");
var rxjs_1 = require("rxjs");
var vue_1 = require("vue");
var vue_class_component_1 = require("vue-class-component");
var vue_property_decorator_1 = require("vue-property-decorator");
var register_2 = require("./antd/register");
var register_3 = require("./element/register");
var register_4 = require("./layout/register");
var register_5 = require("./mobile/register");
var SchemaForm = /** @class */ (function (_super) {
    __extends(SchemaForm, _super);
    function SchemaForm() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.store = vue_1["default"].observable({
            fields: {},
            disabled: _this.disabled,
            loading: _this.loading,
            readonly: _this.readonly,
            platform: _this.platform,
            props: _this.props,
            effects: _this.effects,
            inline: _this.inline,
            slots: _this.$slots,
            editable: _this.editable,
            context: null
        });
        return _this;
    }
    SchemaForm.prototype.slotsChanged = function (slots) {
        this.store.slots = slots;
    };
    SchemaForm.prototype.readonlyChanged = function (readonly) {
        this.store.readonly = readonly;
    };
    SchemaForm.prototype.disabledChanged = function (disabled) {
        this.store.disabled = disabled;
    };
    SchemaForm.prototype.platformChanged = function (platform) {
        this.store.platform = platform;
    };
    SchemaForm.prototype.propsChanged = function (props) {
        this.store.props = props;
    };
    SchemaForm.prototype.modeChanged = function (mode) {
        this.store.editable = mode === 'edit';
    };
    SchemaForm.prototype.loadingChanged = function (loading) {
        this.store.loading = loading;
    };
    SchemaForm.prototype.mounted = function () {
        if (this.effects) {
            this.effects(this.store.context);
        }
    };
    SchemaForm.prototype.matchFields = function (paths) {
        var _this = this;
        var matchedPaths = path_1.match(paths, this.store.fields);
        return matchedPaths.map(function (path) { return _this.store.fields[path]; }).filter(function (it) { return !!it; });
    };
    SchemaForm.prototype.createContext = function () {
        var _this = this;
        var context = function () {
            var paths = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                paths[_i] = arguments[_i];
            }
            return {
                paths: function () {
                    return context.apply(void 0, paths).fields().map(function (it) { return it.plainPath; });
                },
                fields: function () {
                    return _this.matchFields(paths);
                },
                toggle: function () {
                    _this.matchFields(paths).forEach(function (field) {
                        field.visible = !field.visible;
                    });
                    return context.apply(void 0, paths);
                },
                value: function (value) {
                    var res = _this.matchFields(paths).map(function (it) { return it.setGetValue(value); });
                    if (value === undefined) {
                        if (paths.length === 1 && !path_1.isFuzzyPath(paths[0])) {
                            return res[0];
                        }
                        else {
                            return res;
                        }
                    }
                },
                hide: function () {
                    _this.matchFields(paths).forEach(function (field) {
                        field.visible = false;
                    });
                    return context.apply(void 0, paths);
                },
                show: function () {
                    _this.matchFields(paths).forEach(function (field) {
                        field.visible = true;
                    });
                    return context.apply(void 0, paths);
                },
                setEnum: function (options) {
                    _this.matchFields(paths).forEach(function (field) {
                        field["enum"] = options;
                    });
                    return context.apply(void 0, paths);
                },
                setFieldProps: function (props) {
                    _this.matchFields(paths).forEach(function (field) {
                        field.props = Object.assign({}, field.props, props);
                    });
                    return context.apply(void 0, paths);
                },
                onFieldCreate: function (callback) {
                    context.subscribe(utils_1.SchemaFormEvents.fieldCreate, paths, callback);
                    return context.apply(void 0, paths);
                },
                onFieldBlur: function (callback) {
                    context.subscribe(utils_1.SchemaFormEvents.fieldBlur, paths, callback);
                    return context.apply(void 0, paths);
                },
                onFieldFocus: function (callback) {
                    context.subscribe(utils_1.SchemaFormEvents.fieldFocus, paths, callback);
                    return context.apply(void 0, paths);
                },
                onFieldCreateOrChange: function (callback) {
                    return context.apply(void 0, paths).onFieldCreate(callback)
                        .onFieldChange(callback);
                },
                onFieldChange: function (callback) {
                    context.subscribe(utils_1.SchemaFormEvents.fieldChange, paths, callback);
                    return context.apply(void 0, paths);
                },
                subscribe: function (event, callback) {
                    context.subscribe(event, paths, callback);
                    return context.apply(void 0, paths);
                },
                takePath: function (number) {
                    return context.apply(void 0, path_1.takePath(paths, number));
                },
                appendPath: function (suffix) {
                    return context.apply(void 0, path_1.appendPath(paths, suffix));
                },
                disable: function () {
                    _this.matchFields(paths).forEach(function (field) {
                        field.disabled = true;
                    });
                    return context.apply(void 0, paths);
                },
                enable: function () {
                    _this.matchFields(paths).forEach(function (field) {
                        field.disabled = false;
                    });
                    return context.apply(void 0, paths);
                },
                replaceLastPath: function (last) {
                    return context.apply(void 0, path_1.replaceLastPath(paths, last));
                }
            };
        };
        context.subscribe = function (e, pathsOrHandler, handler) {
            if (!context.subscribes[e]) {
                context.subscribes[e] = new rxjs_1.Subject();
            }
            context.subscribes[e].subscribe({
                next: function (v) {
                    _this.$nextTick(function () {
                        if (typeof pathsOrHandler === 'function') {
                            pathsOrHandler(v);
                        }
                        else if (path_1.isPathMatchPatterns(v.path, typeof pathsOrHandler === 'string' ? [pathsOrHandler] : pathsOrHandler)) {
                            if (e === utils_1.SchemaFormEvents.fieldChange || e === utils_1.SchemaFormEvents.fieldCreate) {
                                handler(v.value, v.path);
                            }
                            else if ([utils_1.SchemaFormEvents.fieldFocus, utils_1.SchemaFormEvents.fieldBlur].includes(e)) {
                                handler(v.path);
                            }
                            else {
                                handler(v);
                            }
                        }
                    });
                }
            });
        };
        context.submit = function (forceValidate, callback) {
            _this.onOk(forceValidate, callback);
        };
        context.validate = function (handler) { return __awaiter(_this, void 0, void 0, function () {
            var errors;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, validator_1["default"](this.value, this.store.fields, true)];
                    case 1:
                        errors = _a.sent();
                        if (handler) {
                            handler(errors, context);
                        }
                        else {
                            return [2 /*return*/, errors];
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        context.onValidate = function (handler) {
            context.subscribe(utils_1.SchemaFormEvents.validate, handler);
        };
        context.subscribes = {};
        context.getValue = function () {
            return _this.value;
        };
        context.trigger = function (event, value) {
            _this.$nextTick(function () {
                var subject = _this.store.context.subscribes[event];
                if (subject) {
                    subject.next(value);
                }
            });
        };
        return context;
    };
    SchemaForm.prototype.created = function () {
        var _this = this;
        this.store.context = this.createContext();
        this.store.editable = this.mode !== undefined ? this.mode === 'edit' : this.editable;
        if (this.mode !== undefined) {
            console.warn('mode属性已经废弃，请使用editable属性代替');
        }
        this.$watch(function () { return _this.editable; }, function (editable) {
            _this.store.editable = editable;
        });
        this.$on('SchemaForm.addSchemaField', function (field) {
            if (field) {
                _this.store.fields[field.plainPath] = field;
            }
        });
        this.$on('SchemaForm.removeSchemaField', function (field) {
            if (field) {
                delete _this.store.fields[field.plainPath];
            }
        });
    };
    SchemaForm.prototype.render = function () {
        var _a;
        var _b = this, title = _b.title, sticky = _b.sticky, prefixCls = _b.prefixCls, store = _b.store, value = _b.value, schema = _b.schema;
        var rootFieldDef = Object.assign({}, schema, {
            type: 'object',
            title: title,
            props: this.schema.props
        });
        var content = [
            this.$slots.header,
            utils_1.renderField(null, store, rootFieldDef, value, 0, false, this.$createElement)
        ];
        var footer = [
            this.renderButtons(),
            this.$slots.footer
        ];
        if (this.sticky) {
            content = <utils_2.LibComponents.content>
        {content}
      </utils_2.LibComponents.content>;
            footer = <utils_2.LibComponents.footer>
        {footer}
      </utils_2.LibComponents.footer>;
        }
        var classes = classname_1["default"](prefixCls, (_a = {},
            _a[prefixCls + "-sticky"] = sticky,
            _a), prefixCls + "-" + this.platform);
        return <div class={classes}>
      {content}
      {footer}
    </div>;
    };
    SchemaForm.prototype.renderButtons = function () {
        var _this = this;
        var props = this.store.props;
        var actions = this.actions;
        if (props && this.store.editable) {
            if (this.$slots.btns) {
                return this.$slots.btns;
            }
            var buttons_1 = [];
            if (actions) {
                actions.forEach(function (action) {
                    if (typeof action === 'string') {
                        switch (action) {
                            case 'submit':
                                buttons_1.push(_this.createSubmitButton());
                                break;
                            case 'cancel':
                                buttons_1.push(_this.createCancelButton());
                                break;
                            case 'reset':
                                buttons_1.push(_this.createResetButton());
                                break;
                        }
                    }
                    else if (typeof action === 'object') {
                        switch (action.name) {
                            case 'submit':
                                buttons_1.push(_this.createSubmitButton(action.text, action.props, action.action));
                                break;
                            case 'cancel':
                                buttons_1.push(_this.createCancelButton(action.text, action.props, action.action));
                                break;
                            case 'reset':
                                buttons_1.push(_this.createResetButton(action.text, action.props, action.action));
                                break;
                            default:
                                var props_1 = action.props || {};
                                props_1.disabled = _this.disabled || _this.loading;
                                buttons_1.push(_this.createButton(action.text, action.action, props_1, null));
                                break;
                        }
                    }
                });
            }
            else {
                buttons_1.push(this.createCancelButton());
                buttons_1.push(this.createSubmitButton());
                buttons_1.push(this.createResetButton());
            }
            return <div class="action-btns">
        {buttons_1}
      </div>;
        }
    };
    SchemaForm.prototype.onOk = function (forceValidate, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var errors;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!utils_1.hasListener(this, 'ok')) return [3 /*break*/, 3];
                        if (!forceValidate) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.validate()];
                    case 1:
                        errors = _a.sent();
                        if (errors.length) {
                            console.warn('有错误', errors);
                            this.store.context.trigger(utils_1.SchemaFormEvents.validate, errors);
                        }
                        else {
                            if (callback) {
                                callback(this.value);
                            }
                            else {
                                this.$emit('ok', this.value);
                            }
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        if (callback) {
                            callback(this.value);
                        }
                        else {
                            this.$emit('ok', this.value);
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SchemaForm.prototype.validate = function () {
        return validator_1["default"](this.value, this.store.fields, true);
    };
    SchemaForm.prototype.createSubmitButton = function (text, btnProps, action) {
        var _this = this;
        if (text === void 0) { text = null; }
        if (btnProps === void 0) { btnProps = null; }
        if (action === void 0) { action = null; }
        var hasOkHandler = utils_1.hasListener(this, 'ok');
        if (!hasOkHandler) {
            return null;
        }
        var props = this.props;
        var buttonProps = btnProps || (props && props.okProps) || {};
        if (!buttonProps.type) {
            buttonProps.type = 'primary';
        }
        buttonProps.disabled = this.disabled;
        return this.createButton(text || props && props.okText || '提交', action || (function () {
            _this.onOk(true);
        }), buttonProps, 'confirm-btn');
    };
    SchemaForm.prototype.createButton = function (text, action, attrs, classes) {
        var _this = this;
        var platform = this.platform;
        var ButtonComponent = platform === 'mobile' ? 'm-button' : utils_2.LibComponents.button;
        var Button = <ButtonComponent class={classes} props={attrs} onClick={function () {
            action(_this.store.context);
        }}>
      {text}
    </ButtonComponent>;
        if (platform === 'mobile') {
            return [<m-white-space />, Button];
        }
        return Button;
    };
    SchemaForm.prototype.createCancelButton = function (text, btnProps, action) {
        if (text === void 0) { text = null; }
        if (btnProps === void 0) { btnProps = null; }
        if (action === void 0) { action = null; }
        var hasCancelHandler = utils_1.hasListener(this, 'cancel');
        if (!hasCancelHandler) {
            return null;
        }
        var props = this.props;
        var buttonProps = btnProps || (props && props.cancelProps) || {};
        buttonProps.disabled = this.disabled || this.loading;
        return this.createButton(text || props && props.cancelText || '取消', action || this.onCancel, buttonProps, 'cancel-btn');
    };
    SchemaForm.prototype.createResetButton = function (text, btnProps, action) {
        if (text === void 0) { text = null; }
        if (btnProps === void 0) { btnProps = null; }
        if (action === void 0) { action = null; }
        var hasResetHandler = utils_1.hasListener(this, 'reset');
        if (!hasResetHandler) {
            return null;
        }
        var props = this.props;
        var buttonProps = btnProps || (props && props.cancelProps) || {};
        buttonProps.disabled = this.disabled || this.loading;
        return this.createButton(text || props && props.cancelText || '重置', action || this.onReset, buttonProps, 'reset-btn');
    };
    SchemaForm.prototype.onReset = function () {
        this.$emit('reset');
    };
    SchemaForm.prototype.onCancel = function () {
        this.$emit('cancel');
    };
    SchemaForm.registerAntd = register_2.registerAntd;
    SchemaForm.registerAntdMobile = register_5.registerAntdMobile;
    SchemaForm.registerElement = register_3.registerElement;
    SchemaForm.registerComponent = register_1.register;
    SchemaForm.registerLayout = register_4.registerLayout;
    SchemaForm.registerDisplayComponent = register_1.registerDisplay;
    __decorate([
        vue_property_decorator_1.Prop({ type: String, "default": 'schema-form' })
    ], SchemaForm.prototype, "prefixCls");
    __decorate([
        vue_property_decorator_1.Prop({ type: Boolean, "default": false })
    ], SchemaForm.prototype, "disabled");
    __decorate([
        vue_property_decorator_1.Prop({ type: Boolean, "default": false })
    ], SchemaForm.prototype, "readonly");
    __decorate([
        vue_property_decorator_1.Prop({ type: Boolean, "default": false })
    ], SchemaForm.prototype, "loading");
    __decorate([
        vue_property_decorator_1.Prop({ type: Array })
    ], SchemaForm.prototype, "actions");
    __decorate([
        vue_property_decorator_1.Prop({ type: String, "default": 'desktop' })
    ], SchemaForm.prototype, "platform");
    __decorate([
        vue_property_decorator_1.Prop({ type: String })
    ], SchemaForm.prototype, "mode");
    __decorate([
        vue_property_decorator_1.Prop({ type: Boolean, "default": true })
    ], SchemaForm.prototype, "editable");
    __decorate([
        vue_property_decorator_1.Prop(Function)
    ], SchemaForm.prototype, "effects");
    __decorate([
        vue_property_decorator_1.Prop({ type: Object, required: true })
    ], SchemaForm.prototype, "schema");
    __decorate([
        vue_property_decorator_1.Prop({ type: Object, "default": function () { return ({}); } })
    ], SchemaForm.prototype, "props");
    __decorate([
        vue_property_decorator_1.Prop([Object, Array])
    ], SchemaForm.prototype, "value");
    __decorate([
        vue_property_decorator_1.Prop([String, Object])
    ], SchemaForm.prototype, "title");
    __decorate([
        vue_property_decorator_1.Prop({ type: Boolean, "default": false })
    ], SchemaForm.prototype, "inline");
    __decorate([
        vue_property_decorator_1.Prop({ type: Boolean, "default": false })
    ], SchemaForm.prototype, "sticky");
    __decorate([
        vue_property_decorator_1.Provide()
    ], SchemaForm.prototype, "store");
    __decorate([
        vue_property_decorator_1.Watch('$slots')
    ], SchemaForm.prototype, "slotsChanged");
    __decorate([
        vue_property_decorator_1.Watch('readonly', { immediate: true })
    ], SchemaForm.prototype, "readonlyChanged");
    __decorate([
        vue_property_decorator_1.Watch('disabled', { immediate: true })
    ], SchemaForm.prototype, "disabledChanged");
    __decorate([
        vue_property_decorator_1.Watch('platform')
    ], SchemaForm.prototype, "platformChanged");
    __decorate([
        vue_property_decorator_1.Watch('props', { immediate: true, deep: true })
    ], SchemaForm.prototype, "propsChanged");
    __decorate([
        vue_property_decorator_1.Watch('mode')
    ], SchemaForm.prototype, "modeChanged");
    __decorate([
        vue_property_decorator_1.Watch('loading', { immediate: true })
    ], SchemaForm.prototype, "loadingChanged");
    SchemaForm = __decorate([
        vue_class_component_1["default"]({
            name: utils_2.ASchemaForm
        })
    ], SchemaForm);
    return SchemaForm;
}(vue_1["default"]));
exports["default"] = SchemaForm;
