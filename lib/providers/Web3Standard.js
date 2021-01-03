"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ErrorCodes = _interopRequireDefault(require("../classes/ErrorCodes"));

var _Status = _interopRequireDefault(require("../classes/Status"));

var _ProviderEventRegistry = _interopRequireDefault(require("../classes/ProviderEventRegistry"));

var _Exception = _interopRequireDefault(require("../classes/Exception"));

var _Utils = _interopRequireDefault(require("../classes/Utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Web3Standard = /*#__PURE__*/function (_ProviderEventRegistr) {
  _inherits(Web3Standard, _ProviderEventRegistr);

  var _super = _createSuper(Web3Standard);

  /**
   * isOnconnectEventTriggered
   * This will track if onconnect event was called or not, because on page
   * reopen, we will need to retrigger the event
   * this will prevent multiple events
   */
  function Web3Standard() {
    var _this;

    _classCallCheck(this, Web3Standard);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "_provider", null);

    _defineProperty(_assertThisInitialized(_this), "_web3", void 0);

    _defineProperty(_assertThisInitialized(_this), "chainId", null);

    _defineProperty(_assertThisInitialized(_this), "isOnconnectEventTriggered", false);

    _defineProperty(_assertThisInitialized(_this), "_accounts", []);

    _defineProperty(_assertThisInitialized(_this), "_providerPackage", null);

    return _this;
  } //end fun

  /**
   * _initialize
   */


  _createClass(Web3Standard, [{
    key: "_initialize",
    value: function () {
      var _initialize2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(providerInfo) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                throw new Error("Kindly set the provider from the provider's class");

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function _initialize(_x) {
        return _initialize2.apply(this, arguments);
      }

      return _initialize;
    }()
    /**
     * set up provider 
     * @param any provider 
     * @param any package Instance
     */

  }, {
    key: "setProvider",
    value: function () {
      var _setProvider = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(provider) {
        var pkgInstance,
            _args2 = arguments;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                pkgInstance = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : null;
                this._provider = provider;
                this._providerPackage = pkgInstance;

                if (!(typeof this._provider == 'undefined')) {
                  _context2.next = 5;
                  break;
                }

                throw new _Exception["default"]("undefined_provider", "Provider is required");

              case 5:
                this._provider.autoRefreshOnNetworkChange = false;

                if (pkgInstance != null) {
                  this._provider.__proto__.providerPackage = pkgInstance;
                }

                this.handlerEventLiteners();

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function setProvider(_x2) {
        return _setProvider.apply(this, arguments);
      }

      return setProvider;
    }() //end fun

    /**
     * handleEventListeners
     */

  }, {
    key: "handlerEventLiteners",
    value: function handlerEventLiteners() {
      var _this2 = this;

      //on connect
      this._provider.on('connect', /*#__PURE__*/function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(chainIdObj) {
          var accounts;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  if (_this2.isOnconnectEventTriggered) {
                    _context3.next = 5;
                    break;
                  }

                  _context3.next = 3;
                  return _this2.getAccounts();

                case 3:
                  accounts = _context3.sent;

                  _this2._onConnectCallback({
                    chainId: chainIdObj.chainId,
                    account: accounts[0],
                    provider: _this2._provider
                  });

                case 5:
                  _this2.isOnconnectEventTriggered = true;

                case 6:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3);
        }));

        return function (_x3) {
          return _ref.apply(this, arguments);
        };
      }());
      /**
       * disconnect
       */


      this._provider.on('disconnect', function (err) {
        _this2._onDisconnectCallback(err);
      });

      this._provider.on('error', function (error) {
        _this2._onErrorCallback(error);
      });

      this._provider.on('chainChanged', /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(chainId) {
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.next = 2;
                  return _this2.getAccounts();

                case 2:
                  _this2._accounts = _context4.sent;

                  _this2._onChainChangedCallback(chainId);

                case 4:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4);
        }));

        return function (_x4) {
          return _ref2.apply(this, arguments);
        };
      }());

      this._provider.on('accountsChanged', /*#__PURE__*/function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(accounts) {
          return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  _this2._accounts = accounts;

                  _this2._onAccountsChangedCallback(accounts);

                case 2:
                case "end":
                  return _context5.stop();
              }
            }
          }, _callee5);
        }));

        return function (_x5) {
          return _ref3.apply(this, arguments);
        };
      }());

      this._provider.on('message', function (message) {
        _this2._onMessageCallback(message);
      });
    }
    /**
     * wether the provider is supported in the browser
     */

  }, {
    key: "isSupported",
    value: function isSupported() {
      return typeof this._provider !== 'undefined';
    }
    /**
     * connect
     */

  }, {
    key: "connect",
    value: function () {
      var _connect = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var accounts, account, resultObj;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (this.isSupported()) {
                  _context6.next = 2;
                  break;
                }

                return _context6.abrupt("return", _Status["default"].error("wallet_not_found").setCode(_ErrorCodes["default"].wallet_not_found));

              case 2:
                _context6.prev = 2;

                if (!(typeof this._provider["enable"] == "function")) {
                  _context6.next = 9;
                  break;
                }

                _context6.next = 6;
                return this._provider.enable();

              case 6:
                this._accounts = _context6.sent;
                _context6.next = 12;
                break;

              case 9:
                _context6.next = 11;
                return this.getAccounts();

              case 11:
                this._accounts = _context6.sent;

              case 12:
                account = this._accounts[0];
                _context6.t0 = account;
                _context6.next = 16;
                return this.getChainId();

              case 16:
                _context6.t1 = _context6.sent;
                _context6.t2 = this._provider;
                resultObj = {
                  account: _context6.t0,
                  chainId: _context6.t1,
                  provider: _context6.t2
                };
                console.log(resultObj);

                if (!this.isOnconnectEventTriggered) {
                  this._onConnectCallback(resultObj);

                  this.isOnconnectEventTriggered = true;
                }

                return _context6.abrupt("return", _Status["default"].successPromise("", resultObj));

              case 24:
                _context6.prev = 24;
                _context6.t3 = _context6["catch"](2);

                this._onConnectErrorCallback(_context6.t3);

                return _context6.abrupt("return", Promise.resolve(_Status["default"].error(_context6.t3.message).setCode(_context6.t3.code)));

              case 28:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[2, 24]]);
      }));

      function connect() {
        return _connect.apply(this, arguments);
      }

      return connect;
    }()
    /**
     * getChainId
     */

  }, {
    key: "getChainId",
    value: function () {
      var _getChainId = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return _Utils["default"].getChainIdByRequest(this);

              case 2:
                this.chainId = _context7.sent;
                return _context7.abrupt("return", this.chainId);

              case 4:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function getChainId() {
        return _getChainId.apply(this, arguments);
      }

      return getChainId;
    }()
    /**
     * getAccounts
     */

  }, {
    key: "getAccounts",
    value: function () {
      var _getAccounts = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        var _this3 = this;

        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                return _context8.abrupt("return", new Promise(function (resolve, reject) {
                  _this3._provider.sendAsync({
                    method: 'eth_requestAccounts'
                  }, function (error, data) {
                    console.log(data);

                    if (error != null) {
                      _this3._onErrorCallback(error);

                      _Utils["default"].logError(error);

                      return reject(error);
                    }

                    resolve(data.result);
                  });
                }));

              case 1:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      function getAccounts() {
        return _getAccounts.apply(this, arguments);
      }

      return getAccounts;
    }() //end fun 

    /**
     * isConnected
     */

  }, {
    key: "isConnected",
    value: function isConnected() {
      return this._provider.connected || this._provider.isConnected();
    }
    /**
     * disconnect
     * @param callback 
     */

  }, {
    key: "disconnect",
    value: function () {
      var _disconnect = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                this._provider.disconnect();

                this._onDisconnectCallback();

                return _context9.abrupt("return", _Status["default"].successPromise(""));

              case 3:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function disconnect() {
        return _disconnect.apply(this, arguments);
      }

      return disconnect;
    }()
    /**
     * onConnect
     */

  }, {
    key: "onConnect",
    value: function onConnect() {
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      this._onConnectCallback = callback;
    }
    /** 
     * getProvider
     */

  }, {
    key: "getProvider",
    value: function getProvider() {
      return this._provider;
    }
  }]);

  return Web3Standard;
}(_ProviderEventRegistry["default"]);

var _default = Web3Standard;
exports["default"] = _default;