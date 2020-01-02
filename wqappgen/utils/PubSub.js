"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.SUBSCRIPTION = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _events = require("events");

var SUBSCRIPTION = {
  Default: 'Subscription',
  Notification: 'Notification'
};
exports.SUBSCRIPTION = SUBSCRIPTION;

var PubSubDefinition =
/*#__PURE__*/
function () {
  function PubSubDefinition() {
    (0, _classCallCheck2.default)(this, PubSubDefinition);
    this.eventEmitter = new _events.EventEmitter();
  }

  (0, _createClass2.default)(PubSubDefinition, [{
    key: "on",
    value: function on(listener) {
      var eventName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : SUBSCRIPTION.Default;
      this.eventEmitter.on(eventName, listener);
    }
  }, {
    key: "removeEventListener",
    value: function removeEventListener(listener) {
      var eventName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : SUBSCRIPTION.Default;
      this.eventEmitter.removeListener(eventName, listener);
    }
  }, {
    key: "publish",
    value: function publish(payload) {
      var eventName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : SUBSCRIPTION.Default;
      var error = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      this.eventEmitter.emit(eventName, payload, error);
    }
  }, {
    key: "getEventEmitter",
    value: function getEventEmitter() {
      return this.eventEmitter;
    }
  }]);
  return PubSubDefinition;
}();

var PubSub = new PubSubDefinition();
var _default = PubSub;
exports.default = _default;