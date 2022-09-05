-- CreateTable
CREATE TABLE "dentist" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,

    CONSTRAINT "dentist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "treatment" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "value" DECIMAL(65,30) NOT NULL,
    "numberPlots" INTEGER NOT NULL,
    "valuePlots" TEXT NOT NULL,
    "dentistId" TEXT NOT NULL,

    CONSTRAINT "client_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "dentist_email_key" ON "dentist"("email");

-- AddForeignKey
ALTER TABLE "client" ADD CONSTRAINT "client_dentistId_fkey" FOREIGN KEY ("dentistId") REFERENCES "dentist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
