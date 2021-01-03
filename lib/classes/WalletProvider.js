"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Exception = _interopRequireDefault(require("./Exception"));

var _Status = _interopRequireDefault(require("./Status"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _window = window;

var WalletProvider = /*#__PURE__*/function () {
  /**
   * default config 
   */

  /**
   * providers 
   */
  //modal
  //is modal visible
  //provider cache name 
  //selected provider 
  //  events
  function WalletProvider() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, WalletProvider);

    _defineProperty(this, "config", {
      providers: {
        "web3_wallets": {}
      },
      modalClass: "",
      modalTitle: "Select Wallet",
      cacheProvider: true,
      showLoader: true,
      debug: false
    });

    _defineProperty(this, "providerModules", {
      "web3_wallets": "EthereumProvider",
      "binance_chain_wallet": "BinanceChainProvider",
      "walletconnect": "WalletConnectProvider",
      "portis": "PortisProvider",
      "frame": "FrameProvider",
      "authereum": "AuthereumProvider",
      "walletlink": "WalletLinkProvider",
      "torus": "TorusProvider",
      "fortmatic": "FortmaticProvider"
    });

    _defineProperty(this, "modalId", "__wallet__provider");

    _defineProperty(this, "isModalVisible", false);

    _defineProperty(this, "providerCacheName", "__wallet_provider_cache");

    _defineProperty(this, "selectedProviderName", null);

    _defineProperty(this, "eventNames", ["message", "modalOpen", "modalClose", "connect", "disconnect", "accountsChanged", "chainChanged", "error", "connectError"]);

    _defineProperty(this, "registeredEvents", {});

    if (_typeof(options) != 'object') {
      throw new _Exception["default"]("opts_must_be_object", "Options must be an object");
      return;
    }

    this.config = Object.assign(this.config, options);
    var hasWeb3 = _window.ethereum || _window.web3;

    if (!this.config.providers.hasOwnProperty("web_wallets") && hasWeb3) {
      this.config.providers = _objectSpread(_objectSpread({}, {
        web3_wallets: {}
      }), this.config.providers);
    } //lets make 


    _window._debug_wallet_provider = this.config.debug; //process and validate enabled providers 

    this.validateEnabledProviders(); //inject modal

    this._injectModalMarkup();

    if (!this.config.showLoader) {
      document.querySelector(".modal").addEventListener("click", function (event) {
        event.preventDefault();
        event.stopImmediatePropagation();
      });
    } //check for provider cache


    if (this.config.cacheProvider && this.isProviderCached()) {
      var cachedProviderName = this.getProviderCache();
      this.selectedProviderName = cachedProviderName;
    }
  } //end fun 

  /**
   * hasProviderCache
   */


  _createClass(WalletProvider, [{
    key: "isProviderCached",
    value: function isProviderCached() {
      var providerNameCache = this.getProviderCache();
      if (providerNameCache == null) return false;
      if (!this.providerModules.hasOwnProperty(providerNameCache)) return false;
      return true;
    } //end fun 

    /**
     * getProviderCache
     * @return string 
     */

  }, {
    key: "getProviderCache",
    value: function getProviderCache() {
      return _window.localStorage.getItem(this.providerCacheName) || null;
    } //end 

    /**
     * save provider name in cache
     * @param string the provider name 
     */

  }, {
    key: "cacheProviderName",
    value: function cacheProviderName(providerName) {
      _window.localStorage.setItem(this.providerCacheName, providerName);
    } //end fun 

    /**
     * removeProviderCache
     */

  }, {
    key: "removeProviderCache",
    value: function removeProviderCache() {
      _window.localStorage.removeItem(this.providerCacheName);

      return true;
    }
    /**
     * process provider configs
     */

  }, {
    key: "validateEnabledProviders",
    value: function validateEnabledProviders() {
      //let check enabled providers 
      var enabledProviders = this.config.providers;

      for (var _i = 0, _Object$keys = Object.keys(enabledProviders); _i < _Object$keys.length; _i++) {
        var provider = _Object$keys[_i];

        if (!this.providerModules.hasOwnProperty(provider)) {
          var exception = new _Exception["default"]("unknown_provider", "Unknown provider name ".concat(provider));
          this.dispatchEvent("error", exception);
          throw exception;
        }
      }
    } //end fun

    /**
     * trigger  onError Event 
     * @param string
     */

  }, {
    key: "dispatchEvent",
    value: function dispatchEvent(eventName, data) {
      var eventCallback = this.registeredEvents[eventName] || null;

      if (typeof eventCallback == 'function') {
        eventCallback(data);
      }
    }
    /**
     * show the modal
     */

  }, {
    key: "showModal",
    value: function () {
      var _showModal = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!this.isModalVisible) {
                  document.getElementById(this.modalId).classList.add("is_open");
                  this.isModalVisible = true;
                  this.dispatchEvent("modalOpen", this.modalId);
                }

                _context.next = 3;
                return this.handleProviderItemClick();

              case 3:
                this.selectedProviderName = _context.sent;
                this.handleDisableProviderItemClickEvent();
                return _context.abrupt("return", this.selectedProviderName);

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function showModal() {
        return _showModal.apply(this, arguments);
      }

      return showModal;
    }()
    /**
     * hide the modal
     */

  }, {
    key: "closeModal",
    value: function closeModal() {
      var el = document.getElementById(this.modalId);
      var c = el.classList;
      setTimeout(function () {
        c.remove("is_open");
        c.remove("m__closing");
      }, 4000); //add Zoomin anim

      c.add("m__closing");
      this.isModalVisible = false;
      this.dispatchEvent("modalClose", this.modalId);
    }
    /**
     * events
     * @param eventName 
     */

  }, {
    key: "on",
    value: function on(eventName) {
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

      if (!this.eventNames.includes(eventName)) {
        throw new Error("Unknown Event ".concat(eventName));
      }

      this.registeredEvents[eventName] = callback;
    } //end fun

    /**
     * modalMarkup
     */

  }, {
    key: "_injectModalMarkup",
    value: function _injectModalMarkup() {
      var _this2 = this;

      var modalId = this.modalId;
      var providersMarkup = "";
      var loadedImgStyles = "";
      Object.keys(this.config.providers).forEach( /*#__PURE__*/function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(provider) {
          var enabledProviderInfo, providerDescText, providerName, supportedWallets, walletsArray, _iterator, _step, wallet, walletImg, subImgStyle, imgStyle;

          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  enabledProviderInfo = _this2.config.providers[provider];
                  providerDescText = enabledProviderInfo.connect_text || "";
                  providerName = enabledProviderInfo.name || null;

                  if (!(providerName == null)) {
                    _context2.next = 12;
                    break;
                  }

                  _context2.t0 = provider;
                  _context2.next = _context2.t0 === "walletconnect" ? 7 : _context2.t0 === "walletlink" ? 9 : 11;
                  break;

                case 7:
                  providerName = "WalletConnect";
                  return _context2.abrupt("break", 12);

                case 9:
                  providerName = "WalletLink";
                  return _context2.abrupt("break", 12);

                case 11:
                  providerName = provider.replace(/(\_)+/g, " ");

                case 12:
                  supportedWallets = {
                    "web3_wallets": ["MetaMask", "Brave", "Status"],
                    "walletconnect": ["Rainbow", "Trust", "Argent"],
                    "walletlink": ["Coinbase Wallet"]
                  };
                  walletsArray = supportedWallets[provider] || [];

                  if (walletsArray.length > 0) {
                    providerDescText = '<div class="flex flex_row supported_wallets flex_wrap">';
                    _iterator = _createForOfIteratorHelper(walletsArray);

                    try {
                      for (_iterator.s(); !(_step = _iterator.n()).done;) {
                        wallet = _step.value;
                        walletImg = wallet.toLowerCase().replace(/\s+/g, "_") + "_16";

                        try {
                          subImgStyle = require("../assets/img/modules/" + walletImg)["default"];
                          loadedImgStyles += subImgStyle;
                          providerDescText += "<div class=\"flex flex_row\">\n                                                <div class=\"sub_icon ".concat(walletImg, "_icon\"></div>\n                                                <div>").concat(wallet, "</div>\n                                            </div>");
                        } catch (e) {
                          console.log(e);
                        }
                      }
                    } catch (err) {
                      _iterator.e(err);
                    } finally {
                      _iterator.f();
                    }

                    providerDescText += "</div>";
                  } //end sub icons


                  imgStyle = require("../assets/img/modules/" + provider)["default"];
                  loadedImgStyles += imgStyle;
                  providersMarkup += "\n                <a href=\"#\" data-provider=\"".concat(provider, "\" class=\"m__col provider_item_btn\">\n                    <div class=\"provider_item\">\n                        <div class=\"icon ").concat(provider, "_icon\"></div>\n                        <h1 class=\"title\">").concat(providerName, "</h1>\n                        <div class=\"provider_info\">\n                            ").concat(providerDescText, "\n                        </div>\n                    </div>\n                </a>\n            ");

                case 18:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }()); //end for loop

      var modalMarkup = "\n            <div class=\"wallet_provider__wrapper\">\n                <div class=\"modal\" id=\"".concat(modalId, "\">\n                    <div class=\"m__container\">\n                        <div class=\"m__body\">\n                            <header class=\"m__header\">\n                                <h2 class=\"m__title\">\n                                    ").concat(this.config.modalTitle, "\n                                </h2>\n                                <a type=\"button\" class=\"m__close\">\n                                    &times\n                                </a>\n                            </header>\n                            <main class=\"m__content\">\n                                <div class=\"m__row\">\n                                    ").concat(providersMarkup, "\n                                </div>\n                                <div class=\"spinner_wrapper hide\">\n                                    <div class=\"spinner\"></div>\n                                </div>\n                            </main>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        "); //lets check if the class is created already

      var walletProviderLoaded = document.body.dataset.__wps_loaded || "0";

      if (walletProviderLoaded != "1") {
        var mainStyle = require("../assets/styles/modules/main")["default"];

        var modalStyle = require("../assets/styles/modules/modal")["default"];

        var styleData = "".concat(mainStyle).concat(modalStyle);
        var style = document.createElement('style');
        style.innerHTML = "".concat(styleData).concat(loadedImgStyles);
        document.head.appendChild(style);
        document.body.dataset.__wps_loaded = "1";
      }

      var modalNode = document.createElement("div");
      modalNode.innerHTML = modalMarkup;
      document.body.appendChild(modalNode); //handle click to close

      modalNode.querySelector(".m__close").addEventListener("click", function (e) {
        e.preventDefault();
        console.log(10000);

        _this2.closeModal();
      });
    }
    /**
     * showLoader
     */

  }, {
    key: "showLoader",
    value: function showLoader() {
      if (!this.config.showLoader) return;
      var wpc = document.querySelector(".wallet_provider__wrapper");
      var spw = wpc.querySelector(".spinner_wrapper");
      var mc = wpc.querySelector(".m__container");
      mc.scrollTo(0, 0);
      wpc.querySelector(".m__close").classList.add("hide");
      mc.classList.add("no_scroll");
      spw.classList.remove('hide');
    }
    /**
     * hide the loader
     */

  }, {
    key: "hideLoader",
    value: function hideLoader() {
      if (!this.config.showLoader) return;
      var wpc = document.querySelector(".wallet_provider__wrapper");
      var spo = wpc.querySelector(".spinner_overlay");
      wpc.querySelector(".modal__close").classList.remove("hide");
      spo.classList.add('hide');
      wpc.querySelector(".modal__container").classList.remove("no_scroll");
    }
    /**
     * handleProviderItemClick
     */

  }, {
    key: "handleProviderItemClick",
    value: function () {
      var _handleProviderItemClick = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var _this;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _this = this;
                return _context3.abrupt("return", new Promise(function (resolve, reject) {
                  Array.from(document.querySelectorAll(".provider_item_btn")).forEach(function (el) {
                    //provider 
                    var provider = el.dataset.provider || null;
                    if (provider == null) return false;
                    el.addEventListener("click", function (e) {
                      e.preventDefault(); //return selected provider

                      resolve(provider);
                    });
                  });
                }));

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function handleProviderItemClick() {
        return _handleProviderItemClick.apply(this, arguments);
      }

      return handleProviderItemClick;
    }() //disable click event

  }, {
    key: "handleDisableProviderItemClickEvent",
    value: function handleDisableProviderItemClickEvent() {
      Array.from(document.querySelectorAll(".provider_item_btn")).forEach(function (el) {
        el.removeEventListener("click", function () {});
      });
    }
    /**
     * connect
     */

  }, {
    key: "connect",
    value: function () {
      var _connect = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var resultStatus;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(this.selectedProviderName == null)) {
                  _context4.next = 4;
                  break;
                }

                _context4.next = 3;
                return this.showModal();

              case 3:
                this.selectedProviderName = _context4.sent;

              case 4:
                _context4.next = 6;
                return this._proccessConnect(this.selectedProviderName);

              case 6:
                resultStatus = _context4.sent;
                this.selectedProviderName = null;
                this.closeModal();
                return _context4.abrupt("return", resultStatus);

              case 10:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function connect() {
        return _connect.apply(this, arguments);
      }

      return connect;
    }() //end fun

    /**
     * _proccessConnect
     */

  }, {
    key: "_proccessConnect",
    value: function () {
      var _proccessConnect2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(providerName) {
        var providerModule, providerInfo, providerInst, defaultFun, connectStatus, cacheProvider;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.getProviderModule(providerName);

              case 2:
                providerModule = _context5.sent;
                //lets  add options
                providerInfo = this.config.providers[providerName] || {};
                providerInst = new providerModule();

                defaultFun = function defaultFun() {}; //lets now register  some events 


                providerInst.onConnect(this.registeredEvents.connect || defaultFun);
                providerInst.onDisconnect(this.registeredEvents.disconnect || defaultFun); //providerInst.onPermissionRequest(this.registeredEvents.permissionRequest || defaultFun)

                providerInst.onError(this.registeredEvents.error || defaultFun);
                providerInst.onAccountsChanged(this.registeredEvents.accountChange || defaultFun);
                providerInst.onChainChanged(this.registeredEvents.chainChange || defaultFun);
                providerInst.onConnectError(this.registeredEvents.connectError || defaultFun);
                providerInst.onMessage(this.registeredEvents.message || defaultFun);
                _context5.prev = 13;
                //show the loader 
                this.showLoader(); //initialize 

                _context5.next = 17;
                return providerInst._initialize(providerInfo);

              case 17:
                _context5.next = 19;
                return providerInst.connect();

              case 19:
                connectStatus = _context5.sent;
                this.hideLoader(); //if success, and provider cache is enabled, lets cache the provider

                if (!connectStatus.isError()) {
                  _context5.next = 23;
                  break;
                }

                return _context5.abrupt("return", Promise.resolve(connectStatus));

              case 23:
                cacheProvider = this.config.cacheProvider || true;

                if (cacheProvider) {
                  this.cacheProviderName(providerName);
                }

                return _context5.abrupt("return", Promise.resolve(connectStatus));

              case 28:
                _context5.prev = 28;
                _context5.t0 = _context5["catch"](13);

                if (this.config.debug) {
                  console.log("Connect Error", _context5.t0, _context5.t0.stack);
                }

                return _context5.abrupt("return", _Status["default"].error(_context5.t0.message || "connect_failed"));

              case 32:
                _context5.prev = 32;
                this.closeModal();
                this.hideLoader();
                return _context5.finish(32);

              case 36:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[13, 28, 32, 36]]);
      }));

      function _proccessConnect(_x2) {
        return _proccessConnect2.apply(this, arguments);
      }

      return _proccessConnect;
    }() //end fun

    /**
     * getProviderModule
     */

  }, {
    key: "getProviderModule",
    value: function () {
      var _getProviderModule = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(providerName) {
        var providerModule, _err, module;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                providerModule = this.providerModules[providerName] || null;

                if (!(providerModule == null)) {
                  _context6.next = 4;
                  break;
                }

                _err = new _Exception["default"]("unknown_provider", "Unknown provider name ".concat(providerName));
                throw _err;

              case 4:
                _context6.next = 6;
                return Promise.resolve("../providers/".concat(providerModule)).then(function (s) {
                  return _interopRequireWildcard(require(s));
                });

              case 6:
                module = _context6.sent;
                return _context6.abrupt("return", module["default"]);

              case 8:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function getProviderModule(_x3) {
        return _getProviderModule.apply(this, arguments);
      }

      return getProviderModule;
    }() //end

  }]);

  return WalletProvider;
}(); //end class


exports["default"] = WalletProvider;