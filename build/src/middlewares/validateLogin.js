"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogin = exports.schemeLogin = void 0;
const client_1 = require("@prisma/client");
const joi_1 = __importDefault(require("joi"));
const ErrorMessage_1 = __importDefault(require("../enums/ErrorMessage"));
exports.schemeLogin = joi_1.default.object({
    email: joi_1.default.string().email().required().messages({
        'string.required': ErrorMessage_1.default.NOT_EMPTY,
        'string.email': ErrorMessage_1.default.INCORRECT_LOGIN,
        'string.empty': ErrorMessage_1.default.NOT_EMPTY,
    }),
    password: joi_1.default.string().required().min(5).messages({
        'string.required': ErrorMessage_1.default.NOT_EMPTY,
        'string.empty': ErrorMessage_1.default.NOT_EMPTY,
    }),
});
const validateLogin = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(401).json({ message: ErrorMessage_1.default.NOT_EMPTY });
    }
    const user = await new client_1.PrismaClient().dentist.findFirst({
        where: { email, password }
    });
    if (!user) {
        return res.status(401).json({ message: ErrorMessage_1.default.INCORRECT_LOGIN });
    }
    const { error } = exports.schemeLogin.validate({ email, password });
    if (error) {
        return res.status(401).json({ message: error.message });
    }
    return next();
};
exports.validateLogin = validateLogin;
//# sourceMappingURL=validateLogin.js.map