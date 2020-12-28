/**
 * WalletProvider 
 * @license MIT 
 * @author https://github.com/libertypie
 */

import Web3Standard from "./Web3Standard";
import Exception from '../classes/Exception';

class WalletConnectProvider  extends Web3Standard {

    constructor(opts: any){
        super(((window as any).ethereum || (window as any).web3))
    }

    //lets validate required options 
    validateRequiredOpts(opts: any){

        //lets do validation
        let package = opts.package || null;

        if(typeof package != 'object'){
            throw new Exception("walletconnect_package_required","WalletConnect package is required")
        }
    }

    static getInstance(opts: any): WalletConnectProvider {
        return new WalletConnectProvider(opts);
    }
}    

export default WalletConnectProvider;