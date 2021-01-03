/**
 * WalletProvider 
 * @license MIT 
 * @author https://github.com/libertypie
 */

import Exception from "../classes/Exception"
import _PlatformWallets from './_PlatformWallets';
import Provider from "../interface/Provider"
import Utils from '../classes/Utils';

export default class AuthereumProvider  extends _PlatformWallets implements Provider {
 
    async _initialize(providerInfo: any){
        
        //lets do validation
        let providerPackage = providerInfo.package || null;

        if(typeof providerPackage == null){
            throw new Exception("package_required","Authereum package is required")
        }

        let packageOpts = providerInfo.options || {};  

        let pkgInstance = new providerPackage(packageOpts.network);

        this.setProvider(pkgInstance.getProvider(),pkgInstance)
    }

}    
