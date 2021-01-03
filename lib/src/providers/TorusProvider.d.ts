/**
 * WalletProvider
 * @license MIT
 * @author https://github.com/libertypie
 */
import Status from "../classes/Status";
import Provider from '../interface/Provider';
import Web3Standard from './Web3Standard';
export default class TorusProvider extends Web3Standard implements Provider {
    /**
     * torusInit
     */
    _initialize(providerInfo: any): Promise<void>;
    /**
     * disconnect
     */
    disconnect(): Promise<Status>;
}
