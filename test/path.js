const p = require('../src/schema-form/utils/path');

const res = p.match(['#a'], {
  'a.b': {
    id: 'a',
    plainPath: 'a.b'
  },
  'a.c': {
    id: 'b',
    plainPath: 'a.c'
  }
});

console.log(res);
