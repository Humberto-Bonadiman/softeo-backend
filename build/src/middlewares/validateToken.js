"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = void 0;
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = require("jsonwebtoken");
const ErrorMessage_1 = __importDefault(require("../enums/ErrorMessage"));
const config_1 = require("../utils/config");
const prisma = new client_1.PrismaClient();
const validateToken = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ message: ErrorMessage_1.default.TOKEN_NOT_FOUND });
    }
    const decoded = (0, jsonwebtoken_1.verify)(authorization, config_1.JWT_SECRET);
    const findDentistById = await prisma.dentist.findUniqueOrThrow({
        where: { id: decoded.data.id },
    });
    if (!findDentistById) {
        return res.status(401).json({ message: ErrorMessage_1.default.INVALID_TOKEN });
    }
    return next();
};
exports.validateToken = validateToken;
//# sourceMappingURL=validateToken.js.map