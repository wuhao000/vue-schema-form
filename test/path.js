const splits = ['a', 'b', 'c', 'd'];
const last = ['a', 'b', 'c', 'd', 'e'];
splits.splice(splits.length - last.length, last.length, ...last);
console.log(splits);
