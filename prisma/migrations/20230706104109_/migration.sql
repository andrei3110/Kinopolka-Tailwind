/*
  Warnings:

  - You are about to drop the `items__genres` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `items__genres` DROP FOREIGN KEY `items__genres_genreId_fkey`;

-- DropForeignKey
ALTER TABLE `items__genres` DROP FOREIGN KEY `items__genres_itemId_fkey`;

-- DropTable
DROP TABLE `items__genres`;

-- CreateTable
CREATE TABLE `items__attribute_values` (
    `itemId` INTEGER NOT NULL,
    `attribute_valuesId` INTEGER NOT NULL,

    PRIMARY KEY (`itemId`, `attribute_valuesId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `items__attribute_values` ADD CONSTRAINT `items__attribute_values_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `items`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `items__attribute_values` ADD CONSTRAINT `items__attribute_values_attribute_valuesId_fkey` FOREIGN KEY (`attribute_valuesId`) REFERENCES `attribute_values`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
