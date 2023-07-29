/*
  Warnings:

  - You are about to drop the column `title` on the `Reviews` table. All the data in the column will be lost.
  - Added the required column `email` to the `Reviews` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Profile_firstName_idx` ON `Profile`;

-- AlterTable
ALTER TABLE `Reviews` DROP COLUMN `title`,
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    MODIFY `country` VARCHAR(191) NULL;

-- CreateIndex
CREATE INDEX `Profile_firstName_idx` ON `Profile`(`firstName` DESC);
