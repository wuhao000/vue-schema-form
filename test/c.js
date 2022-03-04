const AsyncValidator = require('async-validator').default;

const path = 'aaa';
const value = 2;
const rules = [{
  min: 1,
  max: 12,
  type: 'number',
  message: '必须大于1小于12'
}];
const validator = new AsyncValidator({
  [path]: rules
});
const model = {
  [path]: value
};
validator.validate(model, { firstFields: true }, (errors) => {
  console.log(errors);
});
