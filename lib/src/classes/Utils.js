"use strict";
/**
 * WalletProvider
 * @license MIT
 * @author https://github.com/libertypie
 */
Object.defineProperty(exports, "__esModule", { value: true });
class Utils {
    static async getChainIdByRequest(providerClass) {
        return new Promise((resolve, reject) => {
            providerClass._provider.sendAsync({
                method: 'eth_chainId'
            }, (error, data) => {
                if (error) {
                    this.logError(error);
                    providerClass._onErrorCallback(error);
                    return reject(error);
                }
                let r = data.result;
                if (!/^(0x)/g.test(r))
                    r = "0x" + r.toString(16);
                resolve(r);
            });
        });
    }
    static logError(error) {
        if (!window._debug_wallet_provider)
            return;
        console.log(error, error.stack);
    }
}
exports.default = Utils;
