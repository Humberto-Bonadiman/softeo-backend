/*
  Warnings:

  - Added the required column `valuePlots` to the `client` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `client` ADD COLUMN `valuePlots` VARCHAR(191) NOT NULL;
