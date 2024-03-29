/**
 * Compile components
 */
import fs from 'fs';
import path from 'path';

const srcDir = path.join(__dirname, '../src');
const paths = [
  path.join(__dirname, '../src'),
];

const scriptRegExp = /\.(js|jsx|ts|vue|tsx)$/;
const isDir = dir => fs.lstatSync(dir).isDirectory();
const isScript = path => scriptRegExp.test(path);
const reg = /.*(import|export) .* from.*'(@\/.*)';?/;

function checkFile(filePath: string) {
  const content = fs.readFileSync(filePath).toString();
  const lines = content.split('\n');
  let hasRelativeClause = false;
  lines.forEach((line, index) => {
    if (reg.test(line)) {
      const r = line.match(reg);
      const realPath = 'src' + r[2].substr(1);
      let rel = path.relative(filePath, path.resolve(realPath)).replace(/\\/g, '/')
        .replace('../', '');
      if (!rel.startsWith('../')) {
        rel = `./${rel}`;
      }
      lines[index] = line.replace(r[2], rel);
      hasRelativeClause = true;
    }
  });
  if (hasRelativeClause) {
    console.log('修复文件' + filePath);
    const content = lines.join('\n');
    fs.writeFileSync(filePath, content);
  }
}

function check(dir) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);

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
