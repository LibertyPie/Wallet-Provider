/**
 * WalletProvider 
 * @license MIT 
 * @author https://github.com/libertypie
 */

import Web3Standard from "./Web3Standard";
class BinanceChainProvider extends Web3Standard{
    constructor(){
        super((window as any).BinanceChain)
    }

    static getInstance(): BinanceChainProvider {
        return new BinanceChainProvider();
    }
}   

export default BinanceChainProvider;