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
var Web3Standard_1 = __importDefault(require("./Web3Standard"));
var Status_1 = __importDefault(require("../classes/Status"));
var _PlatformWallets = /** @class */ (function (_super) {
    __extends(_PlatformWallets, _super);
    function _PlatformWallets(provider, providerPackage) {
        if (providerPackage === void 0) { providerPackage = null; }
        return _super.call(this, provider, providerPackage) || this;
    }
    /**
   * override the connect method
   */
    _PlatformWallets.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, account, resultObj, e_1;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        //enable wallet first
                        _a = this;
                        return [4 /*yield*/, this._provider.enable()];
                    case 1:
                        //enable wallet first
                        _a._accounts = _c.sent();
                        account = this._accounts[0];
                        _b = {
                            account: account
                        };
                        return [4 /*yield*/, this.getChainId()];
                    case 2:
                        resultObj = (_b.chainId = _c.sent(),
                            _b.provider = this._provider,
                            _b);
                        if (!this.isOnconnectEventTriggered && this.isConnected()) {
                            this._onConnectCallback(resultObj);
                        }
                        return [2 /*return*/, Status_1.default.successPromise("", resultObj)];
                    case 3:
                        e_1 = _c.sent();
                        this._onConnectErrorCallback(e_1);
                        return [2 /*return*/, Promise.resolve(Status_1.default.error(e_1.message).setCode(e_1.code))];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }; //end fun
    return _PlatformWallets;
}(Web3Standard_1.default)); //end fun 
exports.default = _PlatformWallets;
