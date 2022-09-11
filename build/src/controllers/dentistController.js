"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dentistService_1 = __importDefault(require("../services/dentistService"));
const StatusCode_1 = __importDefault(require("../enums/StatusCode"));
class DentistController {
    async create(req, res) {
        try {
            const { email, name, password } = req.body;
            const dentistService = new dentistService_1.default();
            const createDentist = await dentistService.create({ email, name, password });
            return res.status(StatusCode_1.default.OK).json(createDentist);
        }
        catch (error) {
            return res.status(StatusCode_1.default.INTERNAL_SERVER_ERROR).json(error);
        }
    }
    async listAll(_req, res) {
        try {
            const dentistService = new dentistService_1.default();
            const listAllDentists = await dentistService.listAll();
            return res.status(StatusCode_1.default.OK).json(listAllDentists);
        }
        catch (error) {
            return res.status(StatusCode_1.default.INTERNAL_SERVER_ERROR).json(error);
        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const loginDentist = await new dentistService_1.default().login(email, password);
            return res.status(StatusCode_1.default.OK).json(loginDentist);
        }
        catch (error) {
            return res.status(StatusCode_1.default.INTERNAL_SERVER_ERROR).json(error);
        }
    }
}
exports.default = DentistController;
//# sourceMappingURL=dentistController.js.map