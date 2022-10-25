"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const customError_1 = require("../utils/customError");
function handleError(err, req, res, next) {
    let message;
    message = err.message || 'Oh no, this is embarrasing. We are having troubles my friend';
    let status;
    status = (err instanceof customError_1.CustomError) ? err.status : 500;
    console.error(err);
    res.status(status).send(message);
}
;
exports.default = handleError;
