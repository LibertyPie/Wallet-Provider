/**
 * WalletProvider 
 * @license MIT 
 * @author https://github.com/libertypie
 */

import Exception from '../classes/Exception';
import _PlatformWallets  from "./_PlatformWallets"
import Provider from '../interface/Provider';
export default class WalletConnectProvider  extends _PlatformWallets   implements Provider {

    async _initialize(providerInfo: any){

        //lets do validation
        let providerPackage = providerInfo.package || null;

        if(typeof providerPackage == null){
            throw new Exception("wc_package_required","WalletConnect package is required")
        }

        let provider = new providerPackage(providerInfo.options || {});

        //provider is same as package
        this.setProvider(provider)
    }

}  //end class
