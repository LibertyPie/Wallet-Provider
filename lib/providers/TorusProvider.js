"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Exception = _interopRequireDefault(require("../classes/Exception"));

var _Status = _interopRequireDefault(require("../classes/Status"));

var _Web3Standard2 = _interopRequireDefault(require("./Web3Standard"));

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

var TorusProvider = /*#__PURE__*/function (_Web3Standard) {
  _inherits(TorusProvider, _Web3Standard);

  var _super = _createSuper(TorusProvider);

  function TorusProvider() {
    _classCallCheck(this, TorusProvider);

    return _super.apply(this, arguments);
  }

  _createClass(TorusProvider, [{
    key: "_initialize",

    /**
     * torusInit
     */
    value: function () {
      var _initialize2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(providerInfo) {
        var providerPackage, packageInst;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                //lets do validation
                providerPackage = providerInfo["package"] || null;

                if (!(providerPackage == null)) {
                  _context.next = 3;
                  break;
                }

                throw new _Exception["default"]("package_required", "Torus package is required");

              case 3:
                _context.prev = 3;
                packageInst = new providerPackage();
                _context.next = 7;
                return packageInst.init(providerInfo.options || {});

              case 7:
                _context.next = 9;
                return packageInst.login();

              case 9:
                this.setProvider(packageInst.provider, packageInst);
                _context.next = 17;
                break;

              case 12:
                _context.prev = 12;
                _context.t0 = _context["catch"](3);

                this._onConnectErrorCallback(_context.t0);

                _Utils["default"].logError(_context.t0);

                throw _context.t0;

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[3, 12]]);
      }));

      function _initialize(_x) {
        return _initialize2.apply(this, arguments);
      }

      return _initialize;
    }()
    /**
     * disconnect
     */

  }, {
    key: "disconnect",
    value: function () {
      var _disconnect = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return this._providerPackage.logout();

              case 3:
                return _context2.abrupt("return", _Status["default"].successPromise(""));

              case 6:
                _context2.prev = 6;
                _context2.t0 = _context2["catch"](0);

                this._onErrorCallback(_context2.t0);

                _Utils["default"].logError(_context2.t0);

                return _context2.abrupt("return", _Status["default"].errorPromise("disconnection_failed"));

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 6]]);
      }));

      function disconnect() {
        return _disconnect.apply(this, arguments);
      }

      return disconnect;
    }()
  }]);

  return TorusProvider;
}(_Web3Standard2["default"]); //end class


exports["default"] = TorusProvider;