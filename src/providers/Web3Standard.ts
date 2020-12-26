/**
 * WalletProvider 
 * @license MIT 
 * @author https://github.com/libertypie
 */

declare global {
    interface Window {}
}

 import Provider from "../interface/Provider";
 import NetworkCodes from "../classes/NetworkCodes"
 import Status from "../classes/Status"

 class Web3Standard implements Provider {

    _provider: any = null
    windowObj = (window as any);

    //events
    _onConnectCallback: Function = () => {};
    _onDisconnectCallback: Function = () => {};
    _onPermissionRequestCallback: Function = () => {}
    _onErrorCallback: Function = () => {}

    _accounts: Array<any> = [];

    constructor(walletIdentifier: string ){
        this._provider = this.windowObj[walletIdentifier];
    }

    /**
     * initialize the plugin
     */
    initialize(): Status {

        return Status.success("")
    }

    /**
     * wether the provider is supported in the browser
     */
    isSupported(): boolean {
        return (typeof this._provider !== 'undefined');
    }

    /**
     * connect
     */
    async  connect(): Promise<any> { 

        if(!this.isSupported()){
            return Status.error("wallet_not_found")
                         .setCode(NetworkCodes.wallet_not_found)
        }


        //lets request access 
        try {

            this._accounts = await  this._provider.request({ method: 'eth_requestAccounts' });

            let account = this._accounts[0]
            
            if(this._onConnectCallback != null && typeof this._onConnectCallback == "function"){
                this._onConnectCallback({provider:  this._provider, account: account})
            }

            return Status.successPromise("",{
                account,
                provider: this._provider
            })
            
        } catch (e) {
            return Promise.resolve(Status.error(e.message).setCode(e.code));
        }
    }

    /**
     * disconnect
     * @param callback 
     */
    disconnect(): Status {
        return Status.success("")
    }

    /**
     * onConnect
     */
    onConnect(callback: Function = () => {}){
        this._onConnectCallback = callback;
    }

    /**
     * onPermission
     * @param callback 
     */
    onPermissionRequest(callback: Function = () => {}){
        this._onPermissionRequestCallback = callback;
    }

    /**
     * on error
     */
    onError(callback: Function = () => {}): void {
        this._onErrorCallback = callback
    }

    /**
     * onConnect
     */
    onDisconnect(callback: Function = () => {}){
        this._onDisconnectCallback = callback;
    }

    /**
     * getProvider
     */
    getProvider(): any {
        return this._provider;
    }

 }

 export default Web3Standard;