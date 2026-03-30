CREATE INDEX `BicycleRepair_receivedDate_idx` ON `BicycleRepair`(`receivedDate`);
CREATE INDEX `BicycleRepair_status_receivedDate_idx` ON `BicycleRepair`(`status`, `receivedDate`);

CREATE INDEX `BicycleRental_startDate_idx` ON `BicycleRental`(`startDate`);
CREATE INDEX `BicycleRental_status_startDate_idx` ON `BicycleRental`(`status`, `startDate`);

CREATE INDEX `TeamMember_familyName_givenNames_idx` ON `TeamMember`(`familyName`, `givenNames`);

CREATE INDEX `ElectronicsRepair_createdDate_idx` ON `ElectronicsRepair`(`createdDate`);
CREATE INDEX `ElectronicsRepair_status_createdDate_idx` ON `ElectronicsRepair`(`status`, `createdDate`);
CREATE INDEX `ElectronicsRepair_repairerId_idx` ON `ElectronicsRepair`(`repairerId`);

CREATE INDEX `CarpentryProject_date_idx` ON `CarpentryProject`(`date`);
CREATE INDEX `CarpentryProject_assignedToId_idx` ON `CarpentryProject`(`assignedToId`);
