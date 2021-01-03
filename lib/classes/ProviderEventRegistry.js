"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ProviderEventRegistry = /*#__PURE__*/function () {
  function ProviderEventRegistry() {
    _classCallCheck(this, ProviderEventRegistry);

    _defineProperty(this, "_onConnectCallback", function () {});

    _defineProperty(this, "_onDisconnectCallback", function () {});

    _defineProperty(this, "_onPermissionRequestCallback", function () {});

    _defineProperty(this, "_onErrorCallback", function () {});

    _defineProperty(this, "_onAccountsChangedCallback", function () {});

    _defineProperty(this, "_onChainChangedCallback", function () {});

    _defineProperty(this, "_onConnectErrorCallback", function () {});

    _defineProperty(this, "_onMessageCallback", function () {});
  }

  _createClass(ProviderEventRegistry, [{
    key: "onError",

    /**
     * on error
     */
    value: function onError() {
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      this._onErrorCallback = callback;
    }
    /**
     * onDisconnect
     */

  }, {
    key: "onDisconnect",
    value: function onDisconnect() {
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      this._onDisconnectCallback = callback;
    }
    /**
     * on account change
     * @param callback 
     */

  }, {
    key: "onAccountsChanged",
    value: function onAccountsChanged() {
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      this._onAccountsChangedCallback = callback;
    }
    /**
     * onConnectError
     * @param callback 
     */

  }, {
    key: "onConnectError",
    value: function onConnectError() {
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      this._onConnectErrorCallback = callback;
    }
    /**
    * onChainChange
    * @param callback 
    */

  }, {
    key: "onChainChanged",
    value: function onChainChanged() {
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      this._onChainChangedCallback = callback;
    }
    /**
     * onMessage
     * @param callback 
     */

  }, {
    key: "onMessage",
    value: function onMessage() {
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      this._onMessageCallback = callback;
    }
  }]);

  return ProviderEventRegistry;
}();

exports["default"] = ProviderEventRegistry;