"use strict";
exports.__esModule = true;
var image_picker_1 = require("@/schema-form/mobile/image-picker");
var register_1 = require("@/schema-form/utils/register");
var utils_1 = require("@/schema-form/utils/utils");
var button_vue_1 = require("../mobile/button.vue");
var stepper_item_vue_1 = require("../mobile/stepper-item.vue");
var registerMobile = function (component, types, forArray, getProps) {
    if (forArray === void 0) { forArray = null; }
    if (getProps === void 0) { getProps = null; }
    register_1.register(component, utils_1.MOBILE, types, forArray, getProps);
};
function registerAntdMobile() {
    console.debug('注册Ant Design Mobile表单组件');
    var components = [{
            component: 'm-input',
            types: [utils_1.TYPES.string, utils_1.TYPES.url],
            array: false
        }];
    registerMobile('m-input', [utils_1.TYPES.string, utils_1.TYPES.url], false);
    registerMobile('m-date-picker-item', [utils_1.TYPES.date, utils_1.TYPES.datetime, utils_1.TYPES.month, utils_1.TYPES.year, utils_1.TYPES.time], false, function (definition) { return ({ mode: definition.type.toLowerCase() }); });
    registerMobile('m-input', [utils_1.TYPES.double, utils_1.TYPES.number], false, function (definition) {
        return { type: definition.type.toLowerCase() === utils_1.TYPES.double ? 'digit' : 'number', textAlign: 'right' };
    });
    // registerMobile(MobileUpload, [TYPES.file], null, field => {
    //   return {multiple: field.array, title: field.title};
    // });
    registerMobile(stepper_item_vue_1["default"], [utils_1.TYPES.integer], false, function (field) {
        return { title: field.title };
    });
    registerMobile('m-textarea', [utils_1.TYPES.text], false);
    registerMobile(image_picker_1["default"], [utils_1.TYPES.picture, utils_1.TYPES.file], null, function (def) {
        return { multiple: def.array };
    });
    registerMobile(button_vue_1["default"], utils_1.TYPES.button);
    registerMobile('m-switch-item', [utils_1.TYPES.boolean], false);
    registerMobile('m-checkbox-popup-list', [utils_1.TYPES.select], true, function (field) {
        return { options: utils_1.getOptions(field) };
    });
    registerMobile('m-radio-popup-list', [utils_1.TYPES.select], false, function (field) {
        return { options: utils_1.getOptions(field) };
    });
    registerMobile('m-checkbox-list', [utils_1.TYPES.expandSelect], true, function (field) {
        return { options: utils_1.getOptions(field) };
    });
    registerMobile('m-radio-list', [utils_1.TYPES.expandSelect], false, function (field) {
        return { options: utils_1.getOptions(field) };
    });
    registerMobile('m-calendar-item', utils_1.TYPES.daterange, false);
}
exports.registerAntdMobile = registerAntdMobile;
