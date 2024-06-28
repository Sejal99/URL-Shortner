"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function restrictTo(roles) {
    if (roles === void 0) { roles = []; }
    return function (req, res, next) {
        if (!req.headers["role"]) {
            return res.status(401).json('unauthorized user');
        }
        var role = req.headers["role"];
        if (!roles.includes(role)) {
            return res.status(401).json('User not authorize to acess page');
        }
        return next();
    };
}
exports.default = restrictTo;
