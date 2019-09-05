"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_1 = tslib_1.__importDefault(require("fs"));
const tmpl_1 = require("./tmpl");
const utils_1 = require("./utils");
const generatedPath = 'generated';
const docPath = 'src/doc';
const docDemoPath = docPath + '/demo';
const generatedDocPath = generatedPath + '/doc';
const generatedDocDemoPath = generatedDocPath + '/demo';
utils_1.mkdirs(generatedPath);
utils_1.mkdirs(generatedDocPath);
utils_1.mkdirs(generatedDocDemoPath);
fs_1.default.readdirSync(docPath).filter(it => it.endsWith('.md')).forEach((path) => {
    const noExtensionName = path.substr(0, path.lastIndexOf('.'));
    let demos = [];
    if (fs_1.default.existsSync(docDemoPath + '/' + noExtensionName)) {
        demos = fs_1.default.readdirSync(docDemoPath + '/' + noExtensionName)
            .filter(it => it.endsWith('.vue') || it.endsWith('.ts') || it.endsWith('.tsx'));
    }
    demos.forEach(name => {
        const content = fs_1.default.readFileSync(docDemoPath + '/' + noExtensionName + '/' + name);
        if (!fs_1.default.existsSync(`${generatedPath}/doc/demo/${noExtensionName}`)) {
            fs_1.default.mkdirSync(`${generatedPath}/doc/demo/${noExtensionName}`);
        }
        fs_1.default.writeFileSync(`${generatedPath}/doc/demo/${noExtensionName}/${name}.txt`, content);
    });
    const demoPaths = demos.map(it => `./demo/${noExtensionName}/${it}.txt`);
    const mdNames = [];
    const demoImports = demos.map((path, index) => {
        const paths = [
            `import demo${index} from '${`@/doc/demo/` + noExtensionName + '/' + path}';`
        ];
        const demoNoExtensionPath = path.substr(0, path.lastIndexOf('.'));
        mdNames.push('md' + index);
        paths.push(`import md${index} from '${`@/doc/demo/${noExtensionName}/${demoNoExtensionPath}.md`}';`);
        return paths.join('\n  ');
    }).join('\n  ');
    const codeImports = demos.map(it => `./demo/` + noExtensionName + '/' + it + '.txt')
        .map((path, index) => `import code${index} from '${path}';`)
        .join('\n  ');
    const demoImportNames = demoPaths.map((it, index) => `demo${index}`).join(', ');
    const codeFieldNames = demoPaths.map((it, index) => `code${index}`)
        .concat(mdNames)
        .join(', ');
    const demoTmpl = demoPaths.map((it, index) => {
        return `<code-wrapper :code="code${index}" :md="md${index}">
        <demo${index}/>
      </code-wrapper>`;
    }).join('\n');
    tmpl_1.createFromTmpl('src/templates/effects.vue.tmpl', {
        mdPath: '@/doc' + '/' + path,
        demoImports,
        codeImports,
        demoImportNames: demoImportNames ? ', ' + demoImportNames : '',
        codeFieldNames: codeFieldNames ? ', ' + codeFieldNames : '',
        demoTmpl
    }, generatedDocPath + '/' + noExtensionName + '.vue');
});
