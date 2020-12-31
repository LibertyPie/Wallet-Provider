/**
 * WalletProvider 
 * @license MIT 
 * @author https://github.com/libertypie
 */

import Web3Standard from "./Web3Standard";
import Status from '../classes/Status';


export default class _PlatformWallets  extends Web3Standard  {

    constructor(){
        super()
    }

    async init(provider,packageInst){
        this.init(provider,packageInst)
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
                chainId: await this.getChainId(),
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
    
}//end fun 