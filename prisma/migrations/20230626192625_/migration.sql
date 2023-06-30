/*
  Warnings:

  - You are about to drop the column `countries` on the `attribute` table. All the data in the column will be lost.
  - You are about to drop the column `genres` on the `attribute` table. All the data in the column will be lost.
  - You are about to drop the column `years` on the `attribute` table. All the data in the column will be lost.
  - Added the required column `name` to the `attribute` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `attribute` DROP COLUMN `countries`,
    DROP COLUMN `genres`,
    DROP COLUMN `years`,
    ADD COLUMN `name` VARCHAR(255) NOT NULL;
