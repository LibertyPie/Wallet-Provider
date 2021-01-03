declare class Exception extends Error {
    code: any;
    constructor(name: any, message: any);
    toString(): string;
}
export default Exception;
