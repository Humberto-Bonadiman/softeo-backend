-- CreateTable
CREATE TABLE `dentist` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `dentist_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `client` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `treatment` VARCHAR(191) NOT NULL,
    `date` VARCHAR(191) NOT NULL,
    `value` DECIMAL(65, 30) NOT NULL,
    `numberPlots` INTEGER NOT NULL,
    `valuePlots` VARCHAR(191) NOT NULL,
    `dentistId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `client` ADD CONSTRAINT `client_dentistId_fkey` FOREIGN KEY (`dentistId`) REFERENCES `dentist`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
