"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemeId = void 0;
const client_1 = require("@prisma/client");
const joi_1 = __importDefault(require("joi"));
const ErrorMessage_1 = __importDefault(require("../enums/ErrorMessage"));
const prisma = new client_1.PrismaClient();
exports.schemeId = joi_1.default.object({ dentistId: joi_1.default.string().required() });
const validateDentistId = async (req, res, next) => {
    const { dentistId } = req.params;
    const findClientByDentistId = await prisma.client.findFirstOrThrow({
        where: { dentistId },
    });
    if (!findClientByDentistId) {
        return res.status(401).json({ message: ErrorMessage_1.default.NO_ID });
    }
    const { error } = exports.schemeId.validate({ dentistId });
    if (error) {
        return res.status(400).json({ message: error.message });
    }
    return next();
};
exports.default = validateDentistId;
//# sourceMappingURL=validateDentistId.js.map