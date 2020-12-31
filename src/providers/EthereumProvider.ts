/**
 * WalletProvider 
 * @license MIT 
 * @author https://github.com/libertypie
 */

import Web3Standard from "./Web3Standard";
import Provider from '../interface/Provider';

class EthereumProvider  extends Web3Standard implements Provider {

    async __initialize(packageInfo: any){
        this.setProvider(((window as any).ethereum || (window as any).web3))
    }

}    

export default EthereumProvider;