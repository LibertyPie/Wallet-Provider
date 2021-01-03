"use strict";
/**
 * WalletProvider
 * @license MIT
 * @author https://github.com/libertypie
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Web3Standard_1 = __importDefault(require("./Web3Standard"));
var _PlatformWallets = /** @class */ (function (_super) {
    __extends(_PlatformWallets, _super);
    function _PlatformWallets() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * fix providers without event listeners
     */
    /**
     * handleEvents
     */
    _PlatformWallets.prototype.handlerEventLiteners = function () {
        var _this = this;
        if (typeof this._provider["on"] == 'function') {
            _super.prototype.handlerEventLiteners.call(this);
            return;
        }
        //lets inject .on to web3 provider
        this._provider.__proto__.on = function (_event, _callback) {
            switch (_event) {
                case "connected":
                    _this._onAccountsChangedCallback = _callback;
                    break;
                case "disconnect":
                    _this._onDisconnectCallback = _callback;
                    break;
                case "chainChanged":
                    _this._onChainChangedCallback = _callback;
                    break;
                case "accountsChanged":
                    _this._onAccountsChangedCallback = _callback;
                    break;
                case "error":
                    _this._onErrorCallback = _callback;
                    break;
            }
        };
        _super.prototype.handlerEventLiteners.call(this);
    }; //end 
    return _PlatformWallets;
}(Web3Standard_1.default)); //end fun 
exports.default = _PlatformWallets;
