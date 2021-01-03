/**
 * WalletProvider
 * @license MIT
 * @author https://github.com/libertypie
 */
export default class Utils {
    static getChainIdByRequest(providerClass: any): Promise<string>;
    static logError(error: Error): void;
}
