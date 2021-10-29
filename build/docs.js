"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_1 = (0, tslib_1.__importDefault)(require("fs"));
const tmpl_1 = require("./tmpl");
const utils_1 = require("./utils");
const path_1 = require("./path");
const docPath = 'src/doc';
const docDemoPath = docPath + '/demo';
const generatedDocPath = path_1.generatedPath + '/doc';
const generatedDocDemoPath = generatedDocPath + '/demo';
(0, tmpl_1.createFromTmpl)('templates/readme.vue.tmpl', {
    md: mdToHtml('README.md'),
}, path_1.generatedPath + '/doc/readme.vue');
(0, utils_1.mkdirs)(path_1.generatedPath);
(0, utils_1.mkdirs)(generatedDocPath);
(0, utils_1.mkdirs)(generatedDocDemoPath);
function mdToHtml(markdownFilePath) {
    const markdownContent = fs_1.default.readFileSync(markdownFilePath).toString();
    return (0, utils_1.md2Html)(markdownContent);
}
fs_1.default.readdirSync(docPath).filter(it => it.endsWith('.md')).forEach((path) => {
    const markdownFilePath = docPath + '/' + path;
    const html = mdToHtml(markdownFilePath);
    const noExtensionName = path.substr(0, path.lastIndexOf('.'));
    let demos = [];
    if (fs_1.default.existsSync(docDemoPath + '/' + noExtensionName)) {
        demos = fs_1.default.readdirSync(docDemoPath + '/' + noExtensionName)
            .filter(it => it.endsWith('.vue') || it.endsWith('.ts') || it.endsWith('.tsx'));
    }
    demos.forEach(name => {
        const content = fs_1.default.readFileSync(docDemoPath + '/' + noExtensionName + '/' + name);
        if (!fs_1.default.existsSync(`${path_1.generatedPath}/doc/demo/${noExtensionName}`)) {
            fs_1.default.mkdirSync(`${path_1.generatedPath}/doc/demo/${noExtensionName}`);
        }
        fs_1.default.writeFileSync(`${path_1.generatedPath}/doc/demo/${noExtensionName}/${name}.txt`, content);
    });
    const demoPaths = demos.map(it => `./demo/${noExtensionName}/${it}.txt`);
    const demoImports = demos.map((path, index) => {
        const paths = [
            `import demo${index} from '${`../../doc/demo/` + noExtensionName + '/' + path}';`
        ];
        return paths.join('\n  ');
    }).join('\n  ');
    const codeImports = demos.map(it => `./demo/` + noExtensionName + '/' + it + '.txt')
        .map((path, index) => `import code${index} from '${path}';`)
        .join('\n  ');
    const demoImportNames = demoPaths.map((it, index) => `demo${index}`).join(', ');
    const codeFieldNames = demoPaths.map((it, index) => `code${index}`)
        .join(', ');
    const demoTmpl = demoPaths.map((it, index) => {
        return `<code-wrapper :code="code${index}" :md="md${index}">
        <demo${index}/>
      </code-wrapper>`;
    }).join('\n');
    (0, tmpl_1.createFromTmpl)('templates/effects.vue.tmpl', {
        md: html,
        demoImports,
        codeImports,
        demoImportNames: demoImportNames.length ? ', ' + demoImportNames : '',
        codeFieldNames: codeFieldNames.length ? codeFieldNames : '',
        demoTmpl
    }, generatedDocPath + '/' + noExtensionName + '.vue');
});
