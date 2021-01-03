/**
 * WalletProvider
 * @license MIT
 * @author https://github.com/libertypie
 */
import Status from "../classes/Status";
import _PlatformWallets from './_PlatformWallets';
import Provider from '../interface/Provider';
export default class PortisProvider extends _PlatformWallets implements Provider {
    _initialize(providerInfo: any): Promise<void>;
    /**
     * disconnect
     */
    disconnect(): Promise<Status>;
}
