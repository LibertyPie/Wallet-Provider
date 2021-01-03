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
class WalletConnectProvider extends _PlatformWallets_1.default {
    async _initialize(providerInfo) {
        //lets do validation
        let providerPackage = providerInfo.package || null;
        if (typeof providerPackage == null) {
            throw new Exception_1.default("wc_package_required", "WalletConnect package is required");
        }
        let provider = new providerPackage(providerInfo.options || {});
        //provider is same as package
        this.setProvider(provider);
    }
} //end class
exports.default = WalletConnectProvider;
