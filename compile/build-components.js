/**
 * Compile components
 */
const fs = require('fs-extra');
const path = require('path');
const babel = require('@babel/core');
const vueCompiler = require('vue-template-compiler');

const esDir = path.join(__dirname, '../es');
const libDir = path.join(__dirname, '../lib');
const srcDir = path.join(__dirname, '../src');
const babelConfig = {
  configFile: path.join(__dirname, './babel.config.js')
};

const scriptRegExp = /\.(js|jsx|ts|vue|tsx)$/;
const isDir = dir => fs.lstatSync(dir).isDirectory();
const isCode = path => !/(demo|test|\.md)$/.test(path);
const isScript = path => scriptRegExp.test(path);

function createAttrs(attrs) {
  if (attrs) {
    return Object.keys(attrs).map(attr => `${attr}="${attrs[attr]}"`)
        .join(' ');
  }
  return '';
}

function toVueFileString(vueContent, script) {
  let str = `<template ${createAttrs(vueContent.template.attrs)}>${vueContent.template.content || ''}</template>\n`;
  if (vueContent.script) {
    if (vueContent.script.attrs.lang) {
      vueContent.script.attrs.lang = 'js';
    }
    if (vueContent.script.attrs.type) {
      vueContent.script.attrs.type = 'text/javascript';
    }
    str += `<script ${createAttrs(vueContent.script.attrs)}>
${script || vueContent.script.content || ''}
</script>\n`;
  }
  if (vueContent.styles) {
    vueContent.styles.forEach(style => {
      str += `<style ${createAttrs(style.attrs0)}>${style.content || ''}</style>`;
    });
  }
  return str;
}

function compile(dir) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);

    // remove unnecessary files
    if (!isCode(file)) {
      return fs.removeSync(filePath);
    }

    // scan dir
    if (isDir(filePath)) {
      return compile(filePath);
    }

    // compile js or ts
    if (isScript(file)) {
      if (file.endsWith('.vue')) {
        const r = vueCompiler.compile(fs.readFileSync(filePath).toString());
        const vueContent = vueCompiler.parseComponent(fs.readFileSync(filePath).toString());
        if (vueContent.script) {
          if (vueContent.script.src) {
            vueContent.script.src.replace('.tsx', '.jsx')
                .replace('.ts', '.js');
            vueContent.script.attrs.src = vueContent.script.src;
            const str = toVueFileString(vueContent);
            fs.outputFileSync(filePath, str);
          } else {
            const tsPath = filePath.replace('.vue', '') + '.tsx';
            fs.outputFileSync(
                tsPath, vueContent.script.content
            );
            const { code } = babel.transformFileSync(tsPath, babelConfig);
            fs.removeSync(tsPath);
            const str = toVueFileString(vueContent, code);
            fs.outputFileSync(filePath, str);
          }
        }
        // const sc = babel.transformSync(vueContent.script.content, {
        //   ...babelConfig,
        //   filename: './babel.config.js'
        // });
        // console.log(sc);
      } else {
        const { code } = babel.transformFileSync(filePath, babelConfig);
        fs.removeSync(filePath);
        fs.outputFileSync(filePath.replace(scriptRegExp, '.js'), code);
      }
    }
  });
}

// clear dir
fs.emptyDirSync(esDir);
fs.mkdirSync(path.join(esDir, 'schema-form'))
fs.copySync(path.join(srcDir, 'schema-form'), path.join(esDir, 'schema-form'));
fs.copyFileSync(path.join(srcDir, 'index.ts'), path.join(esDir, 'index.ts'))
compile(esDir);
