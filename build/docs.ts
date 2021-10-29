import fs from 'fs';
import {createFromTmpl} from './tmpl';
import {md2Html, mkdirs} from './utils';
import {generatedPath} from './path';

const docPath = 'src/doc';
const docDemoPath = docPath + '/demo';
const generatedDocPath = generatedPath + '/doc';
const generatedDocDemoPath = generatedDocPath + '/demo';

createFromTmpl('templates/readme.vue.tmpl', {
  md: mdToHtml('README.md'),
}, generatedPath + '/doc/readme.vue');

mkdirs(generatedPath);
mkdirs(generatedDocPath);
mkdirs(generatedDocDemoPath);


function mdToHtml(markdownFilePath: string) {
  const markdownContent = fs.readFileSync(markdownFilePath).toString();
  return md2Html(markdownContent);
}

fs.readdirSync(docPath).filter(it => it.endsWith('.md')).forEach((path) => {
  const markdownFilePath = docPath + '/' + path;
  const html = mdToHtml(markdownFilePath);
  const noExtensionName = path.substr(0, path.lastIndexOf('.'));
  let demos = [];
  if (fs.existsSync(docDemoPath + '/' + noExtensionName)) {
    demos = fs.readdirSync(docDemoPath + '/' + noExtensionName)
      .filter(it => it.endsWith('.vue') || it.endsWith('.ts') || it.endsWith('.tsx'));
  }
  demos.forEach(name => {
    const content = fs.readFileSync(docDemoPath + '/' + noExtensionName + '/' + name);
    if (!fs.existsSync(`${generatedPath}/doc/demo/${noExtensionName}`)) {
      fs.mkdirSync(`${generatedPath}/doc/demo/${noExtensionName}`);
    }
    fs.writeFileSync(`${generatedPath}/doc/demo/${noExtensionName}/${name}.txt`, content);
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
  createFromTmpl('templates/effects.vue.tmpl', {
    md: html,
    demoImports,
    codeImports,
    demoImportNames: demoImportNames.length ? ', ' + demoImportNames : '',
    codeFieldNames: codeFieldNames.length ? codeFieldNames : '',
    demoTmpl
  }, generatedDocPath + '/' + noExtensionName + '.vue');
});
