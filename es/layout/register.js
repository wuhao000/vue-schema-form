"use strict";
exports.__esModule = true;
var card_1 = require("@/schema-form/layout/card");
var form_block_1 = require("@/schema-form/layout/form-block");
var grid_1 = require("@/schema-form/layout/grid");
var text_box_1 = require("@/schema-form/layout/text-box");
var register_1 = require("@/schema-form/utils/register");
var utils_1 = require("@/schema-form/utils/utils");
/**
 *
 * @param options
 */
exports.registerLayout = function (options) {
    register_1.addComponent({
        component: options.component, platforms: options.platforms,
        types: options.types, forArray: null, getProps: options.getProps,
        forDisplay: null, layout: true
    });
};
exports.registerLayout({
    component: grid_1["default"], platforms: [utils_1.DESKTOP, utils_1.MOBILE], types: 'grid'
});
exports.registerLayout({
    component: form_block_1["default"], platforms: utils_1.DESKTOP, types: 'block'
});
exports.registerLayout({
    component: card_1["default"],
    platforms: [utils_1.DESKTOP],
    types: ['card']
});
exports.registerLayout({
    component: text_box_1["default"],
    platforms: [utils_1.DESKTOP, utils_1.MOBILE],
    types: 'text-box'
});
