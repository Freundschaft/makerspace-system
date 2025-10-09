-- CreateEnum
CREATE TYPE "CarpentryCustomerType" AS ENUM ('PRIVATE_PERSON', 'ORGANIZATION', 'BARBERSHOP', 'HOUSE');

-- CreateEnum
CREATE TYPE "CarpentryOrderType" AS ENUM ('REPAIR_ORDER', 'PROJECT');

-- CreateEnum
CREATE TYPE "CarpentryGender" AS ENUM ('FEMALE', 'MALE');

-- CreateTable
CREATE TABLE `CarpentryProject` (
    `id` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `acceptedBy` VARCHAR(191) NULL,
    `customerType` ENUM('PRIVATE_PERSON', 'ORGANIZATION', 'BARBERSHOP', 'HOUSE') NULL,
    `organizationName` TEXT NULL,
    `customerName` VARCHAR(191) NULL,
    `phoneNumber` TEXT NULL,
    `gender` ENUM('FEMALE', 'MALE') NULL,
    `orderType` ENUM('REPAIR_ORDER', 'PROJECT') NULL,
    `timeNeeded` INTEGER NULL,
    `itemToRepair` TEXT NULL,
    `problemDescription` TEXT NULL,
    `projectDescription` TEXT NULL,
    `materialCosts` DECIMAL(10, 2) NULL,
    `paidByCustomer` BOOLEAN NULL,
    `photoPath` TEXT NULL,
    `assignedToId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CarpentryProject` ADD CONSTRAINT `CarpentryProject_assignedToId_fkey` FOREIGN KEY (`assignedToId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
