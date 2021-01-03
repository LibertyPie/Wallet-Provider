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
class AuthereumProvider extends _PlatformWallets_1.default {
    async _initialize(providerInfo) {
        //lets do validation
        let providerPackage = providerInfo.package || null;
        if (typeof providerPackage == null) {
            throw new Exception_1.default("package_required", "Authereum package is required");
        }
        let packageOpts = providerInfo.options || {};
        let pkgInstance = new providerPackage(packageOpts.network);
        this.setProvider(pkgInstance.getProvider(), pkgInstance);
    }
}
exports.default = AuthereumProvider;
