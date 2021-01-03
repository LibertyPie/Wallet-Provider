export default class ProviderEventRegistry {
    protected _onConnectCallback: Function;
    protected _onDisconnectCallback: Function;
    protected _onPermissionRequestCallback: Function;
    protected _onErrorCallback: Function;
    protected _onAccountsChangedCallback: Function;
    protected _onChainChangedCallback: Function;
    protected _onConnectErrorCallback: Function;
    protected _onMessageCallback: Function;
    /**
     * on error
     */
    onError(callback?: Function): void;
    /**
     * onDisconnect
     */
    onDisconnect(callback?: Function): void;
    /**
     * on account change
     * @param callback
     */
    onAccountsChanged(callback?: Function): void;
    /**
     * onConnectError
     * @param callback
     */
    onConnectError(callback?: Function): void;
    /**
    * onChainChange
    * @param callback
    */
    onChainChanged(callback?: Function): void;
    /**
     * onMessage
     * @param callback
     */
    onMessage(callback?: Function): void;
}
