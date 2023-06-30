/*
  Warnings:

  - You are about to drop the `attribute_attribute_values` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `attribute_attribute_values` DROP FOREIGN KEY `attribute_attribute_values_attributeId_fkey`;

-- DropForeignKey
ALTER TABLE `attribute_attribute_values` DROP FOREIGN KEY `attribute_attribute_values_attribute_valueId_fkey`;

-- DropTable
DROP TABLE `attribute_attribute_values`;
