/**
 * Compile components
 */
import * as babel from '@babel/core';
import fs from 'fs-extra';
import less from 'less';
import path from 'path';

const esDir = path.join(__dirname, '../es');
const libDir = path.join(__dirname, '../lib');
const srcDir = path.join(__dirname, '../src/schema-form');
const babelConfig = {
  configFile: path.join(__dirname, './babel.config.js')
};

const scriptRegExp = /\.(js|jsx|ts|tsx)$/;
const isDir = dir => fs.lstatSync(dir).isDirectory();
const isCode = path => !/(demo|test|\.md)$/.test(path);
const isScript = path => scriptRegExp.test(path);
const isLess = path => /\.less$/.test(path);

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
      const {code} = babel.transformFileSync(filePath, babelConfig);
      fs.removeSync(filePath);
      fs.outputFileSync(filePath.replace(scriptRegExp, '.js'), code);
    }

    if (isLess(file)) {
      const content = fs.readFileSync(filePath).toString();
      less.render(content, {
        filename: file,
        paths: [dir]
      }).then(data => {
        fs.writeFileSync(filePath.replace('.less', '.css'), data.css);
      });
    }
  });
}

// clear dir
fs.emptyDirSync(esDir);

// compile es dir
fs.copySync(srcDir, esDir);
compile(esDir);
