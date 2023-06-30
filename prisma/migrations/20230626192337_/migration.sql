-- AlterTable
ALTER TABLE `attribute` MODIFY `years` VARCHAR(255) NULL,
    MODIFY `countries` VARCHAR(255) NULL,
    MODIFY `genres` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `attribute_values` MODIFY `name` VARCHAR(255) NULL;
