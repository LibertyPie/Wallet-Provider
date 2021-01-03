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
const Web3Standard_1 = __importDefault(require("./Web3Standard"));
const Exception_1 = __importDefault(require("../classes/Exception"));
class FrameProvider extends Web3Standard_1.default {
    async _initialize(providerInfo) {
        //lets do validation
        let providerPackage = providerInfo.package || null;
        if (typeof providerPackage == null) {
            throw new Exception_1.default("package_required", "FrameProvider package is required");
        }
        let provider = providerPackage();
        this.setProvider(provider);
    }
} //end class
exports.default = FrameProvider;
