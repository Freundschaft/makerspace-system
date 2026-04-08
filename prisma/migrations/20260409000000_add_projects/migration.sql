-- CreateTable
CREATE TABLE `Project` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `notes` TEXT NULL,
    `assignee` VARCHAR(191) NULL,
    `status` ENUM('TODO', 'IN_PROGRESS', 'DONE', 'OFF') NOT NULL DEFAULT 'TODO',
    `startDate` DATETIME(3) NULL,
    `endDate` DATETIME(3) NULL,
    `googlePhotosAlbumLink` TEXT NULL,
    `hashtag` VARCHAR(191) NULL,
    `purpose` TEXT NULL,
    `assignedToId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Project_status_idx`(`status`),
    INDEX `Project_startDate_idx`(`startDate`),
    INDEX `Project_assignedToId_idx`(`assignedToId`),
    INDEX `Project_name_idx`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_assignedToId_fkey` FOREIGN KEY (`assignedToId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
