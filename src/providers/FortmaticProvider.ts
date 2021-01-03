/**
 * WalletProvider 
 * @license MIT 
 * @author https://github.com/libertypie
 */

import Exception from '../classes/Exception';
import Status from "../classes/Status";
import _PlatformWallets from './_PlatformWallets';
import Provider from '../interface/Provider';
import Utils from '../classes/Utils';

export default class FormaticProvider  extends _PlatformWallets implements Provider  {

    async _initialize(providerInfo: any){

        //lets do validation
        let providerPackage = providerInfo.package || null;

        if(providerPackage == null){
            throw new Exception("package_required","Formatic package is required")
        }

        let pkgOpts = providerInfo.options || {};  
        let pkgInstance = new providerPackage(pkgOpts.apiKey)
        
        this.setProvider(pkgInstance.getProvider(), pkgInstance)
    }

    /**
     * isConnected
     */
    isConnected(): boolean {
        return true;
    }

}  //end class

