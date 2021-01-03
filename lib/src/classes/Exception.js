"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorCodes_1 = __importDefault(require("./ErrorCodes"));
class Exception extends Error {
    constructor(name, message) {
        let code = ErrorCodes_1.default[name] || null;
        const errorMsgFull = message ? `${name}: ${message}` : code;
        super(errorMsgFull);
        this.name = name;
        this.code = code;
        this.message = errorMsgFull;
    }
    toString() {
        return this.message;
    }
}
exports.default = Exception;
