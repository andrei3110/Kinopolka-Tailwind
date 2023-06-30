/*
  Warnings:

  - You are about to drop the `rating` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `comments` ADD COLUMN `rate` INTEGER NULL;

-- DropTable
DROP TABLE `rating`;
