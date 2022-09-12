"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../utils/config");
class ClientService {
    async create(elementsClient, token) {
        try {
            const { name, treatment, value, numberPlots } = elementsClient;
            const decoded = (0, jsonwebtoken_1.verify)(token, config_1.JWT_SECRET);
            const idDentist = decoded.data.id;
            const prisma = new client_1.PrismaClient();
            const date = new Date().toLocaleString("pt-Br", {
                dateStyle: "short",
                timeStyle: "short",
                timeZone: "America/Sao_Paulo"
            });
            const valuePlots = (parseFloat(value.toString()) / numberPlots).toFixed(2);
            const createClient = await prisma.client.create({
                data: {
                    name,
                    treatment,
                    value,
                    date,
                    numberPlots,
                    valuePlots,
                    dentistId: idDentist,
                }
            });
            return createClient;
        }
        catch (err) {
            throw Error;
        }
    }
    async findAll() {
        try {
            const prisma = new client_1.PrismaClient();
            const findAllClients = await prisma.client.findMany();
            return findAllClients;
        }
        catch (err) {
            throw Error;
        }
    }
    async findById(id) {
        try {
            const prisma = new client_1.PrismaClient();
            const findClientById = await prisma.client.findUniqueOrThrow({
                where: { id },
            });
            return findClientById;
        }
        catch (err) {
            throw Error;
        }
    }
    async findByDentistId(token) {
        try {
            const prisma = new client_1.PrismaClient();
            const decoded = (0, jsonwebtoken_1.verify)(token, config_1.JWT_SECRET);
            console.log(decoded);
            const idDentist = decoded.data.id;
            console.log(idDentist);
            const findClientByDentistId = await prisma.client.findMany({
                where: { dentistId: idDentist },
            });
            if (!findClientByDentistId) {
                return [];
            }
            return findClientByDentistId;
        }
        catch (err) {
            throw Error;
        }
    }
    async updateById(id, elementsClient) {
        try {
            const prisma = new client_1.PrismaClient();
            const { name, treatment, value, date, numberPlots } = elementsClient;
            const valuePlots = (parseFloat(value.toString()) / numberPlots).toFixed(2);
            await prisma.client.update({
                where: { id },
                data: { name, treatment, value, date, numberPlots, valuePlots },
            });
            const updateClientById = await prisma.client.findUniqueOrThrow({
                where: { id },
            });
            return updateClientById;
        }
        catch (err) {
            throw Error;
        }
    }
    async deleteById(id) {
        try {
            const prisma = new client_1.PrismaClient();
            const deleteClient = await prisma.client.delete({ where: { id } });
            return deleteClient;
        }
        catch (err) {
            throw Error;
        }
    }
}
exports.default = ClientService;
//# sourceMappingURL=clientService.js.map