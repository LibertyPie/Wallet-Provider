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
var Status_1 = __importDefault(require("../classes/Status"));
var Web3Standard_1 = __importDefault(require("./Web3Standard"));
var TorusProvider = /** @class */ (function (_super) {
    __extends(TorusProvider, _super);
    function TorusProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * torusInit
     */
    TorusProvider.prototype._initialize = function (providerInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var providerPackage, packageInst, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        providerPackage = providerInfo.package || null;
                        if (providerPackage == null) {
                            throw new Exception_1.default("package_required", "Torus package is required");
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        packageInst = new providerPackage();
                        return [4 /*yield*/, packageInst.init(providerInfo.options || {})];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, packageInst.login()];
                    case 3:
                        _a.sent();
                        this.setProvider(packageInst.provider, packageInst);
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        this._onConnectErrorCallback(e_1);
                        throw e_1;
                    case 5:
                        //add request method to make it act as metamask api
                        this._provider.__proto__.request = this._provider.sendAsync;
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * getChainId
     */
    TorusProvider.prototype.getChainId = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = this;
                        _b = "0x";
                        _c = parseInt;
                        return [4 /*yield*/, _super.prototype.getChainId.call(this)];
                    case 1:
                        _a.chainId = _b + _c.apply(void 0, [(_d.sent())]).toString(16);
                        return [2 /*return*/, Promise.resolve(this.chainId)];
                }
            });
        });
    };
    /**
     * disconnect
     */
    TorusProvider.prototype.disconnect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this._providerPackage.logout()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, Status_1.default.successPromise("")];
                    case 2:
                        e_2 = _a.sent();
                        this._onErrorCallback(e_2);
                        return [2 /*return*/, Status_1.default.errorPromise("disconnection_failed")];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return TorusProvider;
}(Web3Standard_1.default)); //end class
exports.default = TorusProvider;
