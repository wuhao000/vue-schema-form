const triNode = function(key) {
  this.key = key;
  this.son = [];
  this.isWord = false;//用于单词标记
};
const tree = function() {
  this.root = new triNode(null);
};
tree.prototype = {
  insertData: function(stringData) {
    //用于外部调用插入，目的是从根节点开始插入
    this.insert(stringData, this.root);
  },
  insert: function(arrayData, node) {
    //用于内部自身递归调用，层层判断是否存在或是否要插入
    if (!arrayData.length) {
      //字符串为空，直接返回结束
      return;
    }
    //获取子节点
    const son = this.getSon(node);
    let haveData = null;
    //声明一个变量用来存储数组的第一部分和子节点相同的节点，方便后续节点递归遍历
    for (const i in son) {
      if (son[i].key === arrayData[0]) {
        haveData = son[i];
      }
    }
    if (haveData) {
      if (arrayData.length === 1) {
        haveData.isWord = true;
      }
      //havaData存在说明在子节点找到了，然后进行深入节点查找
      this.insert(arrayData.slice(1), haveData);
    } else {
      if (son.length === 0) {
        //如果子节点为空，则直接插入
        const node = new triNode(arrayData[0]);
        son.push(node);
        if (arrayData.length === 1) {
          node.isWord = true;
        }
        //插入完毕后将后续字符串继续插入
        this.insert(arrayData.slice(1), node);
      } else {
        const node = new triNode(arrayData[0]);
        //将子节点的key进行排序插入，方便后续进行二分法查找，加快查找效率
        let vlPosition = 0;
        for (const j in son) {
          if (son[j].key < arrayData[0]) {
            vlPosition++;
          }
        }
        if (arrayData.length === 1) {
          node.isWord = true;
        }
        //子节点插入
        son.splice(vlPosition, 0, node);
        //插入完毕后将后续字符串继续插入
        this.insert(arrayData.slice(1), node);
      }
    }
  },
  justContentData: function(stringData) {
    if (!stringData.length) {
      return 0;
    } else {
      return this.justContent(stringData, this.root);
    }
  },
  justContent: function(stringData, node) {
    if (!stringData.length) {
      //字符串为空，直接返回结束
      return 1;
    }
    const son = this.getSon(node);
    let havaData = null;
    for (const i in son) {
      if (son[i].key === stringData[0]) {
        havaData = son[i];
      }
    }
    if (havaData) {
      return this.justContent(stringData.slice(1), havaData);
    } else {
      return 0;
    }
  },
  countBeforeData: function(stringData) {
    if (!stringData.length) {
      return 0;
    }
    const node = this.searchBeforeNode(stringData, this.root);
    if (!node) {
      return 0;
    }
    return this.countBefore(node, 0);
  },
  searchBeforeNode: function(stringData, node) {
    if (!stringData.length) {
      //字符串为空，直接返回结束
      return node;
    }
    const son = this.getSon(node);
    let havaData = null;
    for (const i in son) {
      if (son[i].key === stringData[0]) {
        havaData = son[i];
      }
    }
    if (havaData) {
      return this.searchBeforeNode(stringData.slice(1), havaData);
    } else {
      return null;
    }
  },
  countBefore: function(node, num) {
    if (node.isWord) {
      num++;
    }
    const son = this.getSon(node);
    for (const i in son) {
      num = this.countBefore(son[i], num);
    }
    return num;
  },
  getSon: function(node) {
    //获取子节点
    return node.son;
  }
};
module.exports = tree;
