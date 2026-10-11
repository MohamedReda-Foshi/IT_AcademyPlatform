"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.role = void 0;
const role = (...allowedRoles) => {
    return (req, res, next) => {
        var _a;
        const userRole = (_a = req.user) === null || _a === void 0 ? void 0 : _a.role;
        if (!userRole || !allowedRoles.includes(userRole)) {
            res.status(403).json({ message: "Access denied" });
            return;
        }
        next();
    };
};
exports.role = role;
