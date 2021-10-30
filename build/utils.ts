import cheerio from 'cheerio';
import fs from 'fs';
import {unescape, escape} from 'html-escaper';
import marked from 'marked';
import pinyin from 'pinyin';
import beautify from './beautify';

marked.setOptions({
  xhtml: true
});
export const md2Html = (content: string) => marked(content);

export function mkdirs(string) {
  if (!fs.existsSync(string)) {
    fs.mkdirSync(string);
  }
}

export const createDoc = (path) => {
  if (!isDocPath(path)) {
    return;
  }

  const content = fs.readFileSync(path).toString();

  const dirPath = mkDocDir(path);

  const html = marked(content);
  const $ = cheerio.load(html);

  function renderLanguage(lang) {
    const codes = $(`code.language-${lang}`);
    for (const v of codes) {
      const code = unescape($.html(v.childNodes)).trim();
      $(`<code-editor>
  ${escape(code)}
</code-editor>`).insertBefore($(v));
      $(v).remove();
    }
  }

  renderLanguage('typescript');
  renderLanguage('html');
  renderLanguage('bash');


  const demos = $('code.language-vue');
  const compNames = [];
  for (let i = 0; i < demos.length; i++) {
    const v = demos[i];
    const demoCode = $(v).html();
    const n = `comp${i}`;
    compNames.push(n);
    const compPath = `${dirPath}/${n}.vue`;
    const compHtml = unescape($.html(v.childNodes))
        .replace(/'\.\.\//g, '\'../../')
        .replace(/"\.\.\//, '"../../')
        .replace(/'\.\//g, '\'../')
        .replace(/"\.\//g, '"../');
    fs.writeFileSync(compPath, compHtml);
    $(`<demo-wrapper>
<${n}></${n}>
<code-container>
  ${demoCode}
</code-container>
</demo-wrapper>`).insertBefore($(v));
    $(v).remove();
  }

  const originTemplate = `<template>
  <div class="markdown-body">
    ${$('body').html()}</div>
</template>`;
  const template = beautify(originTemplate, {
    format: 'html',
    unformatted: ['a', 'span', 'bdo', 'em', 'strong', 'dfn', 'samp', 'kbd', 'var', 'cite', 'abbr', 'acronym', 'q', 'sub', 'sup', 'tt', 'i', 'b', 'big', 'small', 'u', 's', 'strike', 'font', 'ins', 'del', 'address', 'dt', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    indent_size: 2
  });
  if (compNames.length === 0) {
    fs.writeFileSync(`${dirPath}/index.vue`, originTemplate);
  } else {
    const generatedContent = `${originTemplate}
<script lang="ts" setup>
${compNames.map(it => `  import  ${it} from './${it}.vue';`).join('\n')}
</script>`.replace(/<code-container>/g, '<template #code><code-container>')
        .replace(/<\/code-container>/g, '</code-container></template>');
    fs.writeFileSync(`${dirPath}/index.vue`, generatedContent);
  }
};


export const getParentPath = (path: string) => {
  const paths = path.split(/[\\/]/);
  return paths.slice(0, paths.length - 1).join('/');
};


export const getName = (path) => {
  const paths = path.split(/[\\/]/);
  return paths[paths.length - 1];
};

export const isDocPath = (path: string) => {
  const paths = path.split(/[\\/]/);
  const srcIndex = paths.findIndex(it => it === 'src');
  const docsIndex = paths.findIndex(it => it === 'docs');
  return docsIndex - srcIndex === 1;
};

export const getRelativeDocPaths = (path) => {
  const isDirectory = fs.statSync(path).isDirectory();
  const paths = path.split(/[\\/]/);
  const fileName = paths[paths.length - 1];
  const fileNameNoExt = isDirectory ? fileName : fileName.substr(0, fileName.lastIndexOf('.'));
  paths[paths.length - 1] = fileNameNoExt.replace(/^\d+\./, '');
  const srcIndex = paths.findIndex(it => it === 'src');
  const docsIndex = paths.findIndex(it => it === 'docs');
  const projectPath = paths.slice(0, srcIndex).join('/');
  const relativePaths = paths.slice(docsIndex + 1);
  const generatedPath = [];
  const groupPaths = [];
  relativePaths.forEach(it => {
    groupPaths.push(it);
    if (/^\w+$/.test(it)) {
      generatedPath.push(it);
    } else {
      generatedPath.push(pinyin(it.replace(/\s+/g, ''), {
        style: pinyin.STYLE_NORMAL
      }).join(''));
    }
  });
  return {
    generatedPath,
    projectPath,
    groupPaths
  };
};

export const mkDocDir = (path): string => {
  const {generatedPath, projectPath} = getRelativeDocPaths(path);
  for (let i = 1; i <= generatedPath.length; i++) {
    const finalPath = projectPath + '/src/generated/' + generatedPath.slice(0, i).join('/');
    if (!fs.existsSync(finalPath)) {
      fs.mkdirSync(finalPath);
    }
  }
  return projectPath + '/src/generated/' + generatedPath.join('/');
};
