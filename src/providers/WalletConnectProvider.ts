/**
 * WalletProvider 
 * @license MIT 
 * @author https://github.com/libertypie
 */

import Web3Standard from "./Web3Standard";
import Exception from '../classes/Exception';
import Status from "../classes/Status";
import {providers as ethersProvider} from 'ethers'

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
            await this._provider.enable();

            this._web3 = new ethersProvider.Web3Provider(this._provider)

            let  accountsStatus =  await this.getAccounts()

            if(accountsStatus.isError()){
                console.log("accountsStatusErr==>",accountsStatus)
                return accountsStatus;
            }

            this._accounts = accountsStatus.getData<Array<string>>() || [];

            let account = this._accounts[0];

            let resultObj = {
                account,
                chainId: this.getChainId(),
                provider: this._provider,
                web3: this._web3
            }

            console.log("resultObj===>",resultObj)

            if(!this.isOnconnectEventTriggered && this.isConnected()) {
               this._onConnectCallback(resultObj)
            }
            
            return Status.successPromise("",resultObj)
            
        } catch (e){

        }
    } //end fun

}    

export default WalletConnectProvider;