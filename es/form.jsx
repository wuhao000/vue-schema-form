import * as tslib_1 from "tslib";
import { hasListener, renderField, SchemaFormEvents } from '@/schema-form/internal/utils';
import { appendPath, isFuzzyPath, isPathMatchPatterns, match, replaceLastPath, takePath } from '@/schema-form/utils/path';
import { register, registerDisplay } from '@/schema-form/utils/register';
import { ASchemaForm, LibComponents } from '@/schema-form/utils/utils';
import runValidation from '@/uform/validator';
import className from 'classname';
import { Subject } from 'rxjs';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Provide, Watch } from 'vue-property-decorator';
import { registerAntd } from './antd/register';
import { registerElement } from './element/register';
import { registerLayout } from './layout/register';
import { registerAntdMobile } from './mobile/register';
let SchemaForm = class SchemaForm extends Vue {
    constructor() {
        super(...arguments);
        this.store = Vue.observable({
            fields: {},
            disabled: this.disabled,
            loading: this.loading,
            readonly: this.readonly,
            platform: this.platform,
            props: this.props,
            effects: this.effects,
            inline: this.inline,
            slots: this.$slots,
            editable: this.editable,
            context: null
        });
    }
    slotsChanged(slots) {
        this.store.slots = slots;
    }
    readonlyChanged(readonly) {
        this.store.readonly = readonly;
    }
    disabledChanged(disabled) {
        this.store.disabled = disabled;
    }
    platformChanged(platform) {
        this.store.platform = platform;
    }
    propsChanged(props) {
        this.store.props = props;
    }
    modeChanged(mode) {
        this.store.editable = mode === 'edit';
    }
    loadingChanged(loading) {
        this.store.loading = loading;
    }
    mounted() {
        if (this.effects) {
            this.effects(this.store.context);
        }
    }
    matchFields(paths) {
        const matchedPaths = match(paths, this.store.fields);
        return matchedPaths.map(path => this.store.fields[path]).filter(it => !!it);
    }
    createContext() {
        const context = (...paths) => {
            return {
                paths: () => {
                    return context(...paths).fields().map(it => it.plainPath);
                },
                fields: () => {
                    return this.matchFields(paths);
                },
                toggle: () => {
                    this.matchFields(paths).forEach(field => {
                        field.visible = !field.visible;
                    });
                    return context(...paths);
                },
                value: (value) => {
                    const res = this.matchFields(paths).map(it => it.setGetValue(value));
                    if (value === undefined) {
                        if (paths.length === 1 && !isFuzzyPath(paths[0])) {
                            return res[0];
                        }
                        else {
                            return res;
                        }
                    }
                },
                hide: () => {
                    this.matchFields(paths).forEach(field => {
                        field.visible = false;
                    });
                    return context(...paths);
                },
                show: () => {
                    this.matchFields(paths).forEach(field => {
                        field.visible = true;
                    });
                    return context(...paths);
                },
                setEnum: (options) => {
                    this.matchFields(paths).forEach(field => {
                        field.enum = options;
                    });
                    return context(...paths);
                },
                setFieldProps: (props) => {
                    this.matchFields(paths).forEach(field => {
                        field.props = Object.assign({}, field.props, props);
                    });
                    return context(...paths);
                },
                onFieldCreate: (callback) => {
                    context.subscribe(SchemaFormEvents.fieldCreate, paths, callback);
                    return context(...paths);
                },
                onFieldBlur: (callback) => {
                    context.subscribe(SchemaFormEvents.fieldBlur, paths, callback);
                    return context(...paths);
                },
                onFieldFocus: (callback) => {
                    context.subscribe(SchemaFormEvents.fieldFocus, paths, callback);
                    return context(...paths);
                },
                onFieldCreateOrChange: (callback) => {
                    return context(...paths).onFieldCreate(callback)
                        .onFieldChange(callback);
                },
                onFieldChange: (callback) => {
                    context.subscribe(SchemaFormEvents.fieldChange, paths, callback);
                    return context(...paths);
                },
                subscribe: (event, callback) => {
                    context.subscribe(event, paths, callback);
                    return context(...paths);
                },
                takePath: (number) => {
                    return context(...takePath(paths, number));
                },
                appendPath: (suffix) => {
                    return context(...appendPath(paths, suffix));
                },
                disable: () => {
                    this.matchFields(paths).forEach(field => {
                        field.disabled = true;
                    });
                    return context(...paths);
                },
                enable: () => {
                    this.matchFields(paths).forEach(field => {
                        field.disabled = false;
                    });
                    return context(...paths);
                },
                replaceLastPath: (last) => {
                    return context(...replaceLastPath(paths, last));
                }
            };
        };
        context.subscribe = (e, pathsOrHandler, handler) => {
            if (!context.subscribes[e]) {
                context.subscribes[e] = new Subject();
            }
            context.subscribes[e].subscribe({
                next: (v) => {
                    this.$nextTick(() => {
                        if (typeof pathsOrHandler === 'function') {
                            pathsOrHandler(v);
                        }
                        else if (isPathMatchPatterns(v.path, typeof pathsOrHandler === 'string' ? [pathsOrHandler] : pathsOrHandler)) {
                            if (e === SchemaFormEvents.fieldChange || e === SchemaFormEvents.fieldCreate) {
                                handler(v.value, v.path);
                            }
                            else if ([SchemaFormEvents.fieldFocus, SchemaFormEvents.fieldBlur].includes(e)) {
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
        context.submit = (forceValidate, callback) => {
            this.onOk(forceValidate, callback);
        };
        context.validate = (handler) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const errors = yield runValidation(this.value, this.store.fields, true);
            if (handler) {
                handler(errors, context);
            }
            else {
                return errors;
            }
        });
        context.onValidate = (handler) => {
            context.subscribe(SchemaFormEvents.validate, handler);
        };
        context.subscribes = {};
        context.getValue = () => {
            return this.value;
        };
        context.trigger = (event, value) => {
            this.$nextTick(() => {
                const subject = this.store.context.subscribes[event];
                if (subject) {
                    subject.next(value);
                }
            });
        };
        return context;
    }
    created() {
        this.store.context = this.createContext();
        this.store.editable = this.mode !== undefined ? this.mode === 'edit' : this.editable;
        if (this.mode !== undefined) {
            console.warn('mode属性已经废弃，请使用editable属性代替');
        }
        this.$watch(() => this.editable, (editable) => {
            this.store.editable = editable;
        });
        this.$on('SchemaForm.addSchemaField', (field) => {
            if (field) {
                this.store.fields[field.plainPath] = field;
            }
        });
        this.$on('SchemaForm.removeSchemaField', (field) => {
            if (field) {
                delete this.store.fields[field.plainPath];
            }
        });
    }
    render() {
        const { title, sticky, prefixCls, store, value, schema } = this;
        const rootFieldDef = Object.assign({}, schema, {
            type: 'object',
            title,
            props: this.schema.props
        });
        let content = [
            this.$slots.header,
            renderField(null, store, rootFieldDef, value, 0, false, this.$createElement)
        ];
        let footer = [
            this.renderButtons(),
            this.$slots.footer
        ];
        if (this.sticky) {
            content = <LibComponents.content>
        {content}
      </LibComponents.content>;
            footer = <LibComponents.footer>
        {footer}
      </LibComponents.footer>;
        }
        const classes = className(prefixCls, {
            [`${prefixCls}-sticky`]: sticky
        }, `${prefixCls}-${this.platform}`);
        return <div class={classes}>
      {content}
      {footer}
    </div>;
    }
    renderButtons() {
        const { props } = this.store;
        const { actions } = this;
        if (props && this.store.editable) {
            if (this.$slots.btns) {
                return this.$slots.btns;
            }
            const buttons = [];
            if (actions) {
                actions.forEach(action => {
                    if (typeof action === 'string') {
                        switch (action) {
                            case 'submit':
                                buttons.push(this.createSubmitButton());
                                break;
                            case 'cancel':
                                buttons.push(this.createCancelButton());
                                break;
                            case 'reset':
                                buttons.push(this.createResetButton());
                                break;
                        }
                    }
                    else if (typeof action === 'object') {
                        switch (action.name) {
                            case 'submit':
                                buttons.push(this.createSubmitButton(action.text, action.props, action.action));
                                break;
                            case 'cancel':
                                buttons.push(this.createCancelButton(action.text, action.props, action.action));
                                break;
                            case 'reset':
                                buttons.push(this.createResetButton(action.text, action.props, action.action));
                                break;
                            default:
                                const props = action.props || {};
                                props.disabled = this.disabled || this.loading;
                                buttons.push(this.createButton(action.text, action.action, props, null));
                                break;
                        }
                    }
                });
            }
            else {
                buttons.push(this.createCancelButton());
                buttons.push(this.createSubmitButton());
                buttons.push(this.createResetButton());
            }
            return <div class="action-btns">
        {buttons}
      </div>;
        }
    }
    onOk(forceValidate, callback) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (hasListener(this, 'ok')) {
                if (forceValidate) {
                    const errors = yield this.validate();
                    if (errors.length) {
                        console.warn('有错误', errors);
                        this.store.context.trigger(SchemaFormEvents.validate, errors);
                    }
                    else {
                        if (callback) {
                            callback(this.value);
                        }
                        else {
                            this.$emit('ok', this.value);
                        }
                    }
                }
                else {
                    if (callback) {
                        callback(this.value);
                    }
                    else {
                        this.$emit('ok', this.value);
                    }
                }
            }
        });
    }
    validate() {
        return runValidation(this.value, this.store.fields, true);
    }
    createSubmitButton(text = null, btnProps = null, action = null) {
        const hasOkHandler = hasListener(this, 'ok');
        if (!hasOkHandler) {
            return null;
        }
        const { props } = this;
        const buttonProps = btnProps || (props && props.okProps) || {};
        if (!buttonProps.type) {
            buttonProps.type = 'primary';
        }
        buttonProps.disabled = this.disabled;
        return this.createButton(text || props && props.okText || '提交', action || (() => {
            this.onOk(true);
        }), buttonProps, 'confirm-btn');
    }
    createButton(text, action, attrs, classes) {
        const { platform } = this;
        const ButtonComponent = platform === 'mobile' ? 'm-button' : LibComponents.button;
        const Button = <ButtonComponent class={classes} props={attrs} onClick={() => {
            action(this.store.context);
        }}>
      {text}
    </ButtonComponent>;
        if (platform === 'mobile') {
            return [<m-white-space />, Button];
        }
        return Button;
    }
    createCancelButton(text = null, btnProps = null, action = null) {
        const hasCancelHandler = hasListener(this, 'cancel');
        if (!hasCancelHandler) {
            return null;
        }
        const { props } = this;
        const buttonProps = btnProps || (props && props.cancelProps) || {};
        buttonProps.disabled = this.disabled || this.loading;
        return this.createButton(text || props && props.cancelText || '取消', action || this.onCancel, buttonProps, 'cancel-btn');
    }
    createResetButton(text = null, btnProps = null, action = null) {
        const hasResetHandler = hasListener(this, 'reset');
        if (!hasResetHandler) {
            return null;
        }
        const { props } = this;
        const buttonProps = btnProps || (props && props.cancelProps) || {};
        buttonProps.disabled = this.disabled || this.loading;
        return this.createButton(text || props && props.cancelText || '重置', action || this.onReset, buttonProps, 'reset-btn');
    }
    onReset() {
        this.$emit('reset');
    }
    onCancel() {
        this.$emit('cancel');
    }
};
SchemaForm.registerAntd = registerAntd;
SchemaForm.registerAntdMobile = registerAntdMobile;
SchemaForm.registerElement = registerElement;
SchemaForm.registerComponent = register;
SchemaForm.registerLayout = registerLayout;
SchemaForm.registerDisplayComponent = registerDisplay;
tslib_1.__decorate([
    Prop({ type: String, default: 'schema-form' })
], SchemaForm.prototype, "prefixCls", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], SchemaForm.prototype, "disabled", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], SchemaForm.prototype, "readonly", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], SchemaForm.prototype, "loading", void 0);
tslib_1.__decorate([
    Prop({ type: Array })
], SchemaForm.prototype, "actions", void 0);
tslib_1.__decorate([
    Prop({ type: String, default: 'desktop' })
], SchemaForm.prototype, "platform", void 0);
tslib_1.__decorate([
    Prop({ type: String })
], SchemaForm.prototype, "mode", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: true })
], SchemaForm.prototype, "editable", void 0);
tslib_1.__decorate([
    Prop(Function)
], SchemaForm.prototype, "effects", void 0);
tslib_1.__decorate([
    Prop({ type: Object, required: true })
], SchemaForm.prototype, "schema", void 0);
tslib_1.__decorate([
    Prop({ type: Object, default: () => ({}) })
], SchemaForm.prototype, "props", void 0);
tslib_1.__decorate([
    Prop([Object, Array])
], SchemaForm.prototype, "value", void 0);
tslib_1.__decorate([
    Prop([String, Object])
], SchemaForm.prototype, "title", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], SchemaForm.prototype, "inline", void 0);
tslib_1.__decorate([
    Prop({ type: Boolean, default: false })
], SchemaForm.prototype, "sticky", void 0);
tslib_1.__decorate([
    Provide()
], SchemaForm.prototype, "store", void 0);
tslib_1.__decorate([
    Watch('$slots')
], SchemaForm.prototype, "slotsChanged", null);
tslib_1.__decorate([
    Watch('readonly', { immediate: true })
], SchemaForm.prototype, "readonlyChanged", null);
tslib_1.__decorate([
    Watch('disabled', { immediate: true })
], SchemaForm.prototype, "disabledChanged", null);
tslib_1.__decorate([
    Watch('platform')
], SchemaForm.prototype, "platformChanged", null);
tslib_1.__decorate([
    Watch('props', { immediate: true, deep: true })
], SchemaForm.prototype, "propsChanged", null);
tslib_1.__decorate([
    Watch('mode')
], SchemaForm.prototype, "modeChanged", null);
tslib_1.__decorate([
    Watch('loading', { immediate: true })
], SchemaForm.prototype, "loadingChanged", null);
SchemaForm = tslib_1.__decorate([
    Component({
        name: ASchemaForm
    })
], SchemaForm);
export default SchemaForm;
//# sourceMappingURL=form.jsx.map