const path = process.argv[2];
const createDoc = require('../build/utils').createDoc;

createDoc(path);
