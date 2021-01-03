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
//import ErrorCodes from './ErrorCodes'; 
var Exception_1 = __importDefault(require("./Exception"));
var Status_1 = __importDefault(require("./Status"));
require("../assets/styles/main.css");
var _window = window;
var WalletProvider = /** @class */ (function () {
    function WalletProvider(options) {
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
            cacheProvider: true,
            showLoader: true,
            debug: false
        };
        /**
         * providers
         */
        this.providerModules = {
            "web3_wallets": "EthereumProvider",
            "binance_chain_wallet": "BinanceChainProvider",
            "walletconnect": "WalletConnectProvider",
            "portis": "PortisProvider",
            "frame": "FrameProvider",
            "authereum": "AuthereumProvider",
            "walletlink": "WalletLinkProvider",
            "torus": "TorusProvider",
            "fortmatic": "FortmaticProvider"
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
            "accountsChanged",
            "chainChanged",
            "error",
            "connectError"
        ];
        this.registeredEvents = {};
        if (typeof options != 'object') {
            throw new Exception_1.default("opts_must_be_object", "Options must be an object");
            return;
        }
        this.config = Object.assign(this.config, options);
        var hasWeb3 = _window.ethereum || _window.web3;
        if (!this.config.providers.hasOwnProperty("web_wallets") && hasWeb3) {
            this.config.providers = __assign({ web3_wallets: {} }, this.config.providers);
        }
        //lets make 
        _window._debug_wallet_provider = this.config.debug;
        //process and validate enabled providers 
        this.validateEnabledProviders();
        //inject modal
        this._injectModalMarkup();
        //check for provider cache
        if (this.config.cacheProvider && this.isProviderCached()) {
            var cachedProviderName = this.getProviderCache();
            this.selectedProviderName = cachedProviderName;
        }
    } //end fun 
    /**
     * hasProviderCache
     */
    WalletProvider.prototype.isProviderCached = function () {
        var providerNameCache = this.getProviderCache();
        if (providerNameCache == null)
            return false;
        if (!this.providerModules.hasOwnProperty(providerNameCache))
            return false;
        return true;
    }; //end fun 
    /**
     * getProviderCache
     * @return string
     */
    WalletProvider.prototype.getProviderCache = function () {
        return _window.localStorage.getItem(this.providerCacheName) || null;
    }; //end 
    /**
     * save provider name in cache
     * @param string the provider name
     */
    WalletProvider.prototype.cacheProviderName = function (providerName) {
        _window.localStorage.setItem(this.providerCacheName, providerName);
    }; //end fun 
    /**
     * removeProviderCache
     */
    WalletProvider.prototype.removeProviderCache = function () {
        _window.localStorage.removeItem(this.providerCacheName);
        return true;
    };
    /**
     * process provider configs
     */
    WalletProvider.prototype.validateEnabledProviders = function () {
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
    WalletProvider.prototype.dispatchEvent = function (eventName, data) {
        var eventCallback = this.registeredEvents[eventName] || null;
        if (typeof eventCallback == 'function') {
            eventCallback(data);
        }
    };
    /**
     * show the modal
     */
    WalletProvider.prototype.showModal = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.isModalVisible) {
                            document.getElementById(this.modalId).classList.add("is_open");
                            this.isModalVisible = true;
                            this.dispatchEvent("modalOpen", this.modalId);
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
    WalletProvider.prototype.closeModal = function () {
        var el = document.getElementById(this.modalId);
        var c = el.classList;
        setTimeout(function () {
            c.remove("is_open");
            c.remove("m__closing");
        }, 4000);
        //add Zoomin anim
        c.add("m__closing");
        this.isModalVisible = false;
        this.dispatchEvent("modalClose", this.modalId);
    };
    /**
     * events
     * @param eventName
     */
    WalletProvider.prototype.on = function (eventName, callback) {
        if (callback === void 0) { callback = function () { }; }
        if (!this.eventNames.includes(eventName)) {
            throw new Error("Unknown Event " + eventName);
        }
        this.registeredEvents[eventName] = callback;
    }; //end fun
    /**
     * modalMarkup
     */
    WalletProvider.prototype._injectModalMarkup = function () {
        var _this = this;
        var modalId = this.modalId;
        var providersMarkup = "";
        Object.keys(this.config.providers).forEach(function (provider) { return __awaiter(_this, void 0, void 0, function () {
            var enabledProviderInfo, providerDescText, providerName, supportedWallets, walletsArray, _i, walletsArray_1, wallet, walletImg;
            return __generator(this, function (_a) {
                enabledProviderInfo = this.config.providers[provider];
                providerDescText = enabledProviderInfo.connect_text || "";
                providerName = enabledProviderInfo.name || null;
                if (providerName == null) {
                    switch (provider) {
                        case "walletconnect":
                            providerName = "WalletConnect";
                            break;
                        case "walletlink":
                            providerName = "WalletLink";
                            break;
                        default: providerName = provider.replace(/(\_)+/g, " ");
                    }
                }
                supportedWallets = {
                    "web3_wallets": ["MetaMask", "Brave", "Status"],
                    "walletconnect": ["Rainbow", "Trust", "Argent"],
                    "walletlink": ["Coinbase Wallet"]
                };
                walletsArray = supportedWallets[provider] || [];
                if (walletsArray.length > 0) {
                    providerDescText = '<div class="flex flex_row supported_wallets flex_wrap">';
                    for (_i = 0, walletsArray_1 = walletsArray; _i < walletsArray_1.length; _i++) {
                        wallet = walletsArray_1[_i];
                        walletImg = wallet.toLowerCase().replace(/\s+/g, "_") + "_16";
                        providerDescText += "<div class=\"flex flex_row\">\n                                                <div class=\"sub_icon " + walletImg + "_icon\"></div>\n                                                <div>" + wallet + "</div>\n                                            </div>";
                    }
                    providerDescText += "</div>";
                } //end sub icons
                providersMarkup += "\n                <a href=\"#\" data-provider=\"" + provider + "\" class=\"m__col provider_item_btn\">\n                    <div class=\"provider_item\">\n                        <div class=\"icon " + provider + "_icon\"></div>\n                        <h1 class=\"title\">" + providerName + "</h1>\n                        <div class=\"provider_info\">\n                            " + providerDescText + "\n                        </div>\n                    </div>\n                </a>\n            ";
                return [2 /*return*/];
            });
        }); }); //end for loop
        var modalMarkup = "\n            <div class=\"wallet_provider__wrapper\">\n                <div class=\"modal\" id=\"" + modalId + "\">\n                    <div class=\"m__container\">\n                        <div class=\"m__body\">\n                            <header class=\"m__header\">\n                                <h2 class=\"m__title\">\n                                    " + this.config.modalTitle + "\n                                </h2>\n                                <a type=\"button\" class=\"m__close\">\n                                    &times\n                                </a>\n                            </header>\n                            <main class=\"m__content\">\n                                <div class=\"m__row\">\n                                    " + providersMarkup + "\n                                </div>\n                                <div class=\"spinner_overlay hide\">\n                                    <div class=\"spinner_w\">\n                                        <div class=\"spinner\"></div>\n                                    </div>\n                               </div>\n                            </main>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        ";
        var modalNode = document.createElement("div");
        modalNode.innerHTML = modalMarkup;
        document.body.appendChild(modalNode);
        //handle click to close
        modalNode.querySelector(".m__close").addEventListener("click", function (e) {
            e.preventDefault();
            _this.closeModal();
        });
        /**
         * when clicked on the layer close it
         */
        if (!this.config.showLoader) {
            modalNode.querySelector(".modal").addEventListener("click", function (e) {
                if (e.target !== e.currentTarget)
                    return;
                _this.closeModal();
            });
        }
    };
    /**
     * showLoader
     */
    WalletProvider.prototype.showLoader = function () {
        if (!this.config.showLoader)
            return;
        document.querySelector(".spinner_overlay").classList.remove('hide');
    };
    /**
     * hide the loader
     */
    WalletProvider.prototype.hideLoader = function () {
        if (!this.config.showLoader)
            return;
        document.querySelector(".spinner_overlay").classList.add('hide');
    };
    /**
     * handleProviderItemClick
     */
    WalletProvider.prototype.handleProviderItemClick = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
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
    WalletProvider.prototype.handleDisableProviderItemClickEvent = function () {
        Array.from(document.querySelectorAll(".provider_item_btn")).forEach(function (el) {
            el.removeEventListener("click", function () { });
        });
    };
    /**
     * connect
     */
    WalletProvider.prototype.connect = function () {
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
    WalletProvider.prototype._proccessConnect = function (providerName) {
        return __awaiter(this, void 0, void 0, function () {
            var providerModule, providerInfo, providerInst, defaultFun, connectStatus, cacheProvider, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getProviderModule(providerName)
                        //lets  add options
                    ];
                    case 1:
                        providerModule = _a.sent();
                        providerInfo = this.config.providers[providerName] || {};
                        providerInst = new providerModule();
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
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, 6, 7]);
                        //show the loader 
                        this.showLoader();
                        //initialize 
                        return [4 /*yield*/, providerInst._initialize(providerInfo)];
                    case 3:
                        //initialize 
                        _a.sent();
                        return [4 /*yield*/, providerInst.connect()];
                    case 4:
                        connectStatus = _a.sent();
                        this.hideLoader();
                        //if success, and provider cache is enabled, lets cache the provider
                        if (connectStatus.isError()) {
                            return [2 /*return*/, Promise.resolve(connectStatus)];
                        }
                        cacheProvider = this.config.cacheProvider || true;
                        if (cacheProvider) {
                            this.cacheProviderName(providerName);
                        }
                        return [2 /*return*/, Promise.resolve(connectStatus)];
                    case 5:
                        e_1 = _a.sent();
                        if (this.config.debug) {
                            console.log("Connect Error", e_1, e_1.stack);
                        }
                        return [2 /*return*/, Status_1.default.error(e_1.message || "connect_failed")];
                    case 6:
                        this.closeModal();
                        this.hideLoader();
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        });
    }; //end fun
    /**
     * getProviderModule
     */
    WalletProvider.prototype.getProviderModule = function (providerName) {
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
    return WalletProvider;
}()); //end class
exports.default = WalletProvider;
