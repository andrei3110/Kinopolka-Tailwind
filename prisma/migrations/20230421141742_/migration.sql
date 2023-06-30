/*
  Warnings:

  - You are about to drop the column `item__id` on the `items__genres` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `items__genres` DROP COLUMN `item__id`,
    ADD COLUMN `item__name` VARCHAR(255) NULL;
