const path = process.argv[2];
const createDoc = require('../build/utils').createDoc;
const md5 = require('md5');

createDoc(path);
