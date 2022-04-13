const AsyncValidator = require('async-validator').default;

const validator = new AsyncValidator({
  amount: [{
    required: true, type: 'integer', message: a => {
      console.log(a);
      return '金额为必填项';
    }
  }]
});
const model = {
  amount: 0.1
};
validator.validate(model, { firstFields: true }, (errors) => {
  console.log(errors);
});

function sleep(delay) {
  var start = (new Date()).getTime();
  while ((new Date()).getTime() - start < delay) {
    continue;
  }
}

sleep(3000);
