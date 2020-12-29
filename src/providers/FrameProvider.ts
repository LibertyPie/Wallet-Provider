/**
 * WalletProvider 
 * @license MIT 
 * @author https://github.com/libertypie
 */

import Web3Standard from "./Web3Standard";
import Exception from '../classes/Exception';
import Utils from "../classes/Utils"

class FrameProvider  extends Web3Standard {

    constructor(opts: any){
    
        //lets do validation
        let providerPackage = opts.package || null;

        if(typeof providerPackage != 'object'){
            throw new Exception("package_required","FrameProvider package is required")
        }

        super(providerPackage)
    }

        /**
     * isConnected
     */
    isConnected(): boolean {
        return this._provider.connected;
    }

    /**
     * getChainId
     */
    async getChainId(): Promise<string> {
      return Utils.getChainIdByRequest(this._provider);     
    }
}  //end class

export default FrameProvider;