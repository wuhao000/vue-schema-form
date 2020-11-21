import fs from 'fs';
import {createFromTmpl} from './tmpl';
import {mkdirs} from './utils';


const generatedPath = 'generated';
const docPath = 'site/doc';
const docDemoPath = docPath + '/demo';
const generatedDocPath = generatedPath + '/doc';
const generatedDocDemoPath = generatedDocPath + '/demo';

mkdirs(generatedPath);
mkdirs(generatedDocPath);
mkdirs(generatedDocDemoPath);


fs.readdirSync(docPath).filter(it => it.endsWith('.md')).forEach((path) => {
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
  createFromTmpl('src/templates/effects.vue.tmpl', {
    mdPath: '@/doc' + '/' + path,
    demoImports,
    codeImports,
    demoImportNames: demoImportNames ? ', ' + demoImportNames : '',
    codeFieldNames: codeFieldNames ? ', ' + codeFieldNames : '',
    demoTmpl
  }, generatedDocPath + '/' + noExtensionName + '.vue');
});
