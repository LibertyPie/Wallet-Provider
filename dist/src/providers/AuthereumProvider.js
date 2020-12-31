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
var Exception_1 = __importDefault(require("../classes/Exception"));
var _PlatformWallets_1 = __importDefault(require("./_PlatformWallets"));
var AuthereumProvider = /** @class */ (function (_super) {
    __extends(AuthereumProvider, _super);
    function AuthereumProvider(providerInfo) {
        var _this = _super.call(this) || this;
        //lets do validation
        var providerPackage = providerInfo.package || null;
        if (typeof providerPackage == null) {
            throw new Exception_1.default("package_required", "Authereum package is required");
        }
        var packageOpts = providerInfo.options || {};
        var packageInst = new providerPackage(packageOpts.network);
        _this.init(packageInst.getProvider(), providerPackage);
        return _this;
    }
    return AuthereumProvider;
}(_PlatformWallets_1.default));
exports.default = AuthereumProvider;
