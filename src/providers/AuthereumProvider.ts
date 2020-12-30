/**
 * WalletProvider 
 * @license MIT 
 * @author https://github.com/libertypie
 */

import Web3Standard from "./Web3Standard";
import Exception from "../classes/Exception"
import _PlatformWallets from './_PlatformWallets';

class AuthereumProvider  extends _PlatformWallets {

    constructor(opts: any){
        //lets do validation
        let providerPackage = opts.package || null;

        if(typeof providerPackage != 'object'){
            throw new Exception("package_required","Authereum package is required")
        }

        super(providerPackage.getProvider(),providerPackage);
    }
}    

export default AuthereumProvider;