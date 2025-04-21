-- CreateTable
CREATE TABLE `TeamMember` (
    `id` CHAR(36) NOT NULL,
    `familyName` VARCHAR(191) NOT NULL,
    `givenNames` VARCHAR(191) NOT NULL,
    `nationality` VARCHAR(191) NOT NULL,
    `photoPath` VARCHAR(191) NULL,
    `status` ENUM('ACTIVE', 'INACTIVE') NOT NULL DEFAULT 'ACTIVE',
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NULL,
    `department` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `homeAddress` VARCHAR(191) NULL,
    `dateOfBirth` DATETIME(3) NOT NULL,
    `legalStatus` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `TeamMember_email_key` ON `TeamMember`(`email`); 