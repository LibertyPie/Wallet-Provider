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
var BinanceChainProvider = /** @class */ (function (_super) {
    __extends(BinanceChainProvider, _super);
    function BinanceChainProvider() {
        return _super.call(this, window.BinanceChain) || this;
    }
    BinanceChainProvider.getInstance = function () {
        return new BinanceChainProvider();
    };
    return BinanceChainProvider;
}(Web3Standard_1.default));
exports.default = BinanceChainProvider;
