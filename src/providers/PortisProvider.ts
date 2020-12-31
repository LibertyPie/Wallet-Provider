/**
 * WalletProvider 
 * @license MIT 
 * @author https://github.com/libertypie
 */

import Exception from '../classes/Exception';
import Status from "../classes/Status";
import _PlatformWallets from './_PlatformWallets';
import Provider from '../interface/Provider';
export default class PortisProvider  extends _PlatformWallets implements Provider  {

    async _initialize(providerInfo: any){

        //lets do validation
        let providerPackage = providerInfo.package || null;

        if(providerPackage == null){
            throw new Exception("portis_package_required","Portis package is required")
        }

        let packageOpts = providerInfo.options || {};  
        let packageInst = new providerPackage(packageOpts.dappId,packageOpts.network)
        
        this.setProvider(packageInst.provider, packageInst)

        //add request method to make it act as metamask api
        this._provider.__proto__.request = this._provider.sendAsync;

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

    handlerEventLiteners(){

        super.handlerEventLiteners();

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

