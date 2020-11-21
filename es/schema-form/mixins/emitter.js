var _dec, _class;

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

import Vue from 'vue';
import Component from 'vue-class-component';

function _broadcast(componentName, eventName, params) {
  this.$children.forEach(function (child) {
    var name = child.$options.componentName;

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      _broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}

var EventEmitter = (_dec = Component({
  name: 'Emitter'
}), _dec(_class = /*#__PURE__*/function (_Vue) {
  _inheritsLoose(EventEmitter, _Vue);

  function EventEmitter() {
    return _Vue.apply(this, arguments) || this;
  }

  var _proto = EventEmitter.prototype;

  _proto.dispatch = function dispatch(componentName, eventName, params) {
    var parent = this.$parent || this.$root;
    var name = parent.$options.name;

    while (parent && (!name || name !== componentName)) {
      parent = parent.$parent;

      if (parent) {
        name = parent.$options.name;
      }
    }

    if (parent) {
      parent.$emit.apply(parent, params ? [eventName].concat(params) : [eventName]);
    }
  };

  _proto.broadcast = function broadcast(componentName, eventName, params) {
    _broadcast.call(this, componentName, eventName, params);
  };

  return EventEmitter;
}(Vue)) || _class);
export { EventEmitter as default };