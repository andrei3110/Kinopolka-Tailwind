-- CreateTable
CREATE TABLE `filtersCategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `years` VARCHAR(255) NULL,
    `country` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
