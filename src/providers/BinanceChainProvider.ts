/**
 * WalletProvider 
 * @license MIT 
 * @author https://github.com/libertypie
 */

import Web3Standard from "./Web3Standard";
class BinanceChainProvider extends Web3Standard{
    constructor(opts: any){
        super((window as any).BinanceChain)
    }

}   

export default BinanceChainProvider;