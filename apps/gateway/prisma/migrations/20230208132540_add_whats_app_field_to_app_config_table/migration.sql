/*
  Warnings:

  - You are about to alter the column `contactEmail` on the `App` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(20)`.
  - You are about to alter the column `youtubeUrl` on the `App` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(100)`.
  - You are about to alter the column `twitterUrl` on the `App` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(100)`.
  - You are about to alter the column `facebookUrl` on the `App` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(100)`.
  - You are about to alter the column `instagramUrl` on the `App` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(100)`.
  - You are about to alter the column `playStorUrl` on the `App` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(100)`.
  - You are about to alter the column `appStorUrl` on the `App` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(100)`.
  - You are about to drop the column `facebook` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `instagram` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `twitter` on the `Profile` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Profile_firstName_idx` ON `Profile`;

-- AlterTable
ALTER TABLE `App` ADD COLUMN `whatsApp` VARCHAR(20) NULL DEFAULT '',
    MODIFY `title` VARCHAR(70) NOT NULL DEFAULT 'موقع السياحة',
    MODIFY `contactEmail` VARCHAR(20) NULL DEFAULT '',
    MODIFY `youtubeUrl` VARCHAR(100) NULL DEFAULT '',
    MODIFY `twitterUrl` VARCHAR(100) NULL DEFAULT '',
    MODIFY `facebookUrl` VARCHAR(100) NULL DEFAULT '',
    MODIFY `instagramUrl` VARCHAR(100) NULL DEFAULT '',
    MODIFY `playStorUrl` VARCHAR(100) NULL DEFAULT '',
    MODIFY `appStorUrl` VARCHAR(100) NULL DEFAULT '';

-- AlterTable
ALTER TABLE `Profile` DROP COLUMN `facebook`,
    DROP COLUMN `instagram`,
    DROP COLUMN `phone`,
    DROP COLUMN `twitter`;

-- CreateIndex
CREATE INDEX `Profile_firstName_idx` ON `Profile`(`firstName` DESC);
