/**
 * WalletProvider 
 * @license MIT 
 * @author https://github.com/libertypie
 */

import Web3Standard from "./Web3Standard";
import Exception from '../classes/Exception';
import Utils from "../classes/Utils"
import Provider from '../interface/Provider';

class FrameProvider  extends Web3Standard implements Provider {

    async _initialize(providerInfo: any){

        //lets do validation
        let providerPackage = providerInfo.package || null;

        if(typeof providerPackage == null){
            throw new Exception("package_required","FrameProvider package is required")
        }

        let provider =  providerPackage();

       this.setProvider(provider)
    }

}  //end class

export default FrameProvider;