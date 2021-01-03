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
class BinanceChainProvider extends Web3Standard_1.default {
    async _initialize(providerInfo) {
        this.setProvider(window.BinanceChain);
    }
}
exports.default = BinanceChainProvider;
