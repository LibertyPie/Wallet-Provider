"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProviderEventRegistry {
    constructor() {
        //events
        this._onConnectCallback = () => { };
        this._onDisconnectCallback = () => { };
        this._onPermissionRequestCallback = () => { };
        this._onErrorCallback = () => { };
        this._onAccountsChangedCallback = () => { };
        this._onChainChangedCallback = () => { };
        this._onConnectErrorCallback = () => { };
        this._onMessageCallback = () => { };
    }
    /**
     * on error
     */
    onError(callback = () => { }) {
        this._onErrorCallback = callback;
    }
    /**
     * onDisconnect
     */
    onDisconnect(callback = () => { }) {
        this._onDisconnectCallback = callback;
    }
    /**
     * on account change
     * @param callback
     */
    onAccountsChanged(callback = () => { }) {
        this._onAccountsChangedCallback = callback;
    }
    /**
     * onConnectError
     * @param callback
     */
    onConnectError(callback = () => { }) {
        this._onConnectErrorCallback = callback;
    }
    /**
    * onChainChange
    * @param callback
    */
    onChainChanged(callback = () => { }) {
        this._onChainChangedCallback = callback;
    }
    /**
     * onMessage
     * @param callback
     */
    onMessage(callback = () => { }) {
        this._onMessageCallback = callback;
    }
}
exports.default = ProviderEventRegistry;
