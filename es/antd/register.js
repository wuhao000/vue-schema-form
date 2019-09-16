"use strict";
exports.__esModule = true;
var register_1 = require("@/schema-form/utils/register");
var utils_1 = require("@/schema-form/utils/utils");
var button_vue_1 = require("@/schema-form/antd/button.vue");
var url_vue_1 = require("@/schema-form/antd/url.vue");
var upload_vue_1 = require("../antd/upload.vue");
function registerAntd() {
    console.debug('注册Ant Design Vue表单组件');
    Object.keys(utils_1.ComponentMap).forEach(function (key) {
        utils_1.LibComponents[key] = utils_1.ComponentMap[key].antd;
    });
    utils_1.LibComponents.confirm = window.aegis.AeModal.confirm;
    register_1.registerDesktop('d-range-picker', [utils_1.TYPES.daterange], false);
    register_1.registerDesktop('d-input', [utils_1.TYPES.string], false);
    register_1.registerDesktop(url_vue_1["default"], utils_1.TYPES.url, false);
    register_1.registerDesktop('d-textarea', [utils_1.TYPES.text], false);
    register_1.registerDesktop('d-date-picker', [utils_1.TYPES.date, utils_1.TYPES.year, utils_1.TYPES.month, utils_1.TYPES.datetime], false, function (definition) { return ({ mode: definition.type.toLowerCase() }); });
    register_1.registerDesktop('d-time-picker', [utils_1.TYPES.time], false, function (definition) { return ({ mode: definition.type.toLowerCase() }); });
    register_1.registerDesktop('d-input-number', [utils_1.TYPES.double, utils_1.TYPES.integer, utils_1.TYPES.number], false);
    register_1.registerDesktop('d-checkbox', utils_1.TYPES.checkbox, false);
    register_1.registerDesktop('d-switch', utils_1.TYPES.boolean);
    register_1.registerDesktop('d-select', utils_1.TYPES.select, null, function (field) {
        return { dropdownMatchSelectWidth: false, multiple: field.array, options: utils_1.getOptions(field) };
    });
    register_1.registerDesktop(button_vue_1["default"], utils_1.TYPES.button, null, function (field) {
        return { title: field.title };
    });
    register_1.registerDesktop(upload_vue_1["default"], utils_1.TYPES.upload, null, function (def) {
        return { multiple: def.array };
    });
    register_1.registerDesktop('d-cascader', utils_1.TYPES.cascader, false, function (def) {
        return { options: def["enum"] };
    });
    register_1.registerDesktop('d-checkbox-group', utils_1.TYPES.expandSelect, true, function (field) {
        return { options: utils_1.getOptions(field), multiple: true };
    });
    register_1.registerDesktop('d-radio-group', utils_1.TYPES.expandSelect, false, function (field) {
        return { options: utils_1.getOptions(field) };
    });
    register_1.registerDesktop('d-color-picker', 'color');
    register_1.registerDesktop('d-rate', utils_1.TYPES.rate);
    register_1.registerDesktop('d-transfer', utils_1.TYPES.transfer, false, function (def) {
        var data = (def.props && def.props.dataSource) || def["enum"] || [];
        var dataSource = data.map(function (item) {
            if (typeof item === 'string') {
                return { key: item, title: item };
            }
            else {
                return {
                    key: (item.key || item.value).toString(),
                    title: item.title || item.label,
                    description: item.description || item.label,
                    disabled: item.disabled || false
                };
            }
        });
        return { dataSource: dataSource };
    });
    register_1.register('d-slider', utils_1.DESKTOP, utils_1.TYPES.range, false, function () {
        return { range: true };
    });
}
exports.registerAntd = registerAntd;
