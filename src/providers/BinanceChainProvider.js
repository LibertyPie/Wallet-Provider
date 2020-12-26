/**
 * LibertyPie
 */
import Status from "../../classes/Status"
import NetworkCodes from "../../classes/networkCodes"

class EthereumProvider {

    _onConnectCallback = null;
    _provider = window.BinanceChain;
    _accounts = [];

    /**
     * wether the provider is supported in the browser
     */
    isSupported(){
        return _provider;
    }

    /**
     * connect - Connect to the provide
     */
    async connect(){

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
    onConnect(callback = null){
        this.onConnectCallback = callback;
    }

    /**
     * getProvider
     */
    getProvider(){
        return this._provider;
    }

    
}