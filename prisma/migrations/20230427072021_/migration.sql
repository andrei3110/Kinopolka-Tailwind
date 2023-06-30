/*
  Warnings:

  - You are about to drop the `bascet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `bascet`;

-- CreateTable
CREATE TABLE `basket` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,
    `Username` VARCHAR(255) NULL,
    `image` VARCHAR(255) NULL,
    `genre` VARCHAR(255) NULL,
    `country` VARCHAR(255) NULL,
    `age` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
