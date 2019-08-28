const parseDestructPath = require('@uform/utils').parseDesturctPath;

const path = '[a,b]';

const dPath = parseDestructPath(path).destruct || path;
