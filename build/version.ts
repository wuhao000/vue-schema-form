import fs from 'fs';
import beautify from 'js-beautify';
import path from 'path';

const checkLog = () => {
// const args = process.argv;
// if (!args.includes('-log')) {
//   throw new Error('请输入-log参数');
// }
// const log = args[args.indexOf('-log') + 1];
// if (!log) {
//   throw new Error('请输入版本日志信息');
// }
};

checkLog();

const jsonPath = path.join(__dirname, '../package.json');

const json = fs.readFileSync(jsonPath).toString();

const obj = JSON.parse(json);

const version: string = obj.version;
const lastVersion = obj.lastVersion;
if (!lastVersion || version === lastVersion) {
  const r = version.match(/(\d+).(\d+).(\d+)-?(\w+)?/);
  if (!r[3]) {
    throw new Error('非法的版本号');
  }
  obj.version = r[1] + '.' + r[2] + '.' + (parseInt(r[3]) + 1);
}
obj.lastVersion = obj.version;
const content = beautify(JSON.stringify(obj), {
  indent_size: 2
});
fs.writeFileSync(jsonPath, content);
