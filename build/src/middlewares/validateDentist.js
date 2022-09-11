"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDentist = void 0;
const client_1 = require("@prisma/client");
const joi_1 = __importDefault(require("joi"));
const ErrorMessage_1 = __importDefault(require("../enums/ErrorMessage"));
const schemeDentist = joi_1.default.object({
    email: joi_1.default.string().email().required().messages({
        'string.empty': ErrorMessage_1.default.NOT_EMPTY,
        'string.required': ErrorMessage_1.default.NOT_EMPTY,
        'string.email': ErrorMessage_1.default.INCORRECT_LOGIN,
    }),
    name: joi_1.default.string().required().min(8).messages({
        'string.empty': ErrorMessage_1.default.NOT_EMPTY,
        'string.required': ErrorMessage_1.default.NOT_EMPTY,
    }),
    password: joi_1.default.string().required().min(5).messages({
        'string.empty': ErrorMessage_1.default.NOT_EMPTY,
        'string.required': ErrorMessage_1.default.NOT_EMPTY,
    }),
});
const validateDentist = async (req, res, next) => {
    const { email, name, password } = req.body;
    if (!email || !password) {
        return res.status(401).json({ message: ErrorMessage_1.default.NOT_EMPTY });
    }
    const user = await new client_1.PrismaClient().dentist.findFirst({
        where: { email }
    });
    if (user) {
        return res.status(401).json({ message: ErrorMessage_1.default.EXISTING_EMAIL });
    }
    const { error } = schemeDentist.validate({ email, name, password });
    if (error) {
        return res.status(401).json({ message: error.message });
    }
    return next();
};
exports.validateDentist = validateDentist;
//# sourceMappingURL=validateDentist.js.map