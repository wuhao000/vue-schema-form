function defineSchemaForm(obj) {
  return new Proxy(obj, {
    get(target, p, receiver) {
      if (p === '_field') {
        return target._field;
      }
      if (/\d+/.test(p)) {
        const def = target[p];
        if (def === undefined) {
          target[p] = defineSchemaForm(Object.assign({}, target));
          return target[p];
        } else {
          return def;
        }
      } else {
        console.log(Object.prototype.toString(target.fields[p]))
        if (target.fields[p] instanceof Proxy) {
          target.fields[p] = defineSchemaForm(target.fields[p])
        }
        return target.fields[p];
      }
    }
  });
}

const b = defineSchemaForm({
  fields: {
    a: {
      type: 'a',
      xProps: {},
      fields: {
        c: {
          type: 'c'
        },
        d: {
          type: 'd',
          array: true
        }
      }
    }
  }
});

// b.a.d['0'];
b.a.d[0];
b.a.d['*'];
