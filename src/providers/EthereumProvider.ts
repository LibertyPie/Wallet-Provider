/**
 * WalletProvider 
 * @license MIT 
 * @author https://github.com/libertypie
 */

import Web3Standard from "./Web3Standard";

class EthereumProvider  extends Web3Standard {

    constructor(config: any){
        super(((window as any).ethereum || (window as any).web3))
    }

}    

export default EthereumProvider;