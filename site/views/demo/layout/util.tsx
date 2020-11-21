export function createVNode(h) {
  return (
    <span style="white-space: nowrap;display: flex;">%s
      <a>元</a>
    </span>
  );
}

const str = 'abc';
if (str) {
  console.log(1);
}
