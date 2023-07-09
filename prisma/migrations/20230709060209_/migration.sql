-- CreateTable
CREATE TABLE `items` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,
    `image` VARCHAR(255) NULL,
    `genre` VARCHAR(255) NULL,
    `country` VARCHAR(255) NULL,
    `type` INTEGER NULL,
    `year` VARCHAR(255) NULL,
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
CREATE TABLE `items__attribute_values` (
    `itemId` INTEGER NOT NULL,
    `attribute_valuesId` INTEGER NOT NULL,

    PRIMARY KEY (`itemId`, `attribute_valuesId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,
    `password` VARCHAR(255) NULL,
    `status` VARCHAR(255) NULL,
    `avatar` VARCHAR(255) NULL,
    `type` VARCHAR(5) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `basket` (
    `itemId` INTEGER NOT NULL,
    `usersId` INTEGER NOT NULL,

    PRIMARY KEY (`itemId`, `usersId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rate` INTEGER NULL,
    `user__name` VARCHAR(255) NULL,
    `move__id` INTEGER NULL,
    `text` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `attribute` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `tag` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `attribute_values` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `attribute_attribute_values` (
    `attributeId` INTEGER NOT NULL,
    `attribute_valueId` INTEGER NOT NULL,

    PRIMARY KEY (`attributeId`, `attribute_valueId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `items__attribute_values` ADD CONSTRAINT `items__attribute_values_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `items`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `items__attribute_values` ADD CONSTRAINT `items__attribute_values_attribute_valuesId_fkey` FOREIGN KEY (`attribute_valuesId`) REFERENCES `attribute_values`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `basket` ADD CONSTRAINT `basket_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `items`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `basket` ADD CONSTRAINT `basket_usersId_fkey` FOREIGN KEY (`usersId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `attribute_attribute_values` ADD CONSTRAINT `attribute_attribute_values_attributeId_fkey` FOREIGN KEY (`attributeId`) REFERENCES `attribute`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `attribute_attribute_values` ADD CONSTRAINT `attribute_attribute_values_attribute_valueId_fkey` FOREIGN KEY (`attribute_valueId`) REFERENCES `attribute_values`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
