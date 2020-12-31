/**
 * WalletProvider 
 * @license MIT 
 * @author https://github.com/libertypie
 */

import Web3Standard from "./Web3Standard";
import Provider from '../interface/Provider';
class BinanceChainProvider extends Web3Standard implements Provider{
    async _initialize(providerInfo: any){
        this.setProvider((window as any).BinanceChain)
    }
}   

export default BinanceChainProvider;