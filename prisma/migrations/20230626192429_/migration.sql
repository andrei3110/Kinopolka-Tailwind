-- CreateTable
CREATE TABLE `attribute_attribute_values` (
    `attributeId` INTEGER NOT NULL,
    `attribute_valueId` INTEGER NOT NULL,

    PRIMARY KEY (`attributeId`, `attribute_valueId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `attribute_attribute_values` ADD CONSTRAINT `attribute_attribute_values_attributeId_fkey` FOREIGN KEY (`attributeId`) REFERENCES `attribute`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `attribute_attribute_values` ADD CONSTRAINT `attribute_attribute_values_attribute_valueId_fkey` FOREIGN KEY (`attribute_valueId`) REFERENCES `attribute_values`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
