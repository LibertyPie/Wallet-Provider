/**
 * WalletProvider 
 * @license MIT 
 * @author https://github.com/libertypie
 */

import Web3Standard from "./Web3Standard";
import Exception from '../classes/Exception';
import Status from "../classes/Status";

class WalletConnectProvider  extends Web3Standard {

    constructor(opts: any){
    
        //lets do validation
        let providerPackage = opts.package || null;

        if(typeof providerPackage != 'object'){
            throw new Exception("wc_package_required","WalletConnect package is required")
        }

        super(providerPackage)
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
        return this._provider.connected;
    }

    /**
     * getChainId
     */
    async getChainId(): Promise<string> {
        let chainId = this._provider.chainId.toString(16);
        this.chainId = `0x${chainId}`
        return Promise.resolve(this.chainId);
    }


}  //end class

export default WalletConnectProvider;