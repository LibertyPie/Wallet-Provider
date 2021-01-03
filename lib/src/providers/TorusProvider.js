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
const Web3Standard_1 = __importDefault(require("./Web3Standard"));
const Utils_1 = __importDefault(require("../classes/Utils"));
class TorusProvider extends Web3Standard_1.default {
    /**
     * torusInit
     */
    async _initialize(providerInfo) {
        //lets do validation
        let providerPackage = providerInfo.package || null;
        if (providerPackage == null) {
            throw new Exception_1.default("package_required", "Torus package is required");
        }
        try {
            let packageInst = new providerPackage();
            await packageInst.init(providerInfo.options || {});
            await packageInst.login();
            this.setProvider(packageInst.provider, packageInst);
        }
        catch (e) {
            this._onConnectErrorCallback(e);
            Utils_1.default.logError(e);
            throw e;
        }
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
            Utils_1.default.logError(e);
            return Status_1.default.errorPromise("disconnection_failed");
        }
    }
} //end class
exports.default = TorusProvider;
