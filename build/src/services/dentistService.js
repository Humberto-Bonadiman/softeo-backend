"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../utils/config");
class DentistService {
    create(elements) {
        try {
            const { email, name, password } = elements;
            const prisma = new client_1.PrismaClient();
            const createDentist = prisma.dentist.create({
                data: {
                    email,
                    name,
                    password,
                }
            });
            return createDentist;
        }
        catch (err) {
            console.log(err);
            throw Error;
        }
    }
    async listAll() {
        try {
            const prisma = new client_1.PrismaClient();
            const listAllDentists = await prisma.dentist.findMany();
            return listAllDentists;
        }
        catch (err) {
            throw Error;
        }
    }
    async login(email, password) {
        try {
            const user = await new client_1.PrismaClient().dentist.findFirst({ where: { email, password } });
            const jwtConfig = {
                expiresIn: '7d',
                algorithm: "HS256"
            };
            const token = (0, jsonwebtoken_1.sign)({
                data: { id: user === null || user === void 0 ? void 0 : user.id, email: user === null || user === void 0 ? void 0 : user.email, },
            }, config_1.JWT_SECRET, jwtConfig);
            return token;
        }
        catch (err) {
            throw Error;
        }
    }
}
exports.default = DentistService;
//# sourceMappingURL=dentistService.js.map