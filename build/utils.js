"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
function mkdirs(string) {
    if (!fs_1.default.existsSync(string)) {
        fs_1.default.mkdirSync(string);
    }
}
exports.mkdirs = mkdirs;
