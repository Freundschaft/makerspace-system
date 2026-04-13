ALTER TABLE `BicycleRepair`
  ADD COLUMN `repairDetails` TEXT NULL,
  MODIFY `ownerIdCardNumber` VARCHAR(191) NULL,
  MODIFY `ownerPhone` VARCHAR(191) NULL;
