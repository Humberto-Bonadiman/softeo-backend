/*
  Warnings:

  - Added the required column `password` to the `dentist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "dentist" ADD COLUMN     "password" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "client" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "treatment" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "value" DECIMAL(65,30) NOT NULL,
    "numberPlots" INTEGER NOT NULL,
    "dentistId" TEXT NOT NULL,

    CONSTRAINT "client_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "client" ADD CONSTRAINT "client_dentistId_fkey" FOREIGN KEY ("dentistId") REFERENCES "dentist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
