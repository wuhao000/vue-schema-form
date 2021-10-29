'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const cssbeautify_1 = (0, tslib_1.__importDefault)(require("cssbeautify"));
const html_1 = require("html");
const js_beautify_1 = require("js-beautify");
const clean = (data) => {
    if (~['"', '\''].indexOf(data[0]) &&
        ~['"', '\''].indexOf(data[data.length - 1]) &&
        data[0] === data[data.length - 1]) {
        return data.substring(1, data.length - 1);
    }
    return data;
};
const beautify = (data, o) => {
    let copyData = data;
    if (!copyData || !copyData.length) {
        return '';
    }
    const options = { ...o };
    options.indent_size = options.indent_size || 2;
    copyData = clean(copyData.trim());
    switch (o.format) {
        case 'css':
            return (0, cssbeautify_1.default)(copyData, {
                indent: '    ',
                autosemicolon: true
            });
        case 'json':
            return (0, js_beautify_1.js_beautify)(copyData, options);
        case 'js':
            return (0, js_beautify_1.js_beautify)(copyData, options);
        case 'html':
            return (0, html_1.prettyPrint)(copyData, options);
        case 'xml':
            return (0, html_1.prettyPrint)(copyData, options);
    }
};
exports.default = beautify;
