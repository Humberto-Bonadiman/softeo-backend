"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateClient = void 0;
const joi_1 = __importDefault(require("joi"));
const ErrorMessage_1 = __importDefault(require("../enums/ErrorMessage"));
const schemeClient = joi_1.default.object({
    name: joi_1.default.string().required().min(7).messages({
        'string.empty': ErrorMessage_1.default.NOT_EMPTY,
        'string.required': ErrorMessage_1.default.NOT_EMPTY,
    }),
    treatment: joi_1.default.string().required().messages({
        'string.empty': ErrorMessage_1.default.NOT_EMPTY,
        'string.required': ErrorMessage_1.default.NOT_EMPTY,
    }),
    value: joi_1.default.number().required(),
    numberPlots: joi_1.default.number().required(),
});
const validateClient = async (req, res, next) => {
    const { name, treatment, value, numberPlots } = req.body;
    if (!name || !treatment || !value || !numberPlots) {
        return res.status(401).json({ message: ErrorMessage_1.default.NOT_EMPTY });
    }
    const { error } = schemeClient.validate({
        name,
        treatment,
        value,
        numberPlots
    });
    if (error) {
        return res.status(401).json({ message: error.message });
    }
    return next();
};
exports.validateClient = validateClient;
//# sourceMappingURL=validateClient.js.map