/**
 * WalletProvider 
 * @license MIT 
 * @author https://github.com/libertypie
 */

import Web3Standard from "./Web3Standard";
import Exception from '../classes/Exception';
import Status from "../classes/Status";
import Provider from "../interface/Provider"
import ProviderEventRegistry from "../classes/ProviderEventRegistry"
import Utils from "../classes/Utils";
import ErrorCodes from "../classes/ErrorCodes";

class PortisProvider  extends Web3Standard  {

    constructor(opts: any){

        //lets do validation
        let providerPackage = opts.package || null;

        if(typeof providerPackage != 'object'){
            throw new Exception("portis_package_required","Portis package is required")
        }

        super(providerPackage.provider, providerPackage)
    }

   
    /**
     * override the connect method
     */
    async connect(): Promise<Status> {

        try {

            //enable wallet first
            this._accounts = await this._provider.enable();

           let account = this._accounts[0];

            let resultObj = {
                account,
                chainId: await this.getChainId(),
                provider: this._provider
            }

            if(!this.isOnconnectEventTriggered && this.isConnected()) {
               this._onConnectCallback(resultObj)
            }
            
            return Status.successPromise("",resultObj)
            
        } catch (e){

            this._onConnectErrorCallback(e)
            return Promise.resolve(Status.error(e.message).setCode(e.code));
        }
    } //end fun
    

    /**
     * override connected 
     */
    isConnected(): boolean {
        return this._provider.isConnected();
    }


    /**
     * getChainId
     */
    async getChainId(): Promise<string> {
        let chainIdInt = this._providerPackage.config.network.chainId;
        this.chainId = "0x"+chainIdInt.toString(16);
        return Promise.resolve(this.chainId);
    }

    /**
     * disconnect
     */
    async disconnect(): Promise<Status>{
        try{
            await this._providerPackage.logout();
            
            return Status.successPromise("");
        } catch(e){
            this._onErrorCallback(e)
            return Status.errorPromise("disconnection_failed")
        }
    }

    initialize(){

        //add request method to make it act as metamask api
        this._provider.__proto__.request = this._provider.sendAsync;

        super.initialize();

        this._providerPackage.onError(error => {
           this._onErrorCallback(error)
        });

        this._providerPackage.onActiveWalletChanged(walletAddress => {
            this._onAccountsChangedCallback([walletAddress])
        });

        this._providerPackage.onLogout(() => {
            this._onDisconnectCallback()
        });
          
    }
}  //end class

export default PortisProvider;