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
const win = window;
class EthereumProvider extends Web3Standard_1.default {
    async _initialize(providerInfo) {
        let provider = win.ethereum || win.web3;
        console.log(provider);
        if (!provider) {
            this._onConnectCallback(new Exception_1.default("web3_wallet_not_found", "Web3 Wallet was not found"));
        }
        this.setProvider(provider);
    }
}
exports.default = EthereumProvider;
