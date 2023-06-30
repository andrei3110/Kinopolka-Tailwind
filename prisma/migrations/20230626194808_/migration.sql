/*
  Warnings:

  - Added the required column `tag` to the `attribute` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `attribute` ADD COLUMN `tag` VARCHAR(255) NOT NULL;
