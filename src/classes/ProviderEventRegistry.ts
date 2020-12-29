
export default class ProviderEventRegistry{

    //events
    protected _onConnectCallback: Function = () => {};
    protected _onDisconnectCallback: Function = () => {};
    protected _onPermissionRequestCallback: Function = () => {}
    protected _onErrorCallback: Function = () => {}
    protected _onAccountsChangedCallback: Function = () => {}
    protected _onChainChangedCallback: Function = () => {}
    protected _onConnectErrorCallback: Function = () => {}
    protected _onMessageCallback: Function = () => {}


    /**
     * on error
     */
    onError(callback: Function = () => {}): void {
        this._onErrorCallback = callback
    }

    /**
     * onDisconnect
     */
    onDisconnect(callback: Function = () => {}){
        this._onDisconnectCallback = callback;
    }

    /**
     * on account change
     * @param callback 
     */
    onAccountsChanged(callback: Function = () => {}){
        this._onAccountsChangedCallback = callback;
    }

    /**
     * onConnectError
     * @param callback 
     */
    onConnectError(callback: Function = () => {}){
        this._onConnectErrorCallback = callback;
    }

     /**
     * onChainChange
     * @param callback 
     */
    onChainChanged(callback: Function = () => {}){
        this._onChainChangedCallback = callback;
    }

    /**
     * onMessage
     * @param callback 
     */
    onMessage(callback: Function = () => {}){
        this._onMessageCallback = callback;
    }

}