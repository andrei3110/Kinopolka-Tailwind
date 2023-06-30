/*
  Warnings:

  - You are about to drop the column `genres__name` on the `items__genres` table. All the data in the column will be lost.
  - You are about to drop the column `item__name` on the `items__genres` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `items__genres` DROP COLUMN `genres__name`,
    DROP COLUMN `item__name`,
    ADD COLUMN `genres__id` INTEGER NULL,
    ADD COLUMN `item__id` INTEGER NULL;
