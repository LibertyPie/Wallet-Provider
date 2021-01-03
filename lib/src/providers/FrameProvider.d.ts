/**
 * WalletProvider
 * @license MIT
 * @author https://github.com/libertypie
 */
import Web3Standard from "./Web3Standard";
import Provider from '../interface/Provider';
declare class FrameProvider extends Web3Standard implements Provider {
    _initialize(providerInfo: any): Promise<void>;
}
export default FrameProvider;
