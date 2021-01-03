/**
 * WalletProvider
 * @license MIT
 * @author https://github.com/libertypie
 */
import _PlatformWallets from "./_PlatformWallets";
import Provider from '../interface/Provider';
import Status from "../classes/Status";
export default class WalletLinkProvider extends _PlatformWallets implements Provider {
    _initialize(providerInfo: any): Promise<void>;
    getChainId(): Promise<string>;
    /**
     * disconnect
     */
    disconnect(): Promise<Status>;
}
