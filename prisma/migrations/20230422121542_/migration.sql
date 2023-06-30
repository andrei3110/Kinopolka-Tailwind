/*
  Warnings:

  - You are about to drop the `genre` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `item` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `items__genres` DROP FOREIGN KEY `items__genres_genres__id_fkey`;

-- DropForeignKey
ALTER TABLE `items__genres` DROP FOREIGN KEY `items__genres_items__id_fkey`;

-- DropTable
DROP TABLE `genre`;

-- DropTable
DROP TABLE `item`;

-- CreateTable
CREATE TABLE `items` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,
    `image` VARCHAR(255) NULL,
    `genre` VARCHAR(255) NULL,
    `country` VARCHAR(255) NULL,
    `type` INTEGER NULL,
    `year` INTEGER NULL,
    `description` TEXT NULL,
    `age` FLOAT NULL,
    `producer` VARCHAR(255) NULL,
    `operator` VARCHAR(255) NULL,
    `screenwriter` VARCHAR(255) NULL,
    `regicer` VARCHAR(255) NULL,
    `actor` VARCHAR(255) NULL,
    `status` VARCHAR(255) NULL,
    `video` TEXT NULL,
    `treller` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `genres` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `items__genres` ADD CONSTRAINT `items__genres_items__id_fkey` FOREIGN KEY (`items__id`) REFERENCES `items`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `items__genres` ADD CONSTRAINT `items__genres_genres__id_fkey` FOREIGN KEY (`genres__id`) REFERENCES `genres`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
