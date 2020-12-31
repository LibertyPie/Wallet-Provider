/**
 * WalletProvider 
 * @license MIT 
 * @author https://github.com/libertypie
 */

import Exception from '../classes/Exception';
import _PlatformWallets  from "./_PlatformWallets"
import Provider from '../interface/Provider';

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

        let packageInst = new providerPackage(appConfig);

        let provider = packageInst.makeWeb3Provider(network.rpc,network.chainId)
        
        this._provider.__proto__.request = this._provider.sendAsync;

        //provider is same as package
        this.setProvider(provider,packageInst)
    }

    /**
     * getChainId
     */
    async getChainId(): Promise<string> {
        this.chainId = "0x"+this._provider._chainId.toString(16);   
        return this.chainId;  
    }
}