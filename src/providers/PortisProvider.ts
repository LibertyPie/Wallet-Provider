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
import _PlatformWallets from './_PlatformWallets';

class PortisProvider  extends _PlatformWallets  {

    constructor(providerInfo: any){

        //lets do validation
        let providerPackage = providerInfo.package || null;

        if(providerPackage == null){
            throw new Exception("portis_package_required","Portis package is required")
        }

        let packageOpts = providerInfo.options || {};  
        let packageInst = new providerPackage(packageOpts.dappId,packageOpts.network)
        
        super(packageInst.provider, packageInst)
    }

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
        this.chainId = "0x"+this._providerPackage.config.network.chainId.toString(16);
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