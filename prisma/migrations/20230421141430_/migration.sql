-- CreateTable
CREATE TABLE `items__genres` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `item__id` VARCHAR(255) NULL,
    `genres__name` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
