"use strict";
/**
 * WalletProvider
 * @license MIT
 * @author https://github.com/libertypie
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Exception_1 = __importDefault(require("../classes/Exception"));
const _PlatformWallets_1 = __importDefault(require("./_PlatformWallets"));
const Status_1 = __importDefault(require("../classes/Status"));
const Utils_1 = __importDefault(require("../classes/Utils"));
const _window = window;
class WalletLinkProvider extends _PlatformWallets_1.default {
    async _initialize(providerInfo) {
        //lets do validation
        let providerPackage = providerInfo.package || null;
        if (typeof providerPackage == null) {
            throw new Exception_1.default("package_required", "WalletLink package is required");
        }
        let packageOpts = providerInfo.options || {};
        //app config
        let appConfig = packageOpts.app || {};
        let network = packageOpts.network || {};
        try {
            let pkgInstance = new providerPackage(appConfig);
            let provider = pkgInstance.makeWeb3Provider(network.rpc, network.chainId);
            //provider is same as package
            this.setProvider(provider, pkgInstance);
        }
        catch (e) {
            this._onConnectErrorCallback(e);
            throw e;
        }
    }
    async getChainId() {
        return "";
    }
    /**
     * disconnect
     */
    async disconnect() {
        try {
            this._providerPackage.disconnect();
            this._provider.close();
            this._onDisconnectCallback();
            return Status_1.default.successPromise("");
        }
        catch (e) {
            this._onErrorCallback(e);
            Utils_1.default.logError(e);
            return Status_1.default.errorPromise("disconnection_failed", e);
        }
    }
}
exports.default = WalletLinkProvider;
