function req() {
  return new Promise((resolve, reject) => {
    console.log(resolve.toString());
    console.log(reject.toString());
    // resolve(1);
    console.log(2)
    reject(3);
  });
}

req();
req().then((a) => {
  console.log(a);
}).catch(e => {
  console.log(e);
});
