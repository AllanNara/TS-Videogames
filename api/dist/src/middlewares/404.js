"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function pageNotFound(req, res, _) {
    let page404;
    page404 = req.params[0].replace("/api", "");
    let msg;
    msg = "Sorry, and error has occurred, Requested page not found!";
    res.status(404).send(`<h2>404 NOT FOUND</h2> <p>${msg}</p> <small>"${page404}"</small>`);
}
;
exports.default = pageNotFound;
