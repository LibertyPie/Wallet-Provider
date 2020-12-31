/**
 * WalletProvider 
 * @license MIT 
 * @author https://github.com/libertypie
 */

import Exception from '../classes/Exception';
import _PlatformWallets  from "./_PlatformWallets"
import Provider from '../interface/Provider';
import Status from "../classes/Status";
export default class WalletLinkProvider  extends _PlatformWallets implements Provider {

   async _initialize(providerInfo: any){

        //lets do validation
        let providerPackage = providerInfo.package || null;

        if(typeof providerPackage == null){
            throw new Exception("package_required","WalletLink package is required")
        }

        let packageOpts = providerInfo.options || {}

        //app config
        let appConfig = packageOpts.app || {}
        let network =  packageOpts.network || {}

        try{
            let packageInst = new providerPackage(appConfig);

            let provider = packageInst.makeWeb3Provider(network.rpc,network.chainId)
            
            //provider is same as package
            this.setProvider(provider,packageInst)
        } catch(e) {
            this._onConnectErrorCallback(e)
            throw e;
        }
    }

    /**
     * handleEvents
     */
    handlerEventLiteners(){

        //lets inject .on to web3 provider
        this._provider.__proto__.on = (_event: string,_callback: Function) => {
            switch(_event){
                case "connected":
                    this._onAccountsChangedCallback = _callback;
                break;
                case "disconnect":
                    this._onDisconnectCallback = _callback;
                break;
                case "chainChanged":
                    this._onChainChangedCallback = _callback;
                break;
                case "accountsChanged":
                    this._onAccountsChangedCallback = _callback;
                break;
                case "error":
                    this._onErrorCallback = _callback;
                break;
            }
        }

        super.handlerEventLiteners();
    }

    /**
     * disconnect
     */
    async disconnect(): Promise<Status> {
        try{
            this._providerPackage.disconnect()
            this._provider.close()
            this._onDisconnectCallback()
            return Status.successPromise("")
        } catch (e){
            this._onErrorCallback(e)
            return Status.errorPromise(e.message,e)
        }
    }

    /**
     * getChainId
     */
    async getChainId(): Promise<string> {
        this.chainId = "0x"+this._provider._chainId.toString(16);   
        return this.chainId;  
    }
}