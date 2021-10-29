"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getName = exports.getParentPath = exports.createDoc = exports.mkdirs = exports.md2Html = void 0;
const tslib_1 = require("tslib");
const cheerio_1 = (0, tslib_1.__importDefault)(require("cheerio"));
const fs_1 = (0, tslib_1.__importDefault)(require("fs"));
const marked_1 = (0, tslib_1.__importDefault)(require("marked"));
const md5_1 = (0, tslib_1.__importDefault)(require("md5"));
marked_1.default.setOptions({
    xhtml: true
});
const md2Html = (content) => {
    return (0, marked_1.default)(content);
};
exports.md2Html = md2Html;
function mkdirs(string) {
    if (!fs_1.default.existsSync(string)) {
        fs_1.default.mkdirSync(string);
    }
}
exports.mkdirs = mkdirs;
const html_escaper_1 = require("html-escaper");
const createDoc = (path) => {
    const content = fs_1.default.readFileSync(path).toString();
    // 文件名（含后缀）
    const name = (0, exports.getName)(path);
    // 文件名（不含后缀）
    const nameWithoutExt = name.substr(0, name.lastIndexOf('.'));
    const id = (0, md5_1.default)(nameWithoutExt);
    // 所在文件夹
    const parentPath = (0, exports.getParentPath)(path);
    const parentId = (0, md5_1.default)((0, exports.getName)(parentPath));
    const grandParent = (0, exports.getParentPath)(parentPath);
    // 生成的文件夹
    const generatedDirPath = grandParent + '/generated/' + parentId + '-' + id;
    mkdirs(grandParent + '/generated');
    mkdirs(generatedDirPath);
    const html = (0, marked_1.default)(content);
    const $ = cheerio_1.default.load(html);
    const a = $('code.language-vue');
    const compNames = [];
    for (let i = 0; i < a.length; i++) {
        const v = a[i];
        const demoCode = $(v).html();
        const n = `comp${i}`;
        compNames.push(n);
        const compPath = `${generatedDirPath}/${n}.vue`;
        const compHtml = (0, html_escaper_1.unescape)($.html(v.childNodes))
            .replace(/'\.\.\//g, '\'../../')
            .replace(/"\.\.\//, '"../../')
            .replace(/'\.\//g, '\'../')
            .replace(/"\.\//g, '"../');
        fs_1.default.writeFileSync(compPath, compHtml);
        $(`<demo-wrapper>
<${n}></${n}>
<code-container>
${demoCode}
</code-container>
</demo-wrapper>`).insertBefore($(v));
        $(v).remove();
    }
    const generatedContent = `<template>
  <div class="markdown-body">
    ${$('body').html()}
  </div>
</template>
<script lang="ts" setup>
${compNames.map(it => `  import  ${it} from './${it}.vue';`).join('\n')}
</script>`.replace(/<code-container>/g, '<template #code><code-container>')
        .replace(/<\/code-container>/g, '</code-container></template>');
    fs_1.default.writeFileSync(`${generatedDirPath}/index.vue`, generatedContent);
};
exports.createDoc = createDoc;
const getParentPath = (path) => {
    const paths = path.split(/[\\/]/);
    return paths.slice(0, paths.length - 1).join('/');
};
exports.getParentPath = getParentPath;
const getName = (path) => {
    const paths = path.split(/[\\/]/);
    return paths[paths.length - 1];
};
exports.getName = getName;
