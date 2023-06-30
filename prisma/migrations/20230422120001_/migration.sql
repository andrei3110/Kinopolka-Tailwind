/*
  Warnings:

  - The primary key for the `items__genres` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `item__id` on the `items__genres` table. All the data in the column will be lost.
  - Made the column `name` on table `genres` required. This step will fail if there are existing NULL values in that column.
  - Made the column `image` on table `genres` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `items__id` to the `items__genres` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `items__genres_item__id_fkey` ON `items__genres`;

-- AlterTable
ALTER TABLE `genres` MODIFY `name` VARCHAR(191) NOT NULL,
    MODIFY `image` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `items__genres` DROP PRIMARY KEY,
    DROP COLUMN `item__id`,
    ADD COLUMN `items__id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`items__id`, `genres__id`);

-- AddForeignKey
ALTER TABLE `items__genres` ADD CONSTRAINT `items__genres_items__id_fkey` FOREIGN KEY (`items__id`) REFERENCES `items`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `items__genres` ADD CONSTRAINT `items__genres_genres__id_fkey` FOREIGN KEY (`genres__id`) REFERENCES `genres`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
