"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ProviderEventRegistry = /** @class */ (function () {
    function ProviderEventRegistry() {
        //events
        this._onConnectCallback = function () { };
        this._onDisconnectCallback = function () { };
        this._onPermissionRequestCallback = function () { };
        this._onErrorCallback = function () { };
        this._onAccountsChangedCallback = function () { };
        this._onChainChangedCallback = function () { };
        this._onConnectErrorCallback = function () { };
        this._onMessageCallback = function () { };
    }
    /**
     * on error
     */
    ProviderEventRegistry.prototype.onError = function (callback) {
        if (callback === void 0) { callback = function () { }; }
        this._onErrorCallback = callback;
    };
    /**
     * onDisconnect
     */
    ProviderEventRegistry.prototype.onDisconnect = function (callback) {
        if (callback === void 0) { callback = function () { }; }
        this._onDisconnectCallback = callback;
    };
    /**
     * on account change
     * @param callback
     */
    ProviderEventRegistry.prototype.onAccountsChanged = function (callback) {
        if (callback === void 0) { callback = function () { }; }
        this._onAccountsChangedCallback = callback;
    };
    /**
     * onConnectError
     * @param callback
     */
    ProviderEventRegistry.prototype.onConnectError = function (callback) {
        if (callback === void 0) { callback = function () { }; }
        this._onConnectErrorCallback = callback;
    };
    /**
    * onChainChange
    * @param callback
    */
    ProviderEventRegistry.prototype.onChainChanged = function (callback) {
        if (callback === void 0) { callback = function () { }; }
        this._onChainChangedCallback = callback;
    };
    /**
     * onMessage
     * @param callback
     */
    ProviderEventRegistry.prototype.onMessage = function (callback) {
        if (callback === void 0) { callback = function () { }; }
        this._onMessageCallback = callback;
    };
    return ProviderEventRegistry;
}());
exports.default = ProviderEventRegistry;
