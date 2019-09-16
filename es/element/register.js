"use strict";
exports.__esModule = true;
var button_vue_1 = require("@/schema-form/element/button.vue");
var url_vue_1 = require("@/schema-form/element/url.vue");
var register_1 = require("@/schema-form/utils/register");
var utils_1 = require("@/schema-form/utils/utils");
var vue_1 = require("vue");
var checkbox_group_1 = require("../element/checkbox-group");
var el_ext_icon_1 = require("../element/el-ext-icon");
var radio_group_1 = require("../element/radio-group");
var select_1 = require("../element/select");
var upload_vue_1 = require("../element/upload.vue");
function registerElement() {
    console.debug('注册ElementUI表单组件');
    vue_1["default"].component('ElExtIcon', el_ext_icon_1["default"]);
    Object.keys(utils_1.ComponentMap).forEach(function (key) {
        utils_1.LibComponents[key] = utils_1.ComponentMap[key].element;
    });
    utils_1.LibComponents.confirm = ELEMENT.MessageBox.confirm;
    vue_1["default"].component('el-ext-select', select_1["default"]);
    vue_1["default"].component('el-ext-checkbox', checkbox_group_1["default"]);
    vue_1["default"].component('el-ext-radio', radio_group_1["default"]);
    register_1.registerDesktop('el-transfer', utils_1.TYPES.transfer, false, function (field) {
        var data = (field["enum"] || []).map(function (item) { return ({
            key: item.value,
            label: item.label,
            disabled: item.disabled
        }); });
        return { data: data };
    });
    register_1.registerDesktop(button_vue_1["default"], utils_1.TYPES.button, null, function (field) {
        return { title: field.title };
    });
    register_1.registerDesktop(upload_vue_1["default"], utils_1.TYPES.upload, null, function (field) {
        return { multiple: field.array };
    });
    register_1.registerDesktop('el-input', utils_1.TYPES.string, false);
    register_1.registerDesktop(url_vue_1["default"], utils_1.TYPES.url, false);
    register_1.registerDesktop('el-input', [utils_1.TYPES.text], false, function () {
        return { type: 'textarea' };
    });
    register_1.registerDesktop('el-time-picker', utils_1.TYPES.time, false);
    register_1.registerDesktop('el-rate', utils_1.TYPES.rate, false);
    register_1.registerDesktop('el-date-picker', [utils_1.TYPES.date, utils_1.TYPES.daterange, utils_1.TYPES.year, utils_1.TYPES.month, utils_1.TYPES.datetime], false, function (definition) { return ({ type: definition.type.toLowerCase() }); });
    register_1.registerDesktop('el-input-number', [utils_1.TYPES.double, utils_1.TYPES.integer, utils_1.TYPES.number], false);
    register_1.registerDesktop('el-switch', [utils_1.TYPES.boolean], false);
    register_1.registerDesktop('el-ext-select', [utils_1.TYPES.select], null, function (definition) {
        return { multiple: definition.array, options: utils_1.getOptions(definition) };
    });
    register_1.registerDesktop('el-checkbox', utils_1.TYPES.checkbox, false);
    register_1.registerDesktop('el-slider', utils_1.TYPES.range, false, function (field) {
        var props = { range: true };
        if (field.props && field.props.marks) {
            if (Array.isArray(field.props.marks)) {
                props.marks = field.props.marks.map(function (it) {
                    if (typeof it === 'number') {
                        return it.toString();
                    }
                    else {
                        return it;
                    }
                });
            }
            else if (typeof field.props.marks === 'object') {
                var marks_1 = {};
                Object.keys(field.props.marks).forEach(function (key) {
                    var value = field.props.marks[key];
                    if (typeof value === 'number') {
                        marks_1[key] = value.toString();
                    }
                    else {
                        marks_1[key] = value;
                    }
                });
                props.marks = marks_1;
            }
        }
        return props;
    });
    register_1.registerDesktop('el-ext-radio', [utils_1.TYPES.expandSelect], false, function (field) {
        return { options: utils_1.getOptions(field) };
    });
    register_1.registerDesktop('el-ext-checkbox', [utils_1.TYPES.expandSelect], true, function (field) {
        return { options: utils_1.getOptions(field), multiple: true };
    });
}
exports.registerElement = registerElement;
