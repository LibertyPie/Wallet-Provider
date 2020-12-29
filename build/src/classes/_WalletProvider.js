"use strict";
/**
 * WalletProvider
 * @license MIT
 * @author https://github.com/libertypie
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var path = require("path");
var micromodal_1 = __importDefault(require("micromodal"));
var main_css_1 = __importDefault(require("../assets/styles/main.css"));
var Exception_1 = __importDefault(require("./Exception"));
var _WalletProvider = /** @class */ (function () {
    function _WalletProvider(options) {
        var _this_1 = this;
        if (options === void 0) { options = {}; }
        /**
         * default config
         */
        this.config = {
            providers: {
                "web3_wallets": {}
            },
            modalClass: "",
            modalTitle: "Select Wallet",
            cacheProvider: true
        };
        /**
         * providers
         */
        this.providerModules = {
            "web3_wallets": "EthereumProvider",
            "binance_chain_wallet": "BinanceChainProvider",
            "walletconnect": "WalletConnectProvider",
            "portis": "PortisProvider",
            "frame": "FrameProvider"
        };
        //modal
        this.modalId = "__wallet__provider";
        //is modal visible
        this.isModalVisible = false;
        //provider cache name 
        this.providerCacheName = "__wallet_provider_cache";
        //selected provider 
        this.selectedProviderName = null;
        //  events
        this.eventNames = [
            "message",
            "modalOpen",
            "modalClose",
            "connect",
            "disconnect",
            "accountChange",
            "chainChange",
            "error",
            "providerSelected",
            "permissionRequest",
            "connectError"
        ];
        this.registeredEvents = {};
        if (typeof options != 'object') {
            throw new Exception_1.default("opts_must_be_object", "Options must be an object");
            return;
        }
        this.config = Object.assign(this.config, options);
        if (!this.config.providers.hasOwnProperty("web_wallets")) {
            this.config.providers = __assign({ web3_wallets: {} }, this.config.providers);
        }
        //process and validate enabled providers 
        this.validateEnabledProviders();
        //inject modal
        this._injectModalMarkup();
        micromodal_1.default.init({
            onShow: function (modal) { return _this_1._onModalShow(modal); },
            onClose: function (modal) { return _this_1._onModalClose(modal); },
            openClass: 'is-open',
            disableScroll: true,
            disableFocus: false,
            awaitOpenAnimation: false,
            awaitCloseAnimation: false,
        });
    }
    /**
     * hasProviderCache
     */
    _WalletProvider.prototype.hasProviderCache = function () {
        var providerCache = this.getProviderCache();
        if (providerCache == null || typeof providerCache !== 'object')
            return false;
        var providerName = providerCache.provider_name || "";
        if (!this.providerModules.hasOwnProperty(providerName))
            return false;
        return true;
    }; //end fun 
    /**
     * getProviderCache
     */
    _WalletProvider.prototype.getProviderCache = function () {
        return window.localStorage.getItem(this.providerCacheName) || null;
    }; //end 
    /**
     * process provider configs
     */
    _WalletProvider.prototype.validateEnabledProviders = function () {
        //let check enabled providers 
        var enabledProviders = this.config.providers;
        for (var _i = 0, _a = Object.keys(enabledProviders); _i < _a.length; _i++) {
            var provider = _a[_i];
            if (!this.providerModules.hasOwnProperty(provider)) {
                var exception = new Exception_1.default("unknown_provider", "Unknown provider name " + provider);
                this.dispatchEvent("error", exception);
                throw exception;
            }
        }
    }; //end fun
    /**
     * trigger  onError Event
     * @param string
     */
    _WalletProvider.prototype.dispatchEvent = function (eventName, data) {
        var eventCallback = this.registeredEvents[eventName] || null;
        if (typeof eventCallback == 'function') {
            eventCallback(data);
        }
    };
    /**
     * on Modal show event
     */
    _WalletProvider.prototype._onModalShow = function (modal) {
        this.isModalVisible = true;
        this.dispatchEvent("modalOpen", modal);
    };
    /**
     * on modal close  event
     * @param any
     */
    _WalletProvider.prototype._onModalClose = function (modal) {
        this.isModalVisible = false;
        this.dispatchEvent("modalClose", modal);
    };
    /**
     * show the modal
     */
    _WalletProvider.prototype.showModal = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            var _this_1 = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.isModalVisible) {
                            micromodal_1.default.show(this.modalId, {
                                onShow: function (modal) { return _this_1._onModalShow(modal); },
                                onClose: function (modal) { return _this_1._onModalClose(modal); },
                            });
                        }
                        _a = this;
                        return [4 /*yield*/, this.handleProviderItemClick()];
                    case 1:
                        _a.selectedProviderName = _b.sent();
                        this.handleDisableProviderItemClickEvent();
                        return [2 /*return*/, this.selectedProviderName];
                }
            });
        });
    };
    /**
     * hide the modal
     */
    _WalletProvider.prototype.closeModal = function () {
        var _this_1 = this;
        micromodal_1.default.close(this.modalId, {
            onClose: function (modal) { return _this_1._onModalClose(modal); },
        });
    };
    /**
     * toggle modal
     */
    _WalletProvider.prototype.toggleModal = function () {
        if (this.isModalVisible) {
            this.hideModal();
        }
        else {
            this.showModal();
        }
    };
    /**
     * events
     * @param eventName
     */
    _WalletProvider.prototype.on = function (eventName, callback) {
        if (callback === void 0) { callback = function () { }; }
        if (!this.eventNames.includes(eventName)) {
            throw new Error("Unknown Event " + eventName);
        }
        this.registeredEvents[eventName] = callback;
        console.log(this.registeredEvents);
    };
    /**
     * modalMarkup
     */
    _WalletProvider.prototype._injectModalMarkup = function () {
        var modalId = this.modalId;
        var _this = this;
        //lets check if the class is created already
        var styleId = document.getElementById("wallet_provider__style");
        if (styleId == null) {
            var style = document.createElement('style');
            style.setAttribute("id", "wallet_provider__style");
            style.innerHTML = main_css_1.default;
            document.head.appendChild(style);
        }
        var providersMarkup = "";
        for (var _i = 0, _a = Object.keys(this.config.providers); _i < _a.length; _i++) {
            var provider = _a[_i];
            var enabledProviderInfo = this.config.providers[provider];
            var providerDescText = enabledProviderInfo.connect_text || "";
            if (provider == "web3_wallets") {
                providerDescText = "\n                    <div class=\"flex flex_row supported_wallets flex_wrap\">\n                        <div class=\"flex flex_row\">\n                            <div class=\"sub_icon metamask_16\"></div>\n                            <div>MetaMask</div>\n                        </div>\n                        <div class=\"flex flex_row\">\n                            <div class=\"sub_icon brave_16\"></div>\n                            <div>Brave</div>\n                        </div>\n                        <div class=\"flex flex_row\">\n                            <div class=\"sub_icon trustwallet_16\"></div>\n                            <div>Trust Wallet</div>\n                        </div>\n                    </div>\n                ";
            }
            providersMarkup += "\n                <a href=\"#\" data-provider=\"" + provider + "\" class=\"m__col provider_item_btn\">\n                    <div class=\"provider_item\">\n                        <div class=\"icon " + provider + "_icon\"></div>\n                        <h1 class=\"title\">" + provider.replace(/(\_)+/g, " ") + "</h1>\n                        <div class=\"provider_info\">\n                            " + providerDescText + "\n                        </div>\n                    </div>\n                </a>\n            ";
        } //end for loop
        var modalMarkup = "\n            <div class=\"wallet_provider__wrapper\">\n                <div class=\"modal micromodal-slide\" id=\"" + modalId + "\" class=\"modal\" aria-hidden=\"true\">\n                    <div class=\"modal__overlay\" tabindex=\"-1\" data-micromodal-close>\n                        <div class=\"modal__container\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"" + modalId + "-title\">\n                            <header class=\"modal__header\">\n                                <h2 class=\"modal__title\" id=\"" + modalId + "-title\">\n                                    " + this.config.modalTitle + "\n                                </h2>\n                                <button class=\"modal__close\" aria-label=\"Close modal\" data-micromodal-close></button>\n                            </header>\n                            <main class=\"modal__content\" id=\"" + modalId + "-content\">\n                              <div class=\"m__row\">\n                                " + providersMarkup + "\n                              </div>\n                            </main>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        ";
        var modalNode = document.createElement("div");
        modalNode.innerHTML = modalMarkup;
        document.body.appendChild(modalNode);
    };
    /**
     * handleProviderItemClick
     */
    _WalletProvider.prototype.handleProviderItemClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this;
            return __generator(this, function (_a) {
                _this = this;
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        Array.from(document.querySelectorAll(".provider_item_btn")).forEach(function (el) {
                            //provider 
                            var provider = el.dataset.provider || null;
                            if (provider == null)
                                return false;
                            el.addEventListener("click", function (e) {
                                e.preventDefault();
                                //return selected provider
                                resolve(provider);
                            });
                        });
                    })];
            });
        });
    };
    //disable click event
    _WalletProvider.prototype.handleDisableProviderItemClickEvent = function () {
        Array.from(document.querySelectorAll(".provider_item_btn")).forEach(function (el) {
            el.removeEventListener("click", function () { });
        });
    };
    /**
     * connect
     */
    _WalletProvider.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, resultStatus;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(this.selectedProviderName == null)) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, this.showModal()];
                    case 1:
                        _a.selectedProviderName = _b.sent();
                        _b.label = 2;
                    case 2: return [4 /*yield*/, this._proccessConnect(this.selectedProviderName)];
                    case 3:
                        resultStatus = _b.sent();
                        this.selectedProviderName = null;
                        this.closeModal();
                        return [2 /*return*/, resultStatus];
                }
            });
        });
    }; //end fun
    /**
     * _proccessConnect
     */
    _WalletProvider.prototype._proccessConnect = function (providerName) {
        return __awaiter(this, void 0, void 0, function () {
            var providerModule, providerOpts, providerInst, defaultFun;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getProviderModule(providerName)
                        //lets  add options
                    ];
                    case 1:
                        providerModule = _a.sent();
                        providerOpts = this.config.providers[providerName] || {};
                        providerInst = new providerModule(providerOpts);
                        defaultFun = function () { };
                        //lets now register  some events 
                        providerInst.onConnect(this.registeredEvents.connect || defaultFun);
                        providerInst.onDisconnect(this.registeredEvents.disconnect || defaultFun);
                        //providerInst.onPermissionRequest(this.registeredEvents.permissionRequest || defaultFun)
                        providerInst.onError(this.registeredEvents.error || defaultFun);
                        providerInst.onAccountsChanged(this.registeredEvents.accountChange || defaultFun);
                        providerInst.onChainChanged(this.registeredEvents.chainChange || defaultFun);
                        providerInst.onConnectError(this.registeredEvents.connectError || defaultFun);
                        providerInst.onMessage(this.registeredEvents.message || defaultFun);
                        return [2 /*return*/, providerInst.connect()];
                }
            });
        });
    }; //end fun
    /**
     * getProviderModule
     */
    _WalletProvider.prototype.getProviderModule = function (providerName) {
        return __awaiter(this, void 0, void 0, function () {
            var providerModule, err, module;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        providerModule = this.providerModules[providerName] || null;
                        if (providerModule == null) {
                            err = new Exception_1.default("unknown_provider", "Unknown provider name " + providerName);
                            throw err;
                        }
                        return [4 /*yield*/, Promise.resolve().then(function () { return __importStar(require("../providers/" + providerModule)); })];
                    case 1:
                        module = _a.sent();
                        return [2 /*return*/, module.default];
                }
            });
        });
    }; //end
    return _WalletProvider;
}());
exports.default = _WalletProvider;
