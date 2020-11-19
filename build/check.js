"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/**
 * Compile components
 */
const fs_1 = tslib_1.__importDefault(require("fs"));
const path_1 = tslib_1.__importDefault(require("path"));
const srcDir = path_1.default.join(__dirname, '../src');
const paths = [
    path_1.default.join(__dirname, '../src/schema-form'),
    path_1.default.join(__dirname, '../src/uform'),
    path_1.default.join(__dirname, '../src/utils'),
    path_1.default.join(__dirname, '../src/mixins')
];
const scriptRegExp = /\.(js|jsx|ts|vue|tsx)$/;
const isDir = dir => fs_1.default.lstatSync(dir).isDirectory();
const isScript = path => scriptRegExp.test(path);
const reg = /.*import .* from.*'(@\/.*)';?/;
function checkFile(filePath) {
    const content = fs_1.default.readFileSync(filePath).toString();
    const lines = content.split('\n');
    let hasRelativeClause = false;
    lines.forEach((line, index) => {
        if (reg.test(line)) {
            const r = line.match(reg);
            const realPath = 'src' + r[1].substr(1);
            let rel = path_1.default.relative(filePath, path_1.default.resolve(realPath)).replace(/\\/g, '/')
                .replace('../', '');
            if (!rel.startsWith('../')) {
                rel = `./${rel}`;
            }
            lines[index] = line.replace(r[1], rel);
            hasRelativeClause = true;
        }
    });
    if (hasRelativeClause) {
        console.log('修复文件' + filePath);
        const content = lines.join('\n');
        fs_1.default.writeFileSync(filePath, content);
    }
}
function check(dir) {
    const files = fs_1.default.readdirSync(dir);
    files.forEach(file => {
        const filePath = path_1.default.join(dir, file);
        // scan dir
        if (isDir(filePath)) {
            return check(filePath);
        }
        // compile js or ts
        if (isScript(file)) {
            checkFile(filePath);
        }
    });
}
paths.forEach(dir => {
    check(dir);
});
