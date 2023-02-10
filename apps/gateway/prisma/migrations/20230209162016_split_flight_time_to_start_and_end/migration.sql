/*
  Warnings:

  - You are about to drop the column `flightTime` on the `Contact` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Profile_firstName_idx` ON `Profile`;

-- AlterTable
ALTER TABLE `Contact` DROP COLUMN `flightTime`,
    ADD COLUMN `flightTimeEnd` DATETIME(3) NULL,
    ADD COLUMN `flightTimeStart` DATETIME(3) NULL;

-- CreateIndex
CREATE INDEX `Profile_firstName_idx` ON `Profile`(`firstName` DESC);
