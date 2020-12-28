/**
 * Status file
 */

 class Status {

    _type: string = "";
    _msg: string = "";
    _data: any = null;
    _code: number = null;

    buildStatus(_type: string, msg: string, data: any): Status {
        this._type = _type;
        this._msg = msg;
        this._data = data;

        return this;
    }

    isError(): boolean {
        return this._type == "error";
    }

    isSuccess(): boolean {
        return this._type == "success"; 
    }

    setCode(code: number): Status {
        this._code = code;
        return this;
    }

    getCode(): number {
        return this._code;
    }

    getData<T>(): T {
        return this._data as T;
    }

    /**
     * static methods
     * @param msg 
     * @param data 
     */

    static success(msg: string, data: any = null): Status {
        return (new Status()).buildStatus("success",msg,data)
    }

    static successData(data: any): Status {
        return (new Status()).buildStatus("success","",data)
    }

    static async successPromise(msg: string, data: any = null): Promise<Status> {
        return Promise.resolve((new Status()).buildStatus("success","",data))
    }

    static error(msg: string, data: any = null): Status {
        return (new Status()).buildStatus("error",msg,data)
    }

    static async errorPromise(msg: string, data: any = null): Promise<Status> {
        return Promise.resolve((new Status()).buildStatus("error","",data))
    }

    static info(msg: string, data: any = null): Status {
        return (new Status()).buildStatus("info",msg,data)
    }
    
}

export default Status;