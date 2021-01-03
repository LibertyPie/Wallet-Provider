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
const Status_1 = __importDefault(require("../classes/Status"));
const _PlatformWallets_1 = __importDefault(require("./_PlatformWallets"));
class PortisProvider extends _PlatformWallets_1.default {
    async _initialize(providerInfo) {
        //lets do validation
        let providerPackage = providerInfo.package || null;
        if (providerPackage == null) {
            throw new Exception_1.default("portis_package_required", "Portis package is required");
        }
        let packageOpts = providerInfo.options || {};
        let pkgInstance = new providerPackage(packageOpts.dappId, packageOpts.network);
        this.setProvider(pkgInstance.provider, pkgInstance);
    }
    /**
     * disconnect
     */
    async disconnect() {
        try {
            await this._providerPackage.logout();
            return Status_1.default.successPromise("");
        }
        catch (e) {
            this._onErrorCallback(e);
            return Status_1.default.errorPromise("disconnection_failed");
        }
    }
} //end class
exports.default = PortisProvider;
