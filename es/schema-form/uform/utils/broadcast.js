function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { isFn } from "../types";
import { each } from "./array";

var noop = function noop() {
  return undefined;
}; // eslint-disable-next-line @typescript-eslint/no-empty-interface


export var Broadcast = /*#__PURE__*/function () {
  function Broadcast() {
    _defineProperty(this, "buffer", []);

    _defineProperty(this, "entries", []);

    _defineProperty(this, "length", void 0);
  }

  var _proto = Broadcast.prototype;

  _proto.flushBuffer = function flushBuffer(_ref) {
    var subscriber = _ref.subscriber,
        subscription = _ref.subscription;
    each(this.buffer, function (_ref2) {
      var payload = _ref2.payload,
          filter = _ref2.filter;

      if (isFn(filter)) {
        var _notification = filter(payload, subscription);

        if (_notification !== undefined) {
          subscriber(_notification);
        }
      } else {
        subscriber(payload, subscription);
      }
    });
  };

  _proto.notify = function notify(payload, filter) {
    if (this.length === 0) {
      this.buffer.push({
        payload: payload,
        filter: filter
      });
      return;
    }

    each(this.entries, function (_ref3) {
      var subscriber = _ref3.subscriber,
          subscription = _ref3.subscription;

      if (isFn(filter)) {
        var _notification2 = filter(payload, subscription);

        if (_notification2 !== undefined) {
          subscriber(_notification2);
        }
      } else {
        subscriber(payload, subscription);
      }
    });
    this.buffer.length = 0;
  };

  _proto.subscribe = function subscribe(subscriber, subscription) {
    var _this = this;

    if (!isFn(subscriber)) {
      return noop;
    }

    var index = this.entries.length;
    this.entries.push({
      subscriber: subscriber,
      subscription: subscription
    });
    this.flushBuffer(this.entries[index]);
    return function () {
      _this.entries.splice(index, 1);
    };
  };

  _proto.unsubscribe = function unsubscribe() {
    this.entries.length = 0;
    this.buffer.length = 0;
  };

  return Broadcast;
}();