/*
  Warnings:

  - You are about to drop the column `peoples` on the `Contact` table. All the data in the column will be lost.
  - Added the required column `phoneCode` to the `Contact` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Profile_firstName_idx` ON `Profile`;

-- AlterTable
ALTER TABLE `Contact` DROP COLUMN `peoples`,
    ADD COLUMN `adults` INTEGER NULL DEFAULT 0,
    ADD COLUMN `children` INTEGER NULL DEFAULT 0,
    ADD COLUMN `country` VARCHAR(191) NULL,
    ADD COLUMN `phoneCode` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE INDEX `Profile_firstName_idx` ON `Profile`(`firstName` DESC);
