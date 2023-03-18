/*
  Warnings:

  - You are about to drop the column `bio` on the `App` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Profile_firstName_idx` ON `Profile`;

-- AlterTable
ALTER TABLE `App` DROP COLUMN `bio`,
    ADD COLUMN `whyUsContent` TEXT NULL;

-- CreateIndex
CREATE INDEX `Profile_firstName_idx` ON `Profile`(`firstName` DESC);
