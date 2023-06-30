/*
  Warnings:

  - The primary key for the `basket` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Username` on the `basket` table. All the data in the column will be lost.
  - You are about to drop the column `age` on the `basket` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `basket` table. All the data in the column will be lost.
  - You are about to drop the column `genre` on the `basket` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `basket` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `basket` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `basket` table. All the data in the column will be lost.
  - Added the required column `itemId` to the `basket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usersId` to the `basket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `basket` DROP PRIMARY KEY,
    DROP COLUMN `Username`,
    DROP COLUMN `age`,
    DROP COLUMN `country`,
    DROP COLUMN `genre`,
    DROP COLUMN `id`,
    DROP COLUMN `image`,
    DROP COLUMN `name`,
    ADD COLUMN `itemId` INTEGER NOT NULL,
    ADD COLUMN `usersId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`itemId`, `usersId`);

-- AddForeignKey
ALTER TABLE `basket` ADD CONSTRAINT `basket_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `items`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `basket` ADD CONSTRAINT `basket_usersId_fkey` FOREIGN KEY (`usersId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
