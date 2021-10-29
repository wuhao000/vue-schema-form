import cheerio from 'cheerio';
import fs from 'fs';
import {unescape} from 'html-escaper';
import marked from 'marked';
import md5 from 'md5';
import beautify from './beautify';

marked.setOptions({
  xhtml: true
});
export const md2Html = (content: string) => {
  return marked(content);
};

export function mkdirs(string) {
  if (!fs.existsSync(string)) {
    fs.mkdirSync(string);
  }
}

export const createDoc = (path) => {
  const content = fs.readFileSync(path).toString();

  // 文件名（含后缀）
  const name = getName(path);

  // 文件名（不含后缀）
  const nameWithoutExt = name.substr(0, name.lastIndexOf('.'));
  const id = md5(nameWithoutExt);
  // 所在文件夹
  const parentPath = getParentPath(path);
  const parentId = md5(getName(parentPath));
  const grandParent = getParentPath(parentPath);

  // 生成的文件夹
  const generatedDirPath = grandParent + '/generated/' + parentId + '-' + id;

  mkdirs(grandParent + '/generated');
  mkdirs(generatedDirPath);

  const html = marked(content);
  const $ = cheerio.load(html);
  const a = $('code.language-vue');
  const compNames = [];
  for (let i = 0; i < a.length; i++) {
    const v = a[i];
    const demoCode = $(v).html();
    const n = `comp${i}`;
    compNames.push(n);
    const compPath = `${generatedDirPath}/${n}.vue`;
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

  const template = beautify(`<template>
  <div class="markdown-body">
    ${$('body').html()}</div>
</template>`, {
    format: 'html',
    unformatted: ['a', 'span', 'bdo', 'em', 'strong', 'dfn', 'samp', 'kbd', 'var', 'cite', 'abbr', 'acronym', 'q', 'sub', 'sup', 'tt', 'i', 'b', 'big', 'small', 'u', 's', 'strike', 'font', 'ins', 'del', 'address', 'dt', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    indent_size: 2
  });
  const generatedContent = `${template}
<script lang="ts" setup>
${compNames.map(it => `  import  ${it} from './${it}.vue';`).join('\n')}
</script>`.replace(/<code-container>/g, '<template #code><code-container>')
    .replace(/<\/code-container>/g, '</code-container></template>');

  fs.writeFileSync(`${generatedDirPath}/index.vue`, generatedContent);
};


export const getParentPath = (path: string) => {
  const paths = path.split(/[\\/]/);
  return paths.slice(0, paths.length - 1).join('/');
};


export const getName = (path) => {
  const paths = path.split(/[\\/]/);
  return paths[paths.length - 1];
};
