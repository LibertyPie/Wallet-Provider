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
        let pkgInstance = new providerPackage(packageOpts.dappId,packageOpts.network)
        
        this.setProvider(pkgInstance.provider, pkgInstance)
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

    
}  //end class

