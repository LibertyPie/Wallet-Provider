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
class FormaticProvider extends _PlatformWallets_1.default {
    async _initialize(providerInfo) {
        //lets do validation
        let providerPackage = providerInfo.package || null;
        if (providerPackage == null) {
            throw new Exception_1.default("package_required", "Formatic package is required");
        }
        let pkgOpts = providerInfo.options || {};
        let pkgInstance = new providerPackage(pkgOpts.apiKey);
        this.setProvider(pkgInstance.getProvider(), pkgInstance);
    }
    /**
     * isConnected
     */
    isConnected() {
        return true;
    }
} //end class
exports.default = FormaticProvider;
