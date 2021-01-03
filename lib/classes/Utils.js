"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * WalletProvider 
 * @license MIT 
 * @author https://github.com/libertypie
 */
var Utils = /*#__PURE__*/function () {
  function Utils() {
    _classCallCheck(this, Utils);
  }

  _createClass(Utils, null, [{
    key: "getChainIdByRequest",
    value: function () {
      var _getChainIdByRequest = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(providerClass) {
        var _this = this;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", new Promise(function (resolve, reject) {
                  providerClass._provider.sendAsync({
                    method: 'eth_chainId'
                  }, function (error, data) {
                    if (error) {
                      _this.logError(error);

                      providerClass._onErrorCallback(error);

                      return reject(error);
                    }

                    var r = data.result;
                    if (!/^(0x)/g.test(r)) r = "0x" + r.toString(16);
                    resolve(r);
                  });
                }));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function getChainIdByRequest(_x) {
        return _getChainIdByRequest.apply(this, arguments);
      }

      return getChainIdByRequest;
    }()
  }, {
    key: "logError",
    value: function logError(error) {
      if (!window._debug_wallet_provider) return;
      console.log(error, error.stack);
    }
  }]);

  return Utils;
}();

exports["default"] = Utils;