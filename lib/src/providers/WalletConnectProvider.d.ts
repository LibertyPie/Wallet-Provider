/**
 * WalletProvider
 * @license MIT
 * @author https://github.com/libertypie
 */
import _PlatformWallets from "./_PlatformWallets";
import Provider from '../interface/Provider';
export default class WalletConnectProvider extends _PlatformWallets implements Provider {
    _initialize(providerInfo: any): Promise<void>;
}
