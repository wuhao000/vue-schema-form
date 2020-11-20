import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";

var _dec, _class;

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
}), _dec(_class =
/*#__PURE__*/
function (_Vue) {
  _inherits(EventEmitter, _Vue);

  function EventEmitter() {
    _classCallCheck(this, EventEmitter);

    return _possibleConstructorReturn(this, _getPrototypeOf(EventEmitter).apply(this, arguments));
  }

  _createClass(EventEmitter, [{
    key: "dispatch",
    value: function dispatch(componentName, eventName, params) {
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
    }
  }, {
    key: "broadcast",
    value: function broadcast(componentName, eventName, params) {
      _broadcast.call(this, componentName, eventName, params);
    }
  }]);

  return EventEmitter;
}(Vue)) || _class);
export { EventEmitter as default };