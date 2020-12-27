"use strict";
/**
 * WalletProvider
 * @license MIT
 * @author https://github.com/libertypie
 */
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
var ErrorCodes_1 = __importDefault(require("../classes/ErrorCodes"));
var Status_1 = __importDefault(require("../classes/Status"));
var Web3Standard = /** @class */ (function () {
    function Web3Standard(provider) {
        this._provider = null;
        this.windowObj = window;
        //events
        this._onConnectCallback = function () { };
        this._onDisconnectCallback = function () { };
        this._onPermissionRequestCallback = function () { };
        this._onErrorCallback = function () { };
        this._accounts = [];
        this._provider = provider;
    }
    /**
     * initialize the plugin
     */
    Web3Standard.prototype.initialize = function () {
        return Status_1.default.success("");
    };
    /**
     * wether the provider is supported in the browser
     */
    Web3Standard.prototype.isSupported = function () {
        return (typeof this._provider !== 'undefined');
    };
    /**
     * connect
     */
    Web3Standard.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, account, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.isSupported()) {
                            return [2 /*return*/, Status_1.default.error("wallet_not_found")
                                    .setCode(ErrorCodes_1.default.wallet_not_found)];
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        _a = this;
                        return [4 /*yield*/, this._provider.request({ method: 'eth_requestAccounts' })];
                    case 2:
                        _a._accounts = _b.sent();
                        account = this._accounts[0];
                        if (this._onConnectCallback != null && typeof this._onConnectCallback == "function") {
                            this._onConnectCallback({ provider: this._provider, account: account });
                        }
                        return [2 /*return*/, Status_1.default.successPromise("", {
                                account: account,
                                provider: this._provider
                            })];
                    case 3:
                        e_1 = _b.sent();
                        return [2 /*return*/, Promise.resolve(Status_1.default.error(e_1.message).setCode(e_1.code))];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * disconnect
     * @param callback
     */
    Web3Standard.prototype.disconnect = function () {
        return Status_1.default.success("");
    };
    /**
     * onConnect
     */
    Web3Standard.prototype.onConnect = function (callback) {
        if (callback === void 0) { callback = function () { }; }
        this._onConnectCallback = callback;
    };
    /**
     * onPermission
     * @param callback
     */
    Web3Standard.prototype.onPermissionRequest = function (callback) {
        if (callback === void 0) { callback = function () { }; }
        this._onPermissionRequestCallback = callback;
    };
    /**
     * on error
     */
    Web3Standard.prototype.onError = function (callback) {
        if (callback === void 0) { callback = function () { }; }
        this._onErrorCallback = callback;
    };
    /**
     * onConnect
     */
    Web3Standard.prototype.onDisconnect = function (callback) {
        if (callback === void 0) { callback = function () { }; }
        this._onDisconnectCallback = callback;
    };
    /**
     * getProvider
     */
    Web3Standard.prototype.getProvider = function () {
        return this._provider;
    };
    return Web3Standard;
}());
exports.default = Web3Standard;
