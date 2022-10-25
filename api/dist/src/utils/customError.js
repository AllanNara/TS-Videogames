"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
// Class for handle error catching
class CustomError {
    constructor(message, status = 500, additionalInfo = {}) {
        this.message = message;
        this.status = status;
        this.additionalInfo = additionalInfo;
    }
}
exports.CustomError = CustomError;
// export default CustomError;
