/*
  Warnings:

  - You are about to alter the column `title` on the `Role` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `Enum(EnumId(0))`.

*/
-- DropIndex
DROP INDEX `Profile_firstName_idx` ON `Profile`;

-- DropIndex
DROP INDEX `Role_title_key` ON `Role`;

-- AlterTable
ALTER TABLE `Role` MODIFY `title` ENUM('USER', 'ADMIN', 'MODERATOR') NOT NULL;

-- CreateIndex
CREATE INDEX `Profile_firstName_idx` ON `Profile`(`firstName` DESC);
