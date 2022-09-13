"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const StatusCode_1 = __importDefault(require("../enums/StatusCode"));
const clientService_1 = __importDefault(require("../services/clientService"));
class ClientController {
    async create(req, res) {
        try {
            const { authorization } = req.headers;
            const elementsClient = req.body;
            const clientService = new clientService_1.default();
            const createClient = await clientService.create(elementsClient, authorization);
            return res.status(StatusCode_1.default.CREATED).json(createClient);
        }
        catch (error) {
            return res.status(StatusCode_1.default.INTERNAL_SERVER_ERROR).json(error);
        }
    }
    async findAll(_req, res) {
        try {
            const clientService = new clientService_1.default();
            const findAllClients = await clientService.findAll();
            return res.status(StatusCode_1.default.OK).json(findAllClients);
        }
        catch (error) {
            return res.status(StatusCode_1.default.INTERNAL_SERVER_ERROR).json(error);
        }
    }
    async findById(req, res) {
        try {
            const { id } = req.params;
            const clientService = new clientService_1.default();
            const findClientById = await clientService.findById(id);
            return res.status(StatusCode_1.default.OK).json(findClientById);
        }
        catch (error) {
            return res.status(StatusCode_1.default.INTERNAL_SERVER_ERROR).json(error);
        }
    }
    async findByDentistId(req, res) {
        try {
            const { authorization } = req.headers;
            const clientService = new clientService_1.default();
            const findClientByDentistId = await clientService.findByDentistId(authorization);
            return res.status(StatusCode_1.default.OK).json(findClientByDentistId);
        }
        catch (error) {
            return res.status(StatusCode_1.default.INTERNAL_SERVER_ERROR).json(error);
        }
    }
    async updateById(req, res) {
        try {
            const { id } = req.params;
            const elementsBody = req.body;
            const clientService = new clientService_1.default();
            const updateClientById = await clientService.updateById(id, elementsBody);
            return res.status(StatusCode_1.default.OK).json(updateClientById);
        }
        catch (error) {
            return res.status(StatusCode_1.default.INTERNAL_SERVER_ERROR).json(error);
        }
    }
    async deleteById(req, res) {
        try {
            const { id } = req.params;
            const clientService = new clientService_1.default();
            const deleteClient = await clientService.deleteById(id);
            return res.status(StatusCode_1.default.OK).json(deleteClient);
        }
        catch (error) {
            return res.status(StatusCode_1.default.INTERNAL_SERVER_ERROR).json(error);
        }
    }
}
exports.default = ClientController;
//# sourceMappingURL=clientController.js.map