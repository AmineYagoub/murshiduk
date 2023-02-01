/*
  Warnings:

  - You are about to drop the column `agreement` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `emailConfirmed` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `key` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Profile_firstName_idx` ON `Profile`;

-- DropIndex
DROP INDEX `User_key_key` ON `User`;

-- AlterTable
ALTER TABLE `Profile` ADD COLUMN `phone` VARCHAR(191) NULL DEFAULT '';

-- AlterTable
ALTER TABLE `User` DROP COLUMN `agreement`,
    DROP COLUMN `emailConfirmed`,
    DROP COLUMN `key`,
    MODIFY `isActive` BOOLEAN NULL DEFAULT true;

-- CreateIndex
CREATE INDEX `Profile_firstName_idx` ON `Profile`(`firstName` DESC);
