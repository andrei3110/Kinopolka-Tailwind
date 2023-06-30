/*
  Warnings:

  - The primary key for the `items__genres` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `genres__id` on the `items__genres` table. All the data in the column will be lost.
  - You are about to drop the column `items__id` on the `items__genres` table. All the data in the column will be lost.
  - Added the required column `genreId` to the `items__genres` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itemId` to the `items__genres` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `items__genres` DROP FOREIGN KEY `items__genres_genres__id_fkey`;

-- DropForeignKey
ALTER TABLE `items__genres` DROP FOREIGN KEY `items__genres_items__id_fkey`;

-- AlterTable
ALTER TABLE `items__genres` DROP PRIMARY KEY,
    DROP COLUMN `genres__id`,
    DROP COLUMN `items__id`,
    ADD COLUMN `genreId` INTEGER NOT NULL,
    ADD COLUMN `itemId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`itemId`, `genreId`);

-- AddForeignKey
ALTER TABLE `items__genres` ADD CONSTRAINT `items__genres_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `items`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `items__genres` ADD CONSTRAINT `items__genres_genreId_fkey` FOREIGN KEY (`genreId`) REFERENCES `genres`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
