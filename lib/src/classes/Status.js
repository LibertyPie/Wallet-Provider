"use strict";
/**
 * Status file
 */
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
    Status.prototype.getData = function () {
        return this._data;
    };
    /**
     * static methods
     * @param msg
     * @param data
     */
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
