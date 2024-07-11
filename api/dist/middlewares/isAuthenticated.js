"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isAuthenticated = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "No Authorization" });
    }
    jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, function (err, decoded) {
        if (err) {
            return res.status(401).json({ message: "token error" });
        }
        const payload = decoded;
        req.userId = payload.id;
        next();
    });
};
exports.isAuthenticated = isAuthenticated;
