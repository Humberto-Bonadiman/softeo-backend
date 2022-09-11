"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const dentist = [
    {
        id: 'first101',
        email: 'mario_souza@email.com',
        name: 'Mario Carvalho Souza',
        password: 'minha_senha'
    }
];
const client = [
    {
        id: 'second101',
        name: 'Mario Souza Carvalho',
        treatment: 'Limpeza',
        date: '08/09/2022 14:30',
        value: new client_1.Prisma.Decimal(100.00),
        numberPlots: 1,
        valuePlots: '100.00',
        dentistId: 'first101'
    }
];
async function userSeed() {
    const resultDentist = dentist.map(async (dentistCreate) => {
        const response = await prisma.dentist.upsert({
            where: { id: dentistCreate.id },
            update: {},
            create: {
                ...dentistCreate
            },
        });
        return response;
    });
    await Promise.all(resultDentist);
}
async function clientSeed() {
    const resultClient = client.map(async (clientCreate) => {
        const response = await prisma.client.upsert({
            where: { id: clientCreate.id },
            update: {},
            create: {
                ...clientCreate
            },
        });
        return response;
    });
    await Promise.all(resultClient);
}
userSeed().catch((e) => {
    console.log(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});
clientSeed().catch((e) => {
    console.log(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map