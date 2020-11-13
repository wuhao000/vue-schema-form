module.exports = function({ types: t }) {
  const buildAttrsCall = (attribs, t) => {
    const props = [];
    attribs.forEach(attr => {
      const name = attr.name;
      const value = attr.value;
      !t.isJSXExpressionContainer(value) &&
      props.push(t.objectProperty(t.stringLiteral(name), value));
      t.isJSXExpressionContainer(value) &&
      props.push(t.objectProperty(t.stringLiteral(name), value.expression));
    });
  
    return t.ObjectExpression(props);
  };
  
  const jsxVisitor = {
    JSXElement: {
      exit(path, state) {      
        // 获取 jsx 
        const openingPath = path.get('openingElement');
        const children = t.react.buildChildren(openingPath.parent);
  
        const tagNode = t.react.isCompatTag(openingPath.node.name.name)
          ? t.stringLiteral(openingPath.node.name.name)
          : t.identifier(openingPath.node.name.name);
  
        // 创建 Vue h
        const createElement = t.identifier('h');
        const attrs = buildAttrsCall(openingPath.node.attributes, t);
        // 创建 h(tag,{...attrs}, [chidren])
        const callExpr = t.callExpression(createElement, [tagNode, attrs, t.arrayExpression(children)]);
        path.replaceWith(t.inherits(callExpr, path.node));
      }
    },
    JSXAttribute(path) {
      if (t.isJSXElement(path.node.value)) {
        path.node.value = t.jsxExpressionContainer(path.node.value);
      }
    },
    Program: {
      exit(path, state) {
  
        const hasImportedVue = (path) => {
          return path.node.body.filter(p => p.type === 'ImportDeclaration').some(p => p.source.value == 'vue');
        };
        // 注入 h 函数
        if (path.node.start === 0) {
          if (!hasImportedVue(path)) {
            path.node.body.unshift(
              t.importDeclaration(
                [t.ImportSpecifier(t.identifier('h'), t.identifier('h'))],
                t.stringLiteral('vue')
              )
            );
          } else {
            const vueSource = path.node.body
              .filter(p => p.type === 'ImportDeclaration')
              .find(p => p.source.value === 'vue');
            const key = vueSource.specifiers.filter(s => s.imported !== undefined).map(s => s.imported.name);
            if (!key.includes('h')) {
              vueSource.specifiers.unshift(t.ImportSpecifier(t.identifier('h'), t.identifier('h')));
            }
          }
        }
      }
    }
  };
  
  return {
    visitor: jsxVisitor,
    inherits:() => {
      return {
        manipulateOptions(opts, parserOpts) {
          parserOpts.plugins.push('jsx');
        }
      };
    }
  };
};
