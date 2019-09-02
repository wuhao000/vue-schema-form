const paths = [
  ['a', 'b', 'c'],
  ['a', 'b', 'e', 'f'],
  ['a', 'b', 0, 'c'],
  ['a', 'b', 0, 'd'],
  ['a', 'b', 1, 'c'],
  ['a', 'b', 2, 'c']
];

console.log(match('a.*'));
console.log(match('a.?'));
console.log(match('a.b.*'));
console.log(match('a.b.?'));

function assert(valid, message) {
  if (!valid) {
    console.error(message);
  }
}
