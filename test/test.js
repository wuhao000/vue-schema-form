const TreeSearch = require('trie-search');

const paths = [
  ['a', 'b', 'c'],
  ['a', 'b', 'e', 'f'],
  ['a', 'b', 0, 'c'],
  ['a', 'b', 0, 'd'],
  ['a', 'b', 1, 'c'],
  ['a', 'b', 2, 'c']
];

function TrieNode(key, value) {
  this.key = key;
  this.value = [value];
  this.children = [];
  this.strictValue = null;
  this.addChild = (child) => {
    this.children.push(child);
  };
  this.addValue = (v) => {
    this.value.push(v);
  };
  this.search = (path) => {
    let nodes = [];
    if (path === '?') {
      nodes = this.children;
    } else {
      nodes = [this.children.find(it => it.key === path[0])];
    }
    if (path.length === 1) {
      return nodes;
    } else if (path.length > 1) {
      const newPath = path.slice(1);
      const a = nodes.map(node => node.search(newPath));
      let b = [];
      a.forEach(it => {
        b = b.concat(it);
      });
      return b;
    } else {
      return [];
    }
  };
}

function trie() {
}

trie.prototype = {
  rootNode: new TrieNode(),
  search: function(path) {
    return this.rootNode.search(path);
  },
  insert: function(path) {
    let tmpNode = this.rootNode;
    path.forEach((part, index) => {
      let child = tmpNode.children.find(c => c.key === part);
      if (child) {
        child.addValue(path);
      } else {
        child = new TrieNode(part, path);
        tmpNode.addChild(child);
      }
      if (index === path.length - 1) {
        child.strictValue = path;
      }
      tmpNode = child;
    });
  },
  addAll: function(paths) {
    paths.forEach(path => {
      this.insert(path);
    });
  }
};

const t = new trie();
t.addAll(paths);
const res = t.search(['a', 'b', '?']);
console.log(res.map(it => it.strictValue));

var ts = new TreeSearch();
ts.addAll(paths);
match(['a', '*']);
match(['a', '?']);
match(['a', 'b', '*']);
match(['a', 'b', '?']);

function matchPath(origin, path) {
  origin.forEach(it => {

  });
  return undefined;
}

function match(origin) {
  paths.filter(path => matchPath(origin, path));
}

function assert(valid, message) {
  if (!valid) {
    console.error(message);
  }
}
