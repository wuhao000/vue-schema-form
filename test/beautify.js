const html = require('html').prettyPrint;

const r = html(`<template #a><div><pre>

</pre></div></template>`, {
  unformatted: ['a', 'span', 'bdo', 'em', 'strong', 'dfn', 'samp', 'kbd', 'var', 'cite', 'abbr', 'acronym', 'q', 'sub', 'sup', 'tt', 'i', 'b', 'big', 'small', 'u', 's', 'strike', 'font', 'ins', 'del', 'address', 'dt', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
  indent_size: 2
})

console.log(r);
