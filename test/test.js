const paths = [
  ['a', 'b', 'c'],
  ['a', 'b', 'e', 'f'],
  ['a', 'b', 0, 'c'],
  ['a', 'b', 0, 'd'],
  ['a', 'b', 1, 'c'],
  ['a', 'b', 2, 'c']
];
const def = {
  fields: {
    a: {
      fields: {
        b: {
          props: {}
        }
      }
    }
  }
};

function searchDef(path) {
  const parts = path.split('.');
  let df = def;
  parts.forEach(part => {
    if (df.fields) {
      if (typeof df.fields === 'object') {
        df = df.fields[part];
      } else if (Array.isArray(df.fields)) {
        df = df.fields.find(it => it.property === part);
      }
    } else {
      df = null;
    }
  });
  return df;
}

console.log(searchDef('a'));
console.log(searchDef('a.b'));
console.log(searchDef('a.b.c'));
