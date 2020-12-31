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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Exception_1 = __importDefault(require("../classes/Exception"));
var _PlatformWallets_1 = __importDefault(require("./_PlatformWallets"));
var Status_1 = __importDefault(require("../classes/Status"));
var WalletLinkProvider = /** @class */ (function (_super) {
    __extends(WalletLinkProvider, _super);
    function WalletLinkProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WalletLinkProvider.prototype._initialize = function (providerInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var providerPackage, packageOpts, appConfig, network, packageInst, provider;
            return __generator(this, function (_a) {
                providerPackage = providerInfo.package || null;
                if (typeof providerPackage == null) {
                    throw new Exception_1.default("package_required", "WalletLink package is required");
                }
                packageOpts = providerInfo.options || {};
                appConfig = packageOpts.app || {};
                network = packageOpts.network || {};
                try {
                    packageInst = new providerPackage(appConfig);
                    provider = packageInst.makeWeb3Provider(network.rpc, network.chainId);
                    //provider is same as package
                    this.setProvider(provider, packageInst);
                }
                catch (e) {
                    this._onConnectErrorCallback(e);
                    throw e;
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * handleEvents
     */
    WalletLinkProvider.prototype.handlerEventLiteners = function () {
        var _this = this;
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
    };
    /**
     * disconnect
     */
    WalletLinkProvider.prototype.disconnect = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    this._providerPackage.disconnect();
                    this._provider.close();
                    this._onDisconnectCallback();
                    return [2 /*return*/, Status_1.default.successPromise("")];
                }
                catch (e) {
                    this._onErrorCallback(e);
                    return [2 /*return*/, Status_1.default.errorPromise(e.message, e)];
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * getChainId
     */
    WalletLinkProvider.prototype.getChainId = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.chainId = "0x" + this._provider._chainId.toString(16);
                return [2 /*return*/, this.chainId];
            });
        });
    };
    return WalletLinkProvider;
}(_PlatformWallets_1.default));
exports.default = WalletLinkProvider;
