/**
 * WalletProvider 
 * @license MIT 
 * @author https://github.com/libertypie
 */

import Web3Standard from "./Web3Standard";
import Exception from '../classes/Exception';
import Status from "../classes/Status";
import Provider from "../interface/Provider"
import ProviderEventRegistry from "../classes/ProviderEventRegistry"

class PortisProvider  extends Web3Standard  {

    constructor(opts: any){

        //lets do validation
        let providerPackage = opts.package || null;

        if(typeof providerPackage != 'object'){
            throw new Exception("portis_package_required","Portis package is required")
        }

        super(providerPackage.provider)
    }

   
    /**
     * override the connect method
     */
    async connect(): Promise<Status> {

        try {

            //enable wallet first
            this._accounts = await this._provider.enable();

           let account = this._accounts[0];

            let resultObj = {
                account,
                chainId: this.getChainId(),
                provider: this._provider
            }

            if(!this.isOnconnectEventTriggered && this.isConnected()) {
               this._onConnectCallback(resultObj)
            }
            
            return Status.successPromise("",resultObj)
            
        } catch (e){

            this._onConnectErrorCallback(e)
            return Promise.resolve(Status.error(e.message).setCode(e.code));
        }
    } //end fun
    

    /**
     * override connected 
     */
    isConnected(): boolean {
        return this._provider.isConnected();
    }

}  //end class

export default PortisProvider;