"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ErrorCodes_1 = __importDefault(require("./ErrorCodes"));
var Exception = /** @class */ (function (_super) {
    __extends(Exception, _super);
    function Exception(name, message) {
        var _this = this;
        var code = ErrorCodes_1.default[name] || null;
        var errorMsgFull = message ? name + ": " + message : code;
        _this = _super.call(this, errorMsgFull) || this;
        _this.name = name;
        _this.code = code;
        _this.message = errorMsgFull;
        return _this;
    }
    Exception.prototype.toString = function () {
        return this.message;
    };
    return Exception;
}(Error));
exports.default = Exception;
