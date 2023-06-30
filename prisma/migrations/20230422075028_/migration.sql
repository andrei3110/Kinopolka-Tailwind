-- DropForeignKey
ALTER TABLE `items__genres` DROP FOREIGN KEY `items__genres_genres__id_fkey`;

-- DropForeignKey
ALTER TABLE `items__genres` DROP FOREIGN KEY `items__genres_item__id_fkey`;
