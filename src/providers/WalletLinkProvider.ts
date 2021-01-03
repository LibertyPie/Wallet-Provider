/**
 * WalletProvider 
 * @license MIT 
 * @author https://github.com/libertypie
 */

import Exception from '../classes/Exception';
import _PlatformWallets  from "./_PlatformWallets"
import Provider from '../interface/Provider';
import Status from "../classes/Status";
import Utils from '../classes/Utils';

const _window = window as any;
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

            let pkgInstance = new providerPackage(appConfig);

            let provider = pkgInstance.makeWeb3Provider(network.rpc,network.chainId)
            
            //provider is same as package
            this.setProvider(provider,pkgInstance)

        } catch(e) {
            this._onConnectErrorCallback(e)
            throw e;
        }
    }

    async getChainId(): Promise<string>{
        return "";
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
            Utils.logError(e)
            return Status.errorPromise("disconnection_failed",e)
        }
    }

}