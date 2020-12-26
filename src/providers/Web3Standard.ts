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

    _provider: Object = null
    windowObj = (window as any);
    onConnectCallback: Function;
    _accounts: Array<any> = [];

    constructor(walletIdentifier: string ){
        this._provider = this.windowObj[walletIdentifier];
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
            
            if(this.onConnectCallback != null && typeof this.onConnectCallback == "function"){
                this.onConnectCallback({provider:  this._provider, account: account})
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
     * onConnect
     */
    onConnect(callback: Function = () => {}){
        this.onConnectCallback = callback;
    }

    /**
     * getProvider
     */
    getProvider(): any {
        return this._provider;
    }

 }

 export default Web3Standard;