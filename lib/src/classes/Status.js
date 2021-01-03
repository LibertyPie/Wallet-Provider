"use strict";
/**
 * Status file
 */
Object.defineProperty(exports, "__esModule", { value: true });
class Status {
    constructor() {
        this._type = "";
        this._msg = "";
        this._data = null;
        this._code = null;
    }
    buildStatus(_type, msg, data) {
        this._type = _type;
        this._msg = msg;
        this._data = data;
        return this;
    }
    isError() {
        return this._type == "error";
    }
    isSuccess() {
        return this._type == "success";
    }
    setCode(code) {
        this._code = code;
        return this;
    }
    getCode() {
        return this._code;
    }
    getData() {
        return this._data;
    }
    /**
     * static methods
     * @param msg
     * @param data
     */
    static success(msg, data = null) {
        return (new Status()).buildStatus("success", msg, data);
    }
    static successData(data) {
        return (new Status()).buildStatus("success", "", data);
    }
    static async successPromise(msg, data = null) {
        return Promise.resolve((new Status()).buildStatus("success", "", data));
    }
    static error(msg, data = null) {
        return (new Status()).buildStatus("error", msg, data);
    }
    static async errorPromise(msg, data = null) {
        return Promise.resolve((new Status()).buildStatus("error", "", data));
    }
    static info(msg, data = null) {
        return (new Status()).buildStatus("info", msg, data);
    }
}
exports.default = Status;
