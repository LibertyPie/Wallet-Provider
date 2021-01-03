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
class _PlatformWallets extends Web3Standard_1.default {
    /**
     * fix providers without event listeners
     */
    /**
     * handleEvents
     */
    handlerEventLiteners() {
        if (typeof this._provider["on"] == 'function') {
            super.handlerEventLiteners();
            return;
        }
        //lets inject .on to web3 provider
        this._provider.__proto__.on = (_event, _callback) => {
            switch (_event) {
                case "connected":
                    this._onAccountsChangedCallback = _callback;
                    break;
                case "disconnect":
                    this._onDisconnectCallback = _callback;
                    break;
                case "chainChanged":
                    this._onChainChangedCallback = _callback;
                    break;
                case "accountsChanged":
                    this._onAccountsChangedCallback = _callback;
                    break;
                case "error":
                    this._onErrorCallback = _callback;
                    break;
            }
        };
        super.handlerEventLiteners();
    } //end 
} //end fun 
exports.default = _PlatformWallets;
