CREATE TABLE `InKindDonation` (
    `id` VARCHAR(191) NOT NULL,
    `direction` ENUM('INCOMING', 'OUTGOING') NOT NULL,
    `status` ENUM('PLANNED', 'RECEIVED', 'DISTRIBUTED', 'CANCELLED') NOT NULL DEFAULT 'PLANNED',
    `date` DATETIME(3) NOT NULL,
    `item` VARCHAR(191) NOT NULL,
    `quantity` DECIMAL(10, 2) NULL,
    `unit` VARCHAR(191) NULL,
    `contactName` VARCHAR(191) NULL,
    `location` TEXT NULL,
    `estimatedValue` DECIMAL(10, 2) NULL,
    `notes` TEXT NULL,
    `createdById` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `InKindDonation_direction_date_idx`(`direction`, `date`),
    INDEX `InKindDonation_status_date_idx`(`status`, `date`),
    INDEX `InKindDonation_createdById_idx`(`createdById`),
    INDEX `InKindDonation_item_idx`(`item`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE `InKindDonation` ADD CONSTRAINT `InKindDonation_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
