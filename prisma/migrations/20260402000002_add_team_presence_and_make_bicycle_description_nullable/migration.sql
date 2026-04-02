ALTER TABLE `BicycleRepair`
  MODIFY `description` TEXT NULL;

CREATE TABLE `TeamMemberPresence` (
  `id` VARCHAR(191) NOT NULL,
  `teamMemberId` VARCHAR(191) NOT NULL,
  `date` DATETIME(3) NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,

  UNIQUE INDEX `TeamMemberPresence_teamMemberId_date_key`(`teamMemberId`, `date`),
  INDEX `TeamMemberPresence_date_idx`(`date`),
  INDEX `TeamMemberPresence_teamMemberId_date_idx`(`teamMemberId`, `date`),
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE `TeamMemberPresence`
  ADD CONSTRAINT `TeamMemberPresence_teamMemberId_fkey`
  FOREIGN KEY (`teamMemberId`) REFERENCES `TeamMember`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
