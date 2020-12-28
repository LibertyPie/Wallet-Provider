/**
 * WalletProvider 
 * @license MIT 
 * @author https://github.com/libertypie
 */

import Web3Standard from "./Web3Standard";

class EthereumProvider  extends Web3Standard {

    constructor(){
        super(((window as any).ethereum || (window as any).web3))
    }

    static getInstance(): EthereumProvider {
        return new EthereumProvider();
    }
}    

export default EthereumProvider;