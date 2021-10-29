"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_1 = (0, tslib_1.__importDefault)(require("fs"));
const js_beautify_1 = (0, tslib_1.__importDefault)(require("js-beautify"));
const path_1 = (0, tslib_1.__importDefault)(require("path"));
const checkLog = () => {
    // const args = process.argv;
    // if (!args.includes('-log')) {
    //   throw new Error('请输入-log参数');
    // }
    // const log = args[args.indexOf('-log') + 1];
    // if (!log) {
    //   throw new Error('请输入版本日志信息');
    // }
};
checkLog();
const jsonPath = path_1.default.join(__dirname, '../package.json');
const json = fs_1.default.readFileSync(jsonPath).toString();
const obj = JSON.parse(json);
const version = obj.version;
const lastVersion = obj.lastVersion;
if (!lastVersion || version === lastVersion) {
    const r = version.match(/(\d+).(\d+).(\d+)-?(\w+)?/);
    if (!r[3]) {
        throw new Error('非法的版本号');
    }
    obj.version = r[1] + '.' + r[2] + '.' + (parseInt(r[3]) + 1);
}
obj.lastVersion = obj.version;
const content = (0, js_beautify_1.default)(JSON.stringify(obj), {
    indent_size: 2
});
fs_1.default.writeFileSync(jsonPath, content);
