"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
function handleError(err, _, res) {
    let message;
    message = err.message || 'Oh no, this is embarrasing. We are having troubles my friend';
    let status;
    status = (err instanceof types_1.CustomError) ? err.status : 500;
    console.error(err);
    res.status(status).send(message);
    return;
}
;
exports.default = handleError;
