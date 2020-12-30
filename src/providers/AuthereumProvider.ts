/**
 * WalletProvider 
 * @license MIT 
 * @author https://github.com/libertypie
 */

import Web3Standard from "./Web3Standard";
import Exception from "../classes/Exception"
import _PlatformWallets from './_PlatformWallets';

class AuthereumProvider  extends _PlatformWallets {
 
    constructor(providerInfo: any){

        //lets do validation
        let providerPackage = providerInfo.package || null;

        if(typeof providerPackage == null){
            throw new Exception("package_required","Authereum package is required")
        }

        let packageOpts = providerInfo.options || {};  

        let packageInst= new providerPackage(packageOpts.network);

        super(packageInst.getProvider(),providerPackage);
    }
}    

export default AuthereumProvider;