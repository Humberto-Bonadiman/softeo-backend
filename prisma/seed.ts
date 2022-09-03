import { PrismaClient, Dentist } from '@prisma/client';
const prisma = new PrismaClient();

const dentist: Dentist[] = [
  {
    id: "first101",
    email: "mario_souza@email.com",
    name: "Mario Carvalho Souza",
    password: "minha_senha"
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

userSeed().catch((e) => {
  console.log(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});