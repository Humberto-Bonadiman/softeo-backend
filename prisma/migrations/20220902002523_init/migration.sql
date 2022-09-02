-- CreateTable
CREATE TABLE "dentist" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "dentist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "treatment" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "value" DECIMAL(65,30) NOT NULL,
    "numberPlots" INTEGER NOT NULL,
    "valuePlots" DECIMAL(65,30) NOT NULL,
    "dentistId" TEXT NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "dentist_email_key" ON "dentist"("email");

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_dentistId_fkey" FOREIGN KEY ("dentistId") REFERENCES "dentist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
