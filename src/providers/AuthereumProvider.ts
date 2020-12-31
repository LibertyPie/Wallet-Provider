/**
 * WalletProvider 
 * @license MIT 
 * @author https://github.com/libertypie
 */

import Exception from "../classes/Exception"
import _PlatformWallets from './_PlatformWallets';

export default class AuthereumProvider  extends _PlatformWallets implements Provider {
 
    constructor(providerInfo: any){

        super();

        //lets do validation
        let providerPackage = providerInfo.package || null;

        if(typeof providerPackage == null){
            throw new Exception("package_required","Authereum package is required")
        }

        let packageOpts = providerInfo.options || {};  

        let packageInst= new providerPackage(packageOpts.network);

        this.init(packageInst.getProvider(),providerPackage)
    }
}    
