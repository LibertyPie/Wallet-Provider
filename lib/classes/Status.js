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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Status file
 */
var Status = /*#__PURE__*/function () {
  function Status() {
    _classCallCheck(this, Status);

    _defineProperty(this, "_type", "");

    _defineProperty(this, "_msg", "");

    _defineProperty(this, "_data", null);

    _defineProperty(this, "_code", null);
  }

  _createClass(Status, [{
    key: "buildStatus",
    value: function buildStatus(_type, msg, data) {
      this._type = _type;
      this._msg = msg;
      this._data = data;
      return this;
    }
  }, {
    key: "isError",
    value: function isError() {
      return this._type == "error";
    }
  }, {
    key: "isSuccess",
    value: function isSuccess() {
      return this._type == "success";
    }
  }, {
    key: "setCode",
    value: function setCode(code) {
      this._code = code;
      return this;
    }
  }, {
    key: "getCode",
    value: function getCode() {
      return this._code;
    }
  }, {
    key: "getData",
    value: function getData() {
      return this._data;
    }
    /**
     * static methods
     * @param msg 
     * @param data 
     */

  }], [{
    key: "success",
    value: function success(msg) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      return new Status().buildStatus("success", msg, data);
    }
  }, {
    key: "successData",
    value: function successData(data) {
      return new Status().buildStatus("success", "", data);
    }
  }, {
    key: "successPromise",
    value: function () {
      var _successPromise = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(msg) {
        var data,
            _args = arguments;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                data = _args.length > 1 && _args[1] !== undefined ? _args[1] : null;
                return _context.abrupt("return", Promise.resolve(new Status().buildStatus("success", "", data)));

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function successPromise(_x) {
        return _successPromise.apply(this, arguments);
      }

      return successPromise;
    }()
  }, {
    key: "error",
    value: function error(msg) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      return new Status().buildStatus("error", msg, data);
    }
  }, {
    key: "errorPromise",
    value: function () {
      var _errorPromise = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(msg) {
        var data,
            _args2 = arguments;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                data = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : null;
                return _context2.abrupt("return", Promise.resolve(new Status().buildStatus("error", "", data)));

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function errorPromise(_x2) {
        return _errorPromise.apply(this, arguments);
      }

      return errorPromise;
    }()
  }, {
    key: "info",
    value: function info(msg) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      return new Status().buildStatus("info", msg, data);
    }
  }]);

  return Status;
}();

var _default = Status;
exports["default"] = _default;