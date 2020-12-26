(function () {
    var defines = {};
    var entry = [null];
    function define(name, dependencies, factory) {
        defines[name] = { dependencies: dependencies, factory: factory };
        entry[0] = name;
    }
    define("require", ["exports"], function (exports) {
        Object.defineProperty(exports, "__cjsModule", { value: true });
        Object.defineProperty(exports, "default", { value: function (name) { return resolve(name); } });
    });
    var __importDefault = (this && this.__importDefault) || function (mod) {
        return (mod && mod.__esModule) ? mod : { "default": mod };
    };
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
    /**
     * WalletProvider
     * @license MIT
     * @author https://github.com/libertypie
     */
    define("src/classes/WalletProvider", ["require", "exports", "micromodal", "../assets/styles/main.css"], function (require, exports, micromodal_1, main_css_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        micromodal_1 = __importDefault(micromodal_1);
        main_css_1 = __importDefault(main_css_1);
        var WalletProviderCore = /** @class */ (function () {
            function WalletProviderCore(options) {
                if (options === void 0) { options = {}; }
                /**
                 * default config
                 */
                this.config = {
                    providers: ["ethereum_provider"],
                    modalClass: "",
                    modalTitle: "Select Provider"
                };
                //modal
                this.modalId = "";
                //is modal visible
                this.isModalVisible = false;
                //  events
                this.eventNames = ["modalOpen", "modalClose", "connect", "disconnect"];
                this.registeredEvents = {};
                if (typeof options != 'object') {
                    throw new Error("options_must_be_object");
                }
                this.config = Object.assign(this.config, options);
                if (!this.config.providers.includes("ethereum_provider")) {
                    this.config.providers.push("ethereum_provider");
                }
                this.modalId = "modal-1";
                //lets insert the markup
                this._injectModalMarkup(this.modalId);
                micromodal_1.default.init({
                    onShow: this._onModalShow,
                    onClose: this._onModalClose,
                    //openTrigger: 'data-wallet-provider-open', 
                    //closeTrigger: 'data-wallet-provider-close', 
                    openClass: 'is-open',
                    disableScroll: true,
                    disableFocus: false,
                    awaitOpenAnimation: false,
                    awaitCloseAnimation: false,
                    debugMode: true
                });
            }
            /**
             * show, shows the
             * @param modal
             */
            /**
             * on Modal show event
             */
            WalletProviderCore.prototype._onModalShow = function (modal) {
                alert(10000);
                this.isModalVisible = true;
                var eventCallback = this.registeredEvents.onModalOpen || null;
                if (typeof eventCallback == 'function') {
                    eventCallback(modal);
                }
            };
            /**
             * on modal close  event
             * @param any
             */
            WalletProviderCore.prototype._onModalClose = function (modal) {
                this.isModalVisible = false;
                var eventCallback = this.registeredEvents.onModalClose || null;
                if (typeof eventCallback == 'function') {
                    eventCallback(modal);
                }
            };
            /**
             * showModal
             */
            WalletProviderCore.prototype.showModal = function () {
                micromodal_1.default.show(this.modalId);
            };
            WalletProviderCore.prototype.hideModal = function () {
                micromodal_1.default.close(this.modalId);
            };
            /**
             * events
             * @param eventName
             */
            WalletProviderCore.prototype.on = function (eventName, callback) {
                if (callback === void 0) { callback = function () { }; }
                if (!this.eventNames.includes(eventName)) {
                    throw new Error("Unknown Event " + eventName);
                }
                this.registeredEvents.eventName = callback;
            };
            /**
             * modalMarkup
             */
            WalletProviderCore.prototype._injectModalMarkup = function (modalId) {
                //lets check if the class is created already
                var styleId = document.getElementById("wallet_provider__style");
                if (styleId == null) {
                    var style = document.createElement('style');
                    style.setAttribute("id", "wallet_provider__style");
                    style.innerHTML = main_css_1.default;
                    document.head.appendChild(style);
                }
                var modalMarkup = "\n                <div id=\"" + modalId + "\" aria-hidden=\"true\">\n                    <div tabindex=\"-1\" data-micromodal-close>\n                        <div role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"" + modalId + "-title\" >\n                            <header>\n                                <h2 id=\"" + modalId + "-title\">\n                                    " + this.config.modalTitle + "\n                                </h2>\n                                <button aria-label=\"Close modal\" data-micromodal-close></button>\n                            </header>\n                            \n                            <div id=\"" + modalId + "-content\">\n                                Modal Content\n                            </div>\n                \n                        </div>\n                    </div>\n                </div>\n        ";
                var modalNode = document.createElement("div");
                modalNode.innerHTML = modalMarkup;
                document.body.appendChild(modalNode);
            };
            WalletProviderCore.prototype.connect = function () {
            };
            return WalletProviderCore;
        }());
        exports.default = WalletProviderCore;
    });
    /**
     * WalletProvider
     * @license MIT
     * @author https://github.com/libertypie
     */
    define("src/index", ["require", "exports", "src/classes/WalletProvider"], function (require, exports, WalletProvider_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        WalletProvider_1 = __importDefault(WalletProvider_1);
        var WalletProvider = /** @class */ (function (_super) {
            __extends(WalletProvider, _super);
            function WalletProvider() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return WalletProvider;
        }(WalletProvider_1.default));
        exports.default = WalletProvider;
    });
    define("src/classes/NetworkCodes", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        /**
         * LibertyPie
         * @license
         */
        exports.default = {
            "wallet_not_found": 1,
            "connect_request_rejected_by_user": 4001,
            "request_already_pending": -32002
        };
    });
    /**
     * Status file
     */
    define("src/classes/Status", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        var Status = /** @class */ (function () {
            function Status() {
                this._type = "";
                this._msg = "";
                this._data = null;
                this._code = null;
            }
            Status.prototype.buildStatus = function (_type, msg, data) {
                this._type = _type;
                this._msg = msg;
                this._data = data;
                return this;
            };
            Status.prototype.isError = function () {
                return this._type == "error";
            };
            Status.prototype.isSuccess = function () {
                return this._type == "success";
            };
            Status.prototype.setCode = function (code) {
                this._code = code;
                return this;
            };
            Status.prototype.getCode = function () {
                return this._code;
            };
            Status.success = function (msg, data) {
                if (data === void 0) { data = null; }
                return (new Status()).buildStatus("success", msg, data);
            };
            Status.successData = function (data) {
                return (new Status()).buildStatus("success", "", data);
            };
            Status.successPromise = function (msg, data) {
                if (data === void 0) { data = null; }
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, Promise.resolve((new Status()).buildStatus("success", "", data))];
                    });
                });
            };
            Status.error = function (msg, data) {
                if (data === void 0) { data = null; }
                return (new Status()).buildStatus("error", msg, data);
            };
            Status.errorPromise = function (msg, data) {
                if (data === void 0) { data = null; }
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, Promise.resolve((new Status()).buildStatus("error", "", data))];
                    });
                });
            };
            Status.info = function (msg, data) {
                if (data === void 0) { data = null; }
                return (new Status()).buildStatus("info", msg, data);
            };
            return Status;
        }());
        exports.default = Status;
    });
    /**
     * WalletProvider
     * @license MIT
     * @author https://github.com/libertypie
     */
    define("src/interface/Provider", ["require", "exports"], function (require, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
    });
    /**
     * WalletProvider
     * @license MIT
     * @author https://github.com/libertypie
     */
    define("src/providers/Web3Standard", ["require", "exports", "src/classes/NetworkCodes", "src/classes/Status"], function (require, exports, NetworkCodes_1, Status_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        NetworkCodes_1 = __importDefault(NetworkCodes_1);
        Status_1 = __importDefault(Status_1);
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
                                            .setCode(NetworkCodes_1.default.wallet_not_found)];
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
    });
    /**
     * WalletProvider
     * @license MIT
     * @author https://github.com/libertypie
     */
    define("src/providers/BinanceChainProvider", ["require", "exports", "src/providers/Web3Standard"], function (require, exports, Web3Standard_1) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        Web3Standard_1 = __importDefault(Web3Standard_1);
        var EthereumProvider = /** @class */ (function (_super) {
            __extends(EthereumProvider, _super);
            function EthereumProvider() {
                return _super.call(this, window.BinanceChain) || this;
            }
            return EthereumProvider;
        }(Web3Standard_1.default));
    });
    /**
     * WalletProvider
     * @license MIT
     * @author https://github.com/libertypie
     */
    define("src/providers/EthereumProvider", ["require", "exports", "src/providers/Web3Standard"], function (require, exports, Web3Standard_2) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: true });
        Web3Standard_2 = __importDefault(Web3Standard_2);
        var EthereumProvider = /** @class */ (function (_super) {
            __extends(EthereumProvider, _super);
            function EthereumProvider() {
                return _super.call(this, (window.ethereum || window.web3)) || this;
            }
            return EthereumProvider;
        }(Web3Standard_2.default));
    });
    
    'marker:resolver';

    function get_define(name) {
        if (defines[name]) {
            return defines[name];
        }
        else if (defines[name + '/index']) {
            return defines[name + '/index'];
        }
        else {
            var dependencies = ['exports'];
            var factory = function (exports) {
                try {
                    Object.defineProperty(exports, "__cjsModule", { value: true });
                    Object.defineProperty(exports, "default", { value: require(name) });
                }
                catch (_a) {
                    throw Error(['module "', name, '" not found.'].join(''));
                }
            };
            return { dependencies: dependencies, factory: factory };
        }
    }
    var instances = {};
    function resolve(name) {
        if (instances[name]) {
            return instances[name];
        }
        if (name === 'exports') {
            return {};
        }
        var define = get_define(name);
        instances[name] = {};
        var dependencies = define.dependencies.map(function (name) { return resolve(name); });
        define.factory.apply(define, dependencies);
        var exports = dependencies[define.dependencies.indexOf('exports')];
        instances[name] = (exports['__cjsModule']) ? exports.default : exports;
        return instances[name];
    }
    if (entry[0] !== null) {
        return resolve(entry[0]);
    }
})();