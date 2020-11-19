const a = '  import a from \'@/a/b/c\';';
const b = '  import a from \'@/a/b/c\'';

const reg = /.*import .* from.*'(@\/.*)';?/;
if (reg.test(a)) {
  const r = a.match(reg);
  const path = r[1];
}
