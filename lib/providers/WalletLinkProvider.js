"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Exception = _interopRequireDefault(require("../classes/Exception"));

var _PlatformWallets3 = _interopRequireDefault(require("./_PlatformWallets"));

var _Status = _interopRequireDefault(require("../classes/Status"));

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

var _window = window;

var WalletLinkProvider = /*#__PURE__*/function (_PlatformWallets2) {
  _inherits(WalletLinkProvider, _PlatformWallets2);

  var _super = _createSuper(WalletLinkProvider);

  function WalletLinkProvider() {
    _classCallCheck(this, WalletLinkProvider);

    return _super.apply(this, arguments);
  }

  _createClass(WalletLinkProvider, [{
    key: "_initialize",
    value: function () {
      var _initialize2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(providerInfo) {
        var providerPackage, packageOpts, appConfig, network, pkgInstance, provider;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                //lets do validation
                providerPackage = providerInfo["package"] || null;

                if (!(typeof providerPackage == null)) {
                  _context.next = 3;
                  break;
                }

                throw new _Exception["default"]("package_required", "WalletLink package is required");

              case 3:
                packageOpts = providerInfo.options || {}; //app config

                appConfig = packageOpts.app || {};
                network = packageOpts.network || {};
                _context.prev = 6;
                pkgInstance = new providerPackage(appConfig);
                provider = pkgInstance.makeWeb3Provider(network.rpc, network.chainId); //provider is same as package

                this.setProvider(provider, pkgInstance);
                _context.next = 16;
                break;

              case 12:
                _context.prev = 12;
                _context.t0 = _context["catch"](6);

                this._onConnectErrorCallback(_context.t0);

                throw _context.t0;

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[6, 12]]);
      }));

      function _initialize(_x) {
        return _initialize2.apply(this, arguments);
      }

      return _initialize;
    }()
  }, {
    key: "getChainId",
    value: function () {
      var _getChainId = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", "");

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function getChainId() {
        return _getChainId.apply(this, arguments);
      }

      return getChainId;
    }()
    /**
     * disconnect
     */

  }, {
    key: "disconnect",
    value: function () {
      var _disconnect = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;

                this._providerPackage.disconnect();

                this._provider.close();

                this._onDisconnectCallback();

                return _context3.abrupt("return", _Status["default"].successPromise(""));

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3["catch"](0);

                this._onErrorCallback(_context3.t0);

                _Utils["default"].logError(_context3.t0);

                return _context3.abrupt("return", _Status["default"].errorPromise("disconnection_failed", _context3.t0));

              case 12:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 7]]);
      }));

      function disconnect() {
        return _disconnect.apply(this, arguments);
      }

      return disconnect;
    }()
  }]);

  return WalletLinkProvider;
}(_PlatformWallets3["default"]);

exports["default"] = WalletLinkProvider;