"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
exports.createFromTmpl = (tmplPath, data, newPath) => {
    let tmpl = fs_1.default.readFileSync(tmplPath).toString();
    const keys = Object.keys(data);
    keys.forEach(key => {
        while (tmpl.includes(`{{{${key}}}}`)) {
            tmpl = tmpl.replace(`{{{${key}}}}`, data[key]);
        }
    });
    fs_1.default.writeFileSync(newPath, tmpl);
    return tmpl;
};
