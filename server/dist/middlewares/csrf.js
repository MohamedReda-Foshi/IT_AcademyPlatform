"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.csrfMiddleware = csrfMiddleware;
// Cookie-authenticated writes must come from the configured frontend origin.
function csrfMiddleware(req, res, next) {
    if (["GET", "HEAD", "OPTIONS"].includes(req.method)) {
        next();
        return;
    }
    const allowedOrigin = process.env.CORS_ORIGIN || "http://localhost:3000";
    if (req.get("origin") !== allowedOrigin) {
        res.status(403).json({ message: "Invalid request origin" });
        return;
    }
    next();
}
