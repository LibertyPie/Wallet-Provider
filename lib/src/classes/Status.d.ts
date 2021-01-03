/**
 * Status file
 */
declare class Status {
    _type: string;
    _msg: string;
    _data: any;
    _code: number;
    buildStatus(_type: string, msg: string, data: any): Status;
    isError(): boolean;
    isSuccess(): boolean;
    setCode(code: number): Status;
    getCode(): number;
    getData<T>(): T;
    /**
     * static methods
     * @param msg
     * @param data
     */
    static success(msg: string, data?: any): Status;
    static successData(data: any): Status;
    static successPromise(msg: string, data?: any): Promise<Status>;
    static error(msg: string, data?: any): Status;
    static errorPromise(msg: string, data?: any): Promise<Status>;
    static info(msg: string, data?: any): Status;
}
export default Status;
