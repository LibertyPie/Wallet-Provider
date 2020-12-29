
import ErrorCodes from "./ErrorCodes";

class Exception extends Error {

    code: any; 

    constructor(name,message) {
     
    let code = ErrorCodes[name] || null;

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

export default Exception;